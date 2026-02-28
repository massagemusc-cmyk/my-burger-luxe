const sharp = require('sharp');

async function processImage(inputFile, outputFile) {
  try {
    const img = sharp(inputFile);
    const metadata = await img.metadata();
    
    // On veut élargir l'image pour qu'elle ait un format plus panoramique (ex: 16:9)
    // Cela évitera que object-cover rogne le haut et le bas du burger.
    const targetWidth = Math.round(metadata.height * 1.5);
    const extendSide = Math.max(0, Math.round((targetWidth - metadata.width) / 2));
    
    if (extendSide > 0) {
      await img
        .extend({
          top: 0,
          bottom: 0,
          left: extendSide,
          right: extendSide,
          extendWith: 'mirror'
        })
        .toFile(outputFile);
      console.log(`Processed ${outputFile} with mirrored edges!`);
    } else {
      console.log(`${inputFile} is already wide enough.`);
    }
  } catch (err) {
    console.error(err);
  }
}

processImage('/Users/user/my-burger/public/garden-poulet.jpg', '/Users/user/my-burger/public/garden-poulet-fixed.jpg');
processImage('/Users/user/my-burger/public/spicy-smash.jpg', '/Users/user/my-burger/public/spicy-smash-fixed.jpg');
