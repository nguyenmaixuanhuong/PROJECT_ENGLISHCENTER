import API from "./API";
export const removeFile = async (publicId) => {
    try {
        const response = await API().get('/information/removefile', { params: { publicId: publicId } })
        return response.data;
    }
    catch (error) {
        throw error;
    }

}


export const createNews = async (infor) => {
    try {
        const response = await API().post('/information/create', infor)
        return response.data;
    }
    catch (error) {
        throw error;
    }

}

export const listInformation = async (id) => {
    try {
        const response = await API().get('/information/getlistinfor', { params: { id: id } })
        return response.data;
    }
    catch (error) {
        throw error;
    }

}

export const deleteNews = async (id, classid) => {
    try {
        const response = await API().delete('/information/delete', { params: { id: id, classid: classid } })
        return response.data;
    }
    catch (error) {
        throw error;
    }

}

export const updateNews = async (id, inforUpdate) => {
    try {
        const response = await API().post('/information/update', { id: id, inforUpdate: inforUpdate })
        return response.data;
    }
    catch (error) {
        throw error;
    }

}

export const addComment = async (id, comment) => {
    try {
        const response = await API().post('/information/addcomment', { id: id, comment: comment })
        return response.status;
    }
    catch (error) {
        return error.response.status
    }

}
export const deleteComment = async (id) => {
    try {
        const response = await API().get('/information/deletecomment', { params: { id: id } })
        return response.status;
    }
    catch (error) {
        return error.response.status
    }

}

export const Notifications = async (id) => {
    try {
        const response = await API().get('/information/notifications', { params: { id: id } })
        return response.data;
    }
    catch (error) {
        return null;
    }
}

export const isCheckedNotify = async (idAccount, idNotify) => {
    try {
        const response = await API().get('/information/checked', { params: { idAccount: idAccount, idNotify: idNotify } })
        return response;
    }
    catch (error) {
        return error.response
    }
}