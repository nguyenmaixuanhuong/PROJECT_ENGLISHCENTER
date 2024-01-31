import API from "./API";

export const getListStudent = async ()=>{
    try {
        const response = await API().get('/admin/student/liststudent')
        return response.data;
    } catch (error) {
        throw error;
    }
      
}

export const createStudent = async (student)=>{
    try {
        const response = await API().post('/admin/student/create',{student})
        return response.data;
    } catch (error) {
        return null;
    }
}

export const getStudent = async (id)=>{
    try {
        const response = await API().get('/admin/student/getstudent',{params:{id}})
        return response.data;
    } catch (error) {
        return null;
    }
}

export const updateStudent = async (id,infor)=>{
    try {
        const response = await API().post('/admin/student/update',{ id, infor })
        return response.data;
    } catch (error) {
        return null;
    }
}