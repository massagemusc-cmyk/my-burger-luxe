const sharp = require('sharp');

async function processImage() {
  try {
    const inputPath = '/Users/user/my-burger/public/garden-poulet.jpg';
    const outputPath = '/Users/user/my-burger/public/garden-poulet-smaller2.jpg';
    
    const img = sharp(inputPath);
    const metadata = await img.metadata();
    
    // On augmente la taille du canevas de 25% pour réduire la taille perçue du burger
    const newWidth = Math.round(metadata.width * 1.25);
    const newHeight = Math.round(metadata.height * 1.25);
    
    // On crée un fond flouté en utilisant "cover" pour qu'il n'y ait plus de barres bizarres
    const bgBuffer = await img.clone()
      .resize(newWidth, newHeight, { fit: 'cover' })
      .blur(50)
      .toBuffer();
      
    // On superpose l'image d'origine parfaitement au centre
    await sharp(bgBuffer)
      .composite([{ input: inputPath }])
      .toFile(outputPath);
      
    console.log('Image shrunk successfully without weird bars!');
  } catch (err) {
    console.error(err);
  }
}

processImage();
