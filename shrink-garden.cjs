const sharp = require('sharp');

async function processImage() {
  try {
    const inputPath = '/Users/user/my-burger/public/garden-poulet.jpg';
    const outputPath = '/Users/user/my-burger/public/garden-poulet-smaller.jpg';
    
    const img = sharp(inputPath);
    const metadata = await img.metadata();
    
    // On augmente la taille du canevas de 10% pour réduire la taille perçue du burger
    const newWidth = Math.round(metadata.width * 1.10);
    const newHeight = Math.round(metadata.height * 1.10);
    
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
