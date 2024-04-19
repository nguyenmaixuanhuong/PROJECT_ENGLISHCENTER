const cloudinary = require('cloudinary').v2;
const config = require('../config');
cloudinary.config({
    cloud_name: config.cloud.cloud_name,
    api_key: config.cloud.api_key,
    api_secret: config.cloud.api_secret
})

exports.deleteFile = async (publicId)=> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
}

