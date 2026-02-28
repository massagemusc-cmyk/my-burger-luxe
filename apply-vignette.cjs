const sharp = require('sharp');

async function processImage(inputFile, outputFile) {
  try {
    const canvasW = 800;
    const canvasH = 600;
    
    // On rétrécit l'image de 15% environ par rapport au canvas pour qu'elle paraisse plus petite
    const imgW = 680;
    const imgH = 510;

    // Masque SVG avec un dégradé radial (fade transparent sur les bords)
    const svgMask = `
      <svg width="${imgW}" height="${imgH}">
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%">
            <stop offset="65%" stop-color="white" stop-opacity="1"/>
            <stop offset="100%" stop-color="white" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="${imgW}" height="${imgH}" fill="url(#grad)"/>
      </svg>
    `;

    // On applique le masque pour adoucir les bords de l'image
    const fg = await sharp(inputFile)
      .resize(imgW, imgH, { fit: 'cover' })
      .composite([{
        input: Buffer.from(svgMask),
        blend: 'dest-in'
      }])
      .png()
      .toBuffer();

    // On pose l'image aux bords doux sur un fond 100% transparent de 800x600
    await sharp({
      create: {
        width: canvasW,
        height: canvasH,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite([{ input: fg, gravity: 'center' }])
    .png()
    .toFile(outputFile);

    console.log(`Processed ${outputFile} with transparent vignette!`);
  } catch (err) {
    console.error(err);
  }
}

processImage('/Users/user/my-burger/public/garden-poulet.jpg', '/Users/user/my-burger/public/garden-poulet-vignette.png');
processImage('/Users/user/my-burger/public/spicy-smash.jpg', '/Users/user/my-burger/public/spicy-smash-vignette.png');
