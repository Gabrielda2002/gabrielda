const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const toCrc = Buffer.concat([typeBuf, data]);
  const crc = zlib.crc32(toCrc);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdrData);

  const rawScanlines = Buffer.alloc(height * (1 + width * 4));
  let srcOffset = 0;
  let dstOffset = 0;
  for (let y = 0; y < height; y++) {
    rawScanlines[dstOffset++] = 0; // Filter: None
    rgbaBuffer.copy(rawScanlines, dstOffset, srcOffset, srcOffset + width * 4);
    dstOffset += width * 4;
    srcOffset += width * 4;
  }

  const idatData = zlib.deflateSync(rawScanlines);
  const idatChunk = createChunk('IDAT', idatData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// 1. Build 16x16 RGBA buffer
const grid = Array.from({ length: 16 }, () => Array.from({ length: 16 }, () => [0, 0, 0, 0]));

function parseHex(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b, 255];
}

function fillRect(x, y, w, h, hex) {
  const color = parseHex(hex);
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      grid[y + dy][x + dx] = [...color];
    }
  }
}

// Stand base & neck
fillRect(6, 12, 4, 2, '#141c4a');
fillRect(4, 14, 8, 2, '#2f8fe0');

// Monitor outer bezel
fillRect(1, 2, 14, 9, '#1c2560');
fillRect(2, 1, 12, 11, '#1c2560');

// Bezel neon border
fillRect(2, 1, 12, 1, '#2f8fe0');
fillRect(2, 11, 12, 1, '#2f8fe0');
fillRect(1, 2, 1, 9, '#2f8fe0');
fillRect(14, 2, 1, 9, '#2f8fe0');

// CRT screen inside
fillRect(3, 3, 10, 7, '#040a24');

// Screen phosphor scanline / highlight
fillRect(3, 3, 10, 1, '#0e1a2c');

// Terminal prompt > in Lime Green
fillRect(4, 5, 1, 1, '#7ed44a');
fillRect(5, 6, 1, 1, '#7ed44a');
fillRect(4, 7, 1, 1, '#7ed44a');

// Terminal blinking cursor in Sun Gold
fillRect(7, 6, 2, 1, '#ffd34e');

// Monitor power LED dot
fillRect(12, 10, 1, 1, '#7ed44a');

function generateScaledPNG(targetWidth, targetHeight, scale, offsetX = 0, offsetY = 0, bgHex = null) {
  const buf = Buffer.alloc(targetWidth * targetHeight * 4);
  const bgColor = bgHex ? parseHex(bgHex) : [0, 0, 0, 0];

  // Fill default background
  for (let i = 0; i < targetWidth * targetHeight; i++) {
    buf[i * 4 + 0] = bgColor[0];
    buf[i * 4 + 1] = bgColor[1];
    buf[i * 4 + 2] = bgColor[2];
    buf[i * 4 + 3] = bgColor[3];
  }

  // Draw scaled pixel grid
  for (let gy = 0; gy < 16; gy++) {
    for (let gx = 0; gx < 16; gx++) {
      const color = grid[gy][gx];
      if (color[3] === 0) continue; // transparent
      for (let sy = 0; sy < scale; sy++) {
        for (let sx = 0; sx < scale; sx++) {
          const px = offsetX + gx * scale + sx;
          const py = offsetY + gy * scale + sy;
          if (px >= 0 && px < targetWidth && py >= 0 && py < targetHeight) {
            const idx = (py * targetWidth + px) * 4;
            buf[idx + 0] = color[0];
            buf[idx + 1] = color[1];
            buf[idx + 2] = color[2];
            buf[idx + 3] = color[3];
          }
        }
      }
    }
  }

  return encodePNG(targetWidth, targetHeight, buf);
}

// Generate targets
const outputs = [
  { file: 'public/favicon-32x32.png', width: 32, height: 32, scale: 2 },
  { file: 'public/icon-192.png', width: 192, height: 192, scale: 12 },
  { file: 'public/icon-512.png', width: 512, height: 512, scale: 32 },
  { file: 'public/apple-touch-icon.png', width: 180, height: 180, scale: 10, offsetX: 10, offsetY: 10, bg: '#0a1130' }
];

for (const opt of outputs) {
  const dest = path.resolve(process.cwd(), opt.file);
  const pngData = generateScaledPNG(opt.width, opt.height, opt.scale, opt.offsetX || 0, opt.offsetY || 0, opt.bg || null);
  fs.writeFileSync(dest, pngData);
  console.log(`Generated ${opt.file}: ${pngData.length} bytes (${opt.width}x${opt.height})`);
}
