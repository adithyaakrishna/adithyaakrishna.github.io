/**
 * Generate snippet preview images from recorded videos.
 *
 * For each snippet:
 *   1. If a video exists (MP4), extract a still frame via ffmpeg
 *   2. If no video, fall back to SVG-based preview
 *
 * Output: static/snippets/previews/{slug}.png (1280x800)
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const SNIPPETS_PATH = path.join(ROOT_DIR, 'src/data/snippets.json');
const OUTPUT_DIR = path.join(ROOT_DIR, 'static/snippets/previews');
const VIDEO_DIR = path.join(ROOT_DIR, 'static/snippets/videos');
const VIDEO_PREVIEW_TIMESTAMP = '00:00:02.00';
// Zoom factor: scale frame larger then center-crop so content appears bigger in preview
const VIDEO_ZOOM = 1.35;

function readSnippets() {
  const payload = fs.readFileSync(SNIPPETS_PATH, 'utf8');
  return JSON.parse(payload);
}

function shouldRegenerate(sourcePaths, outputPath) {
  if (!fs.existsSync(outputPath)) return true;
  const outputStats = fs.statSync(outputPath);
  return sourcePaths.some(sourcePath => {
    if (!fs.existsSync(sourcePath)) return false;
    return fs.statSync(sourcePath).mtimeMs > outputStats.mtimeMs;
  });
}

function generatePreviewFromVideo(videoPath, outputPath) {
  const w = Math.round(1280 * VIDEO_ZOOM);
  const h = Math.round(800 * VIDEO_ZOOM);
  const vf = `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=1280:800:(iw-1280)/2:(ih-800)/2`;
  const result = spawnSync(
    'ffmpeg',
    [
      '-y',
      '-loglevel',
      'error',
      '-ss',
      VIDEO_PREVIEW_TIMESTAMP,
      '-i',
      videoPath,
      '-frames:v',
      '1',
      '-vf',
      vf,
      outputPath,
    ],
    {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: 'pipe',
    },
  );

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || 'ffmpeg preview extraction failed');
  }
}

function escapeXml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createFallbackSvg(snippet) {
  const tag = escapeXml(snippet.tag || snippet.slug);
  const title = escapeXml((snippet.title || snippet.slug).toLowerCase());
  const monoFont = 'Space Mono, Courier Prime, monospace';
  const tagFontSize = 18;
  const titleFontSize = 32;
  const pillHeight = 44;
  const pillX = 72;
  const pillY = 72;
  const pillWidth = Math.max(tag.length * 14 + 36, 120);
  const tagTextX = pillX + 14;
  const tagTextY = pillY + 30;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
  <rect width="1280" height="800" fill="#ffffff" />
  <rect x="${pillX}" y="${pillY}" width="${pillWidth}" height="${pillHeight}" rx="4"
        fill="rgba(29,127,83,0.1)" stroke="rgba(22,51,37,0.1)" stroke-width="1" />
  <text x="${tagTextX}" y="${tagTextY}" font-size="${tagFontSize}" font-family="${monoFont}" font-weight="400"
        letter-spacing="0.5" fill="#1d7f53">${tag}</text>
  <text x="640" y="400" font-size="${titleFontSize}" font-family="${monoFont}" font-weight="400"
        fill="#163325" text-anchor="middle">${title}</text>
</svg>`;
}

async function generatePreview(snippet) {
  const sourcePath = path.join(ROOT_DIR, snippet.sourceFile);
  const videoPath = path.join(VIDEO_DIR, `${snippet.slug}.mp4`);
  const outputPath = path.join(OUTPUT_DIR, `${snippet.slug}.png`);

  if (!fs.existsSync(sourcePath)) return { status: 'missing-source', slug: snippet.slug };

  const sourcePaths = [sourcePath];
  if (fs.existsSync(videoPath)) sourcePaths.push(videoPath);

  if (!shouldRegenerate(sourcePaths, outputPath)) return { status: 'skipped', slug: snippet.slug };

  if (fs.existsSync(videoPath)) {
    generatePreviewFromVideo(videoPath, outputPath);
    return { status: 'generated-from-video', slug: snippet.slug };
  }

  // Fallback: minimal SVG → PNG
  try {
    const sharp = require('sharp');
    const svg = createFallbackSvg(snippet);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9, quality: 90 }).toFile(outputPath);
    return { status: 'generated-from-svg', slug: snippet.slug };
  } catch (e) {
    return { status: 'failed', slug: snippet.slug, error: e.message };
  }
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const snippets = readSnippets();

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const snippet of snippets) {
    try {
      const result = await generatePreview(snippet);
      if (result.status.startsWith('generated')) {
        generated++;
        console.log(`  ${result.slug} → ${result.status}`);
      }
      if (result.status === 'skipped') skipped++;
      if (result.status === 'missing-source' || result.status === 'failed') {
        failed++;
        console.warn(`  ${result.slug} → ${result.status} ${result.error || ''}`);
      }
    } catch (error) {
      failed++;
      console.warn(`  ${snippet.slug} → failed: ${error.message}`);
    }
  }

  console.log(`\n[snippets-preview] generated=${generated} skipped=${skipped} failed=${failed}`);
}

main().catch(error => {
  console.error('[snippets-preview] fatal error:', error.message);
  process.exit(1);
});
