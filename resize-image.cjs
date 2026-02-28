const sharp = require('sharp');

sharp('/Users/user/my-burger/public/crousty-poulet.jpg')
  .metadata()
  .then(metadata => {
    // Calcul pour faire un gros plan sur le centre
    const width = Math.round(metadata.width * 0.6);
    const height = Math.round(metadata.height * 0.6);
    const left = Math.round((metadata.width - width) / 2);
    const top = Math.round((metadata.height - height) / 2);

    return sharp('/Users/user/my-burger/public/crousty-poulet.jpg')
      .extract({ left, top, width, height })
      .resize({
        width: 800,
        height: 800,
        fit: sharp.fit.cover,
        position: sharp.strategy.center
      })
      .toFile('/Users/user/my-burger/public/crousty-poulet-zoomed.jpg');
  })
  .then(info => {
    console.log('Image cropped and zoomed successfully', info);
  })
  .catch(err => {
    console.error('Error cropping image', err);
  });
