const sharp = require('sharp');
sharp('public/garden-poulet.jpg').metadata().then(m => console.log(m.width, m.height));
