const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'duodkaexg', 
    api_key: '658124354917993', 
    api_secret: 'b_V8fAaCKOlfg-gICwecYSLuy9g' ,
    folder: 'userImages'
  });

module.exports = cloudinary;
