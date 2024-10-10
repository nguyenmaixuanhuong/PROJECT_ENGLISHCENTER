import axios from 'axios';
// import {removeFile} from '../services/information'
const cloud_name = `dhvgsmsf2`
export const uploadFile = async (file) => {
    const preset_name = `document`
    const api = `https://api.cloudinary.com/v1_1/${cloud_name}/upload`
    const formData = new FormData();
    var fileupload = {
        url: '',
        publicId: '',
    };
    formData.append('upload_preset', preset_name);
    formData.append('folder', 'audio');
    formData.append('file', file);
    await axios.post(api, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((response) => {
            fileupload.url = response.data.secure_url;
            fileupload.publicId = response.data.public_id;
        })
        .catch((error) => { return error })
    return fileupload;
};

// export const deleteFiles = async (publicId)=>{
//     await removeFile(publicId).then((response) => {
//         return true
//     })
//     .catch((error)=>{
//         return false
//     })
//   }

