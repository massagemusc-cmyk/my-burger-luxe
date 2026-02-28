const sharp = require('sharp');

async function processImage() {
  try {
    const inputPath = '/Users/user/my-burger/public/garden-poulet.jpg';
    const outputPath = '/Users/user/my-burger/public/garden-poulet-smaller3.jpg';
    
    // On crée un fond carré 1000x1000 rempli avec l'image étirée et ultra floutée
    const bgBuffer = await sharp(inputPath)
      .resize(1000, 1000, { fit: 'cover' })
      .blur(40)
      .toBuffer();
      
    // On prend l'image du burger et on la redimensionne pour qu'elle tienne dans 800x800 maximum, fond transparent
    const fgBuffer = await sharp(inputPath)
      .resize(800, 800, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
      
    // On superpose le burger net (plus petit) sur le fond carré flouté
    await sharp(bgBuffer)
      .composite([{ input: fgBuffer }])
      .toFile(outputPath);
      
    console.log('Image perfectly generated with clean blurred background!');
  } catch (err) {
    console.error(err);
  }
}

processImage();
