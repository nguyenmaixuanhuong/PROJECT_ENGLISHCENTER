const cloudinary = require('cloudinary').v2;
const config = require('../config');
const multer = require('multer');
const axios = require('axios');
cloudinary.config({
    cloud_name: config.cloud.cloud_name,
    api_key: config.cloud.api_key,
    api_secret: config.cloud.api_secret
})

exports.deleteFile = async (publicId)=> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
}

