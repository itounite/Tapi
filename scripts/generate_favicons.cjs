const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateFavicons() {
  const publicDir = path.join(__dirname, '..', 'public');
  const svgPath = path.join(publicDir, 'favicon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  const pngBuffers = {};

  for (const { name, size } of sizes) {
    const outPath = path.join(publicDir, name);
    const buf = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();
    fs.writeFileSync(outPath, buf);
    pngBuffers[size] = buf;
    console.log(`Generated ${name} (${size}x${size})`);
  }

  // Generate multi-resolution ICO file from 16x16 and 32x32 PNGs
  // ICO format structure:
  // ICONDIR header: 6 bytes
  //   - reserved: 2 bytes (0)
  //   - type: 2 bytes (1 for ICO)
  //   - count: 2 bytes (number of images, e.g. 2)
  // ICONDIRENTRY: 16 bytes per image
  //   - width: 1 byte (16 or 32, 0 for 256)
  //   - height: 1 byte (16 or 32, 0 for 256)
  //   - color count: 1 byte (0)
  //   - reserved: 1 byte (0)
  //   - planes: 2 bytes (1)
  //   - bit count: 2 bytes (32)
  //   - bytes in res: 4 bytes (size of png)
  //   - image offset: 4 bytes
  // Followed by raw PNG data for each image.
  
  const icoSizes = [16, 32, 48];
  const numImages = icoSizes.length;
  const headerSize = 6;
  const entrySize = 16;
  let currentOffset = headerSize + entrySize * numImages;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(numImages, 4);

  const entries = [];
  const imageBuffers = [];

  for (const size of icoSizes) {
    const buf = pngBuffers[size];
    imageBuffers.push(buf);

    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buf.length, 8); // size
    entry.writeUInt32LE(currentOffset, 12); // offset

    entries.push(entry);
    currentOffset += buf.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...imageBuffers]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Generated favicon.ico with 16x16, 32x32, 48x48 PNG icons');

  // Also write webmanifest
  const manifest = {
    name: "Tapi Life (タピ・ライフ)",
    short_name: "Tapi Life",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    theme_color: "#FFFDF9",
    background_color: "#FFFDF9",
    display: "standalone"
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Generated site.webmanifest');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
