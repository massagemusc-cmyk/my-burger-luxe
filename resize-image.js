const fs = require('fs');
const sharp = require('sharp');

sharp('/Users/user/my-burger/public/crousty-poulet.jpg')
  .resize({
    width: 800,
    height: 800,
    fit: sharp.fit.cover,
    position: sharp.strategy.center
  })
  .toFile('/Users/user/my-burger/public/crousty-poulet-zoomed.jpg')
  .then(info => {
    console.log('Image cropped and zoomed successfully', info);
  })
  .catch(err => {
    console.error('Error cropping image', err);
  });
