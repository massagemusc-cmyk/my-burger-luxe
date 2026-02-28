const sharp = require('sharp');

async function processImage() {
  try {
    const inputPath = '/Users/user/my-burger/public/garden-poulet.jpg';
    const outputPath = '/Users/user/my-burger/public/garden-poulet-smaller3.jpg';
    
    // On va forcer l'image à devenir un grand carré 1000x1000 avec un effet miroir sur les bords pour remplir naturellement le fond
    await sharp(inputPath)
      .resize({
        width: 600,
        height: 600,
        fit: 'contain',
        position: 'center',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .extend({
        top: 200,
        bottom: 200,
        left: 200,
        right: 200,
        extendWith: 'mirror'
      })
      .resize(1000, 1000)
      .toFile(outputPath);
      
    console.log('Image perfectly generated with mirrored edges!');
  } catch (err) {
    console.error(err);
  }
}

processImage();
