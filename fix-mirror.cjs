const sharp = require('sharp');

async function processImage(inputFile, outputFile) {
  try {
    const img = sharp(inputFile);
    const metadata = await img.metadata();
    
    // On veut un ratio de 4:3 parfait pour la grille
    const targetWidth = 800;
    const targetHeight = 600;
    
    // Pour éviter l'effet miroir bizarre et le flou qui bave, 
    // on va juste forcer l'image d'origine à s'insérer proprement dans le cadre.
    // L'astuce c'est d'utiliser l'image d'origine et de zoomer légèrement.
    await img
      .resize({
        width: targetWidth,
        height: targetHeight,
        fit: 'cover', // cover coupe le haut et le bas mais remplit tout proprement sans générer de pixels
        position: 'center'
      })
      .toFile(outputFile);
      
    console.log(`Processed ${outputFile} properly!`);
  } catch (err) {
    console.error(err);
  }
}

processImage('/Users/user/my-burger/public/garden-poulet.jpg', '/Users/user/my-burger/public/garden-poulet-final.jpg');
processImage('/Users/user/my-burger/public/spicy-smash.jpg', '/Users/user/my-burger/public/spicy-smash-final.jpg');
