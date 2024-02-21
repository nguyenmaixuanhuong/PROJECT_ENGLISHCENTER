import API from "./API";
export const getListCourse = async ()=>{
    try {
        const response = await API().get('/admin/course/listcourse')
        return response.data;
    } catch (error) {
        throw error;
    }
      
}

export const addCourse = async (course)=>{
    try {
        const response = await API().post('/admin/course/create',course,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data;
    } catch (error) {
        throw error;
    }
      
}

export const updateCourse = async (id,course)=>{
    try {
        const response = await API().put('/admin/course/update', {id, course})
        return response.data;
    } catch (error) {
        throw error;
    }
      
}

export const getCourse = async (id)=>{
    try {
        const response = await API().get('/admin/course/getcourse', {params:{id:id}})
        return response.data;
    } catch (error) {
        throw error;
    }
      
}


