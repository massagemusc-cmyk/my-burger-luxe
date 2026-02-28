const sharp = require('sharp');

async function processImage(inputFile, outputFile) {
  try {
    const img = sharp(inputFile);
    const metadata = await img.metadata();
    
    // On veut un format qui remplisse complètement le cadre de la carte sans laisser de vide.
    // La carte a un format plutôt horizontal en haut (environ 16:9 ou 4:3).
    // On va juste forcer l'image à se recadrer proprement au centre sans AUCUN effet.
    await img
      .resize({
        width: 800,
        height: 600,
        fit: 'cover',
        position: 'center'
      })
      .toFile(outputFile);
      
    console.log(`Processed ${outputFile} properly!`);
  } catch (err) {
    console.error(err);
  }
}

// On reprend les TOUTES PREMIÈRES images d'origine (sans aucun effet flou ou miroir appliqué dessus)
processImage('/Users/user/my-burger/public/garden-poulet.jpg', '/Users/user/my-burger/public/garden-poulet-final-clean.jpg');
processImage('/Users/user/my-burger/public/spicy-smash.jpg', '/Users/user/my-burger/public/spicy-smash-final-clean.jpg');
