import API from "./API";
export const getAllClass = async ()=>{
    try {
        const response = await API().get('/admin/class/listclass')
        return response.data;
    } catch (error) {
        throw error;
    }    
}

export const getClass = async (id)=>{
    try {
        const response = await API().get('/admin/class/getclass',{params: {id: id}})
        return response.data;
    } catch (error) {
        throw error;
    }
      
}

export const getClassByCourse = async (id)=>{
    try {
        const response = await API().get('/admin/class/listclass',{params: {course: id}})
        return response.data;
    } catch (error) {
        throw error;
    }
      
}

export const createClass = async (classinfor)=>{
    try {
        const response = await API().post('/admin/class/create',classinfor)
        return response.data;
    } catch (error) {
        throw error;
    }     
}

export const updateClass = async (id,update)=>{
    try {
        const response = await API().put('/admin/class/update',{id,update})
        return response.data;
    } catch (error) {
        throw error;
    }     
}

export const finishClass = async (id )=>{
    try {
        const response = await API().get('/admin/class/finished',{params:{id}});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addStudentsInClass = async (id,students )=>{
    try {
        const response = await API().post('/admin/class/addstudent',{id,students});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addTeachersInClass = async (id,teachers )=>{
    try {
        const response = await API().post('/admin/class/addteacher',{id,teachers});
        return response.data;
    } catch (error) {
        throw error;
    }
}