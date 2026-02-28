const sharp = require('sharp');

async function processImage() {
  try {
    const inputPath = '/Users/user/my-burger/public/spicy-smash.jpg';
    const outputPath = '/Users/user/my-burger/public/spicy-smash-smaller.jpg';
    
    const img = sharp(inputPath);
    const metadata = await img.metadata();
    
    // On augmente la taille du canevas de 15% pour "rétrécir" le burger
    const newWidth = Math.round(metadata.width * 1.15);
    const newHeight = Math.round(metadata.height * 1.15);
    
    // On crée un fond flouté à partir de l'image originale
    const bgBuffer = await img.clone()
      .resize(newWidth, newHeight, { fit: 'fill' })
      .blur(40)
      .toBuffer();
      
    // On superpose l'image originale au centre du fond flouté
    await sharp(bgBuffer)
      .composite([{ input: inputPath }])
      .toFile(outputPath);
      
    console.log('Image shrunk successfully');
  } catch (err) {
    console.error(err);
  }
}

processImage();
