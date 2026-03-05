const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.resolve(__dirname, '..');
const SNIPPETS_PATH = path.join(ROOT_DIR, 'src/data/snippets.json');
const OUTPUT_DIR = path.join(ROOT_DIR, 'static/snippets/previews');

function readSnippets() {
  const payload = fs.readFileSync(SNIPPETS_PATH, 'utf8');
  return JSON.parse(payload);
}

function decodeHtmlEntities(value = '') {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function escapeXml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function extractCodeFromHtml(rawSource = '') {
  const codeMatch = rawSource.match(/<pre><code class="[^"]+">([\s\S]*?)<\/code><\/pre>/i);
  const codePayload = codeMatch && codeMatch[1] ? decodeHtmlEntities(codeMatch[1]) : '';
  const compactLines = codePayload
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .slice(0, 6);
  return compactLines;
}

function getTonePalette(tagTone = 'mint') {
  const paletteMap = {
    mint: { primary: '#34d399', secondary: '#86efac' },
    violet: { primary: '#a78bfa', secondary: '#c4b5fd' },
    rose: { primary: '#fb7185', secondary: '#fda4af' },
  };
  return paletteMap[tagTone] || paletteMap.mint;
}

function createSvgPreview({ snippet, codeLines }) {
  const { primary, secondary } = getTonePalette(snippet.tagTone);
  const title = escapeXml(snippet.title || snippet.slug);
  const tag = escapeXml(snippet.tag || snippet.slug);
  const description = escapeXml(snippet.description || '');
  const renderedCode = codeLines.length
    ? codeLines
        .map((line, index) => `<tspan x="58" dy="${index === 0 ? 0 : 30}">${escapeXml(line)}</tspan>`)
        .join('')
    : `<tspan x="58" dy="0">/* preview unavailable */</tspan>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06080f" />
      <stop offset="100%" stop-color="#111421" />
    </linearGradient>
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${primary}" />
      <stop offset="100%" stop-color="${secondary}" />
    </linearGradient>
    <filter id="softBlur">
      <feGaussianBlur stdDeviation="40" />
    </filter>
  </defs>

  <rect width="1280" height="800" fill="url(#bgGradient)" />
  <circle cx="230" cy="220" r="200" fill="${primary}" opacity="0.22" filter="url(#softBlur)" />
  <circle cx="1040" cy="130" r="170" fill="${secondary}" opacity="0.17" filter="url(#softBlur)" />

  <rect x="52" y="52" width="1176" height="696" rx="24" fill="rgba(13,17,28,0.78)" stroke="rgba(255,255,255,0.15)" />
  <rect x="52" y="52" width="1176" height="80" rx="24" fill="rgba(255,255,255,0.04)" />
  <circle cx="90" cy="92" r="8" fill="#fb7185" />
  <circle cx="118" cy="92" r="8" fill="#facc15" />
  <circle cx="146" cy="92" r="8" fill="#34d399" />
  <rect x="188" y="77" width="260" height="30" rx="15" fill="url(#accentGradient)" opacity="0.9" />
  <text x="206" y="98" font-size="18" font-family="Courier Prime, monospace" fill="#040508">${tag}</text>

  <text x="58" y="188" font-size="54" font-family="Outfit, Space Grotesk, Arial" font-weight="700" fill="#f8fafc">${title}</text>
  <text x="58" y="228" font-size="28" font-family="Outfit, Arial" fill="rgba(236,239,245,0.74)">${description}</text>

  <rect x="58" y="278" width="1164" height="430" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.11)" />
  <text x="58" y="338" font-size="23" font-family="Courier Prime, monospace" fill="rgba(241,245,249,0.86)">
    ${renderedCode}
  </text>
</svg>`;
}

function shouldRegenerate(sourcePath, outputPath) {
  if (!fs.existsSync(outputPath)) return true;
  const outputStats = fs.statSync(outputPath);
  const sourceStats = fs.statSync(sourcePath);
  return sourceStats.mtimeMs > outputStats.mtimeMs;
}

async function generatePreview(snippet) {
  const sourcePath = path.join(ROOT_DIR, snippet.sourceFile);
  const outputPath = path.join(OUTPUT_DIR, `${snippet.slug}.png`);
  if (!fs.existsSync(sourcePath)) return { status: 'missing-source', slug: snippet.slug };
  if (!shouldRegenerate(sourcePath, outputPath)) return { status: 'skipped', slug: snippet.slug };

  const rawHtml = fs.readFileSync(sourcePath, 'utf8');
  const codeLines = extractCodeFromHtml(rawHtml);
  const svgPreview = createSvgPreview({ snippet, codeLines });

  await sharp(Buffer.from(svgPreview))
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(outputPath);

  return { status: 'generated', slug: snippet.slug };
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const snippets = readSnippets();

  let generatedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const snippet of snippets) {
    try {
      const result = await generatePreview(snippet);
      if (result.status === 'generated') generatedCount += 1;
      if (result.status === 'skipped') skippedCount += 1;
      if (result.status === 'missing-source') {
        failedCount += 1;
        console.warn(`[snippets-preview] missing source for ${result.slug}`);
      }
    } catch (error) {
      failedCount += 1;
      console.warn(`[snippets-preview] failed for ${snippet.slug}: ${error.message}`);
    }
  }

  console.log(
    `[snippets-preview] generated=${generatedCount} skipped=${skippedCount} failed=${failedCount}`
  );
}

main().catch(error => {
  console.error('[snippets-preview] fatal error:', error.message);
  process.exit(1);
});
