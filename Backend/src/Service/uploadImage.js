const cloudinary = require('cloudinary').v2;
const config = require('../config');
const multer = require('multer');
const axios = require('axios');
cloudinary.config({
    cloud_name: config.cloud.cloud_name,
    api_key: config.cloud.api_key,
    api_secret: config.cloud.api_secret
})



function uploadImage(image, folder) {
    const api = `https://api.cloudinary.com/v1_1/${config.cloud.cloud_name}/image/upload`
    const formData = new FormData();
    formData.append('upload_preset', config.cloud.preset_name);
    formData.append('folder', folder);
    formData.append('file', image);
    return axios.post(api, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((response) => { return response.data.serure_url })
        .catch((error) => { return error.message })
    // return new Promise((resolve, reject) => {
    //     cloudinary.uploader.upload(image, { folder: 'image' }, (error, result) => {
    //         if (error) {
    //             // Xử lý lỗi nếu có
    //             console.log(error);
    //             reject(error);
    //         } else {
    //             // Lấy URL công cộng của ảnh từ kết quả Cloudinary
    //             const imageUrl = result.secure_url;
    //             console.log(imageUrl);
    //             // Trả về URL của hình ảnh
    //             resolve(imageUrl);
    //         }
    //     });
    // });
};
module.exports = uploadImage