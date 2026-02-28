const sharp = require('sharp');

async function processImage() {
  try {
    const inputPath = '/Users/user/my-burger/public/crousty-poulet.jpg';
    const outputPath = '/Users/user/my-burger/public/crousty-poulet-smaller.jpg';
    
    const img = sharp(inputPath);
    const metadata = await img.metadata();
    
    // On augmente la taille du canevas de 15%
    const newWidth = Math.round(metadata.width * 1.15);
    const newHeight = Math.round(metadata.height * 1.15);
    
    // On crée un fond flouté
    const bgBuffer = await img.clone()
      .resize(newWidth, newHeight, { fit: 'fill' })
      .blur(40)
      .toBuffer();
      
    // On superpose l'image
    await sharp(bgBuffer)
      .composite([{ input: inputPath }])
      .toFile(outputPath);
      
    console.log('Image shrunk successfully');
  } catch (err) {
    console.error(err);
  }
}

processImage();
