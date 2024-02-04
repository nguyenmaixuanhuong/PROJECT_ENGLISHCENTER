import API from "./API";

export const getListTeacher = async ()=>{
    try {
        const response = await API().get('/admin/teacher/teacherlist')
        return response.data;
    } catch (error) {
        throw error;
    }
      
}

export const createTeacher = async (teacher)=>{
    try {
        const response = await API().post('/admin/teacher/create',{teacher})
        return response.data;
    } catch (error) {
        return null;
    }
}

export const getTeacher = async (id)=>{
    try {
        const response = await API().get('/admin/teacher/getteacher',{params:{id}})
        return response.data;
    } catch (error) {
        return null;
    }
}

export const updateTeacher = async (id,infor)=>{
    try {
        const response = await API().post('/admin/teacher/update',{ id, infor })
        return response.data;
    } catch (error) {
        return null;
    }
}