const sharp = require('sharp');

async function processImage() {
  try {
    const inputPath = '/Users/user/my-burger/public/crousty-poulet.jpg';
    const outputPath = '/Users/user/my-burger/public/crousty-poulet-perfect.jpg';
    
    const img = sharp(inputPath);
    const metadata = await img.metadata();
    
    // On va zoomer de 20% (on garde 80% de l'image au centre)
    const newWidth = Math.round(metadata.width * 0.80);
    const newHeight = Math.round(metadata.height * 0.80);
    const left = Math.round((metadata.width - newWidth) / 2);
    const top = Math.round((metadata.height - newHeight) / 2);
    
    await img
      .extract({ left, top, width: newWidth, height: newHeight })
      .toFile(outputPath);
      
    console.log('Image cropped and zoomed perfectly!');
  } catch (err) {
    console.error(err);
  }
}

processImage();
