/**
 * Record snippet demo videos using Puppeteer CDP screencast.
 *
 * For each demo page:
 *   1. Launch a headless Chrome, navigate to the file
 *   2. Wait for entrance animation to settle
 *   3. Start a CDP screencast (PNG frames)
 *   4. Execute demo-specific interaction (click, hover, scroll, type)
 *   5. Stop screencast, pipe frames → ffmpeg → WebM + MP4
 *
 * Output: static/snippets/videos/{slug}.webm + .mp4
 *
 * Usage: node scripts/record-snippet-videos.js [slug1 slug2 ...]
 *   No args = record all. Pass slugs to record specific ones.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const HACKS_DIR = path.join(ROOT_DIR, 'content/css-hacks');
const OUTPUT_DIR = path.join(ROOT_DIR, 'static/snippets/videos');
const VIEWPORT = { width: 1280, height: 800, deviceScaleFactor: 2 };
const TARGET_FPS = 24;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

// ─── per-demo interaction scripts ───
// Each returns an async function(page) that performs the demo interaction.
// Target duration: ~4-6 seconds of interesting motion per demo.

const interactions = {
  // ── CSS HACKS ──

  async property(page) {
    // Hover gradient boxes back and forth
    const snap = await page.$('.gradient-snap');
    const smooth = await page.$('.gradient-smooth');
    if (snap && smooth) {
      await hover(page, '.gradient-snap', 1200);
      await page.mouse.move(0, 0);
      await wait(400);
      await hover(page, '.gradient-smooth', 1200);
      await page.mouse.move(0, 0);
      await wait(400);
      await hover(page, '.gradient-smooth', 1000);
    }
  },

  async has(page) {
    // Toggle the checkbox on, wait, toggle off
    await wait(300);
    await click(page, '.toggle');
    await wait(2000);
    await click(page, '.toggle');
    await wait(1500);
    await click(page, '.toggle');
    await wait(800);
  },

  async popover(page) {
    // Open popover, wait, close by clicking outside
    await wait(300);
    await click(page, '.pop-trigger');
    await wait(2000);
    // click outside to dismiss
    await page.mouse.click(50, 50);
    await wait(800);
    await click(page, '.pop-trigger');
    await wait(1500);
    await page.mouse.click(50, 50);
    await wait(500);
  },

  'scroll-timeline': async page => {
    // Scroll the container down slowly, then back up
    const el = await page.$('.scroll-area');
    if (el) {
      const box = await el.boundingBox();
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      await page.mouse.move(cx, cy);
      await smoothScroll(page, '.scroll-area', 600, 2000);
      await wait(400);
      await smoothScroll(page, '.scroll-area', -600, 2000);
    }
  },

  'interpolate-size': async page => {
    // Toggle expand on/off
    await wait(300);
    await click(page, '.toggle');
    await wait(1500);
    await click(page, '.toggle');
    await wait(1000);
    await click(page, '.toggle');
    await wait(1200);
  },

  'starting-style': async page => {
    // Toggle notification in/out
    await wait(300);
    await click(page, '.toggle');
    await wait(1800);
    await click(page, '.toggle');
    await wait(1200);
    await click(page, '.toggle');
    await wait(1000);
  },

  'user-invalid': async page => {
    // Type in the eager input, then the smart input
    await wait(300);
    await click(page, '.input-eager');
    await type(page, 'not-email', 80);
    await wait(400);
    // blur to trigger validation
    await page.mouse.click(10, 10);
    await wait(800);
    await click(page, '.input-smart');
    await type(page, 'not-email', 80);
    await wait(400);
    await page.mouse.click(10, 10);
    await wait(1200);
  },

  'view-timeline': async page => {
    const el = await page.$('.view-area');
    if (el) {
      const box = await el.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await smoothScroll(page, '.view-area', 800, 3000);
      await wait(400);
      await smoothScroll(page, '.view-area', -800, 2000);
    }
  },

  'allow-discrete': async page => {
    await wait(300);
    await click(page, '.toggle');
    await wait(1500);
    await click(page, '.toggle');
    await wait(1200);
    await click(page, '.toggle');
    await wait(1000);
  },

  details: async page => {
    // Click through accordion items
    await wait(500);
    const summaries = await page.$$('.accordion-group summary');
    if (summaries.length >= 3) {
      await summaries[1].click();
      await wait(1200);
      await summaries[2].click();
      await wait(1200);
      await summaries[0].click();
      await wait(1000);
    }
  },

  'light-dark': async page => {
    // Toggle dark/light
    await wait(300);
    await click(page, '.toggle');
    await wait(1800);
    await click(page, '.toggle');
    await wait(1200);
    await click(page, '.toggle');
    await wait(800);
  },

  'color-mix': async page => {
    // Hover over each swatch
    const swatches = await page.$$('.swatch');
    for (const s of swatches) {
      const box = await s.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await wait(500);
      }
    }
    await page.mouse.move(0, 0);
    await wait(400);
  },

  interruptibility: async page => {
    // Hover the transition box, move away mid-animation
    await wait(300);
    await hover(page, '.transition-demo', 600);
    await page.mouse.move(0, 0);
    await wait(600);
    await hover(page, '.transition-demo', 1200);
    await page.mouse.move(0, 0);
    await wait(400);
    await hover(page, '.transition-demo', 300);
    await page.mouse.move(0, 0);
    await wait(1000);
  },

  layer: async page => {
    // Just hover the button and show the effect
    await wait(500);
    await hover(page, '.layer-btn', 1500);
    await page.mouse.move(0, 0);
    await wait(800);
    await hover(page, '.layer-btn', 1000);
    await page.mouse.move(0, 0);
    await wait(500);
  },

  'overscroll-behavior': async page => {
    // Scroll both panels to the end
    await wait(300);
    const contain = await page.$('.overscroll-box.contain');
    const defaultBox = await page.$('.overscroll-box:not(.contain)');
    if (contain) {
      const box = await contain.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await smoothScroll(page, '.overscroll-box.contain', 300, 1500);
      await wait(500);
    }
    if (defaultBox) {
      const box = await defaultBox.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await smoothScroll(page, '.overscroll-box:not(.contain)', 300, 1500);
      await wait(500);
    }
  },

  'focus-visible': async page => {
    // Click a button (no ring), then tab to it (ring appears)
    await wait(500);
    const btns = await page.$$('.focus-btn');
    if (btns[0]) await btns[0].click();
    await wait(1200);
    await page.mouse.click(10, 10);
    await wait(600);
    await page.keyboard.press('Tab');
    await wait(1800);
    await page.keyboard.press('Tab');
    await wait(1200);
  },

  'nth-child': async page => {
    // Move mouse across grid items to create visual motion
    const items = await page.$$('.nth-item');
    for (const item of items) {
      const box = await item.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await wait(350);
      }
    }
    await page.mouse.move(0, 0);
    await wait(500);
  },

  'content-visibility': async page => {
    const el = await page.$('.cvis-scroll');
    if (el) {
      const box = await el.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await smoothScroll(page, '.cvis-scroll', 400, 2000);
      await wait(400);
      await smoothScroll(page, '.cvis-scroll', -400, 1500);
    }
  },

  'linear-easing': async page => {
    // Just let the balls bounce — they animate infinitely
    await wait(5000);
  },

  'text-wrap': async page => {
    // Move cursor between the two sides to draw attention
    await wait(500);
    await page.mouse.move(250, 400);
    await wait(1000);
    await page.mouse.move(550, 400);
    await wait(1000);
    await page.mouse.move(250, 400);
    await wait(800);
    await page.mouse.move(550, 400);
    await wait(800);
  },

  // ── LAWS OF UX ──

  'doherty-threshold': async page => {
    await wait(300);
    await hover(page, '.doherty-btn.fast', 1200);
    await page.mouse.move(0, 0);
    await wait(600);
    await hover(page, '.doherty-btn.slow', 1500);
    await page.mouse.move(0, 0);
    await wait(800);
  },

  'fitts-law': async page => {
    await wait(300);
    await hover(page, '.fitts-btn.good', 1000);
    await page.mouse.move(0, 0);
    await wait(600);
    await hover(page, '.fitts-btn.bad', 1000);
    await page.mouse.move(0, 0);
    await wait(600);
    await hover(page, '.fitts-btn.good', 800);
    await page.mouse.move(0, 0);
    await wait(500);
  },

  proximity: async page => {
    // Move mouse to highlight each group area
    await wait(500);
    await page.mouse.move(400, 300);
    await wait(800);
    await page.mouse.move(400, 500);
    await wait(800);
    await page.mouse.move(600, 300);
    await wait(800);
    await page.mouse.move(600, 500);
    await wait(800);
    await page.mouse.move(0, 0);
    await wait(500);
  },

  'common-region': async page => {
    // Move mouse through the regions
    await wait(500);
    await page.mouse.move(350, 300);
    await wait(700);
    await page.mouse.move(350, 450);
    await wait(700);
    await page.mouse.move(600, 300);
    await wait(700);
    await page.mouse.move(600, 450);
    await wait(700);
    await page.mouse.move(0, 0);
    await wait(500);
  },

  'von-restorff': async page => {
    await wait(300);
    await hover(page, '.btn.primary', 1200);
    await page.mouse.move(0, 0);
    await wait(600);
    await hover(page, '.btn:not(.primary)', 800);
    await page.mouse.move(0, 0);
    await wait(600);
    await hover(page, '.btn.primary', 1000);
    await page.mouse.move(0, 0);
    await wait(500);
  },

  'peak-end': async page => {
    await wait(300);
    await hover(page, '.peak-card.with-exit', 1000);
    await page.mouse.move(0, 0);
    await wait(800);
    await hover(page, '.peak-card.no-exit', 1000);
    await page.mouse.move(0, 0);
    await wait(800);
    await hover(page, '.peak-card.with-exit', 800);
    await page.mouse.move(0, 0);
    await wait(500);
  },
};

// ─── Helpers ───

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function click(page, selector) {
  const el = await page.$(selector);
  if (el) await el.click();
}

async function hover(page, selector, duration = 1000) {
  const el = await page.$(selector);
  if (el) {
    const box = await el.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await wait(duration);
    }
  }
}

async function type(page, text, delay = 80) {
  for (const char of text) {
    await page.keyboard.type(char, { delay });
  }
}

async function smoothScroll(page, selector, distance, duration) {
  const steps = Math.ceil(duration / 30);
  const stepDist = distance / steps;
  await page.evaluate(
    (sel, dist, nSteps) => {
      const el = document.querySelector(sel);
      if (!el) return;
      let step = 0;
      const interval = setInterval(() => {
        el.scrollTop += dist / nSteps;
        step++;
        if (step >= nSteps) clearInterval(interval);
      }, 30);
    },
    selector,
    distance,
    steps,
  );
  await wait(duration + 100);
}

// ─── Frame capture via CDP Page.screencastFrame ───

async function recordDemo(browser, slug, htmlFile) {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  const fileUrl = `file://${path.join(HACKS_DIR, htmlFile)}`;
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 15000 });

  // Wait for entrance animations to settle
  await wait(800);

  // Hide the tag chip during recording
  await page.evaluate(() => {
    const tag = document.querySelector('.tag');
    if (tag) tag.style.display = 'none';
  });

  // Use screenshot-based frame capture (as fast as possible)
  const frames = [];
  let recording = true;

  // Start frame capture loop — capture as fast as screenshots allow
  const captureLoop = (async () => {
    while (recording) {
      try {
        const buf = await page.screenshot({ type: 'jpeg', quality: 90, encoding: 'binary' });
        frames.push(buf);
      } catch (e) {
        break;
      }
      // Tiny yield to let interaction code run
      await new Promise(r => setTimeout(r, 16));
    }
  })();

  // Execute the interaction
  const interact = interactions[slug];
  if (interact) {
    await interact(page);
  } else {
    await wait(4000);
  }

  recording = false;
  await captureLoop;
  await page.close();

  return frames;
}

async function framesToVideo(frames, slug) {
  if (frames.length < 3) {
    console.warn(`  WARN: ${slug} only captured ${frames.length} frames, skipping`);
    return;
  }

  // Write frames to temp dir
  const tmpDir = path.join(OUTPUT_DIR, `_tmp_${slug}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  const ext = 'jpg';
  for (let i = 0; i < frames.length; i++) {
    fs.writeFileSync(path.join(tmpDir, `frame_${String(i).padStart(5, '0')}.${ext}`), frames[i]);
  }

  // Calculate actual FPS from frame count and target ~4-5s duration
  const targetDuration = 5;
  const actualFps = Math.max(8, Math.min(30, Math.round(frames.length / targetDuration)));

  const webmPath = path.join(OUTPUT_DIR, `${slug}.webm`);
  const mp4Path = path.join(OUTPUT_DIR, `${slug}.mp4`);

  // FFmpeg: frames → WebM (VP9)
  try {
    execSync(
      `ffmpeg -y -framerate ${actualFps} -i "${tmpDir}/frame_%05d.${ext}" ` +
        `-c:v libvpx-vp9 -b:v 1M -pix_fmt yuv420p -auto-alt-ref 0 ` +
        `-vf "scale=1280:800" -an "${webmPath}"`,
      { stdio: 'pipe' },
    );
  } catch (e) {
    console.warn(`  WARN: WebM encoding failed for ${slug}: ${e.message}`);
  }

  // FFmpeg: frames → MP4 (H.264)
  try {
    execSync(
      `ffmpeg -y -framerate ${actualFps} -i "${tmpDir}/frame_%05d.${ext}" ` +
        `-c:v libx264 -preset fast -crf 22 -pix_fmt yuv420p ` +
        `-vf "scale=1280:800" -movflags +faststart -an "${mp4Path}"`,
      { stdio: 'pipe' },
    );
  } catch (e) {
    console.warn(`  WARN: MP4 encoding failed for ${slug}: ${e.message}`);
  }

  // Cleanup temp frames
  fs.rmSync(tmpDir, { recursive: true, force: true });

  const webmSize = fs.existsSync(webmPath) ? (fs.statSync(webmPath).size / 1024).toFixed(0) : 0;
  const mp4Size = fs.existsSync(mp4Path) ? (fs.statSync(mp4Path).size / 1024).toFixed(0) : 0;

  return { webmSize, mp4Size, frameCount: frames.length, fps: actualFps };
}

// ─── Main ───

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Get list of slugs to record
  const requestedSlugs = process.argv.slice(2);
  const allFiles = fs
    .readdirSync(HACKS_DIR)
    .filter(f => f.endsWith('.html') && f !== 'index.html')
    .sort();

  const filesToRecord = requestedSlugs.length
    ? allFiles.filter(f => requestedSlugs.includes(f.replace('.html', '')))
    : allFiles;

  console.log(`\nRecording ${filesToRecord.length} demo videos...\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-web-security',
      '--allow-file-access-from-files',
    ],
  });

  let success = 0;
  let failed = 0;

  for (const file of filesToRecord) {
    const slug = file.replace('.html', '');
    process.stdout.write(`  ${slug}...`);

    try {
      const frames = await recordDemo(browser, slug, file);
      const result = await framesToVideo(frames, slug);
      if (result) {
        console.log(
          ` ${result.frameCount} frames → ${result.fps}fps | webm: ${result.webmSize}KB, mp4: ${result.mp4Size}KB`,
        );
        success++;
      } else {
        console.log(' skipped (too few frames)');
        failed++;
      }
    } catch (err) {
      console.log(` FAILED: ${err.message}`);
      failed++;
    }
  }

  await browser.close();
  console.log(`\nDone. success=${success} failed=${failed}\n`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
