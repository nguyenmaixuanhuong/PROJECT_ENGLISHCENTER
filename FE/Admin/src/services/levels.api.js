import API from "./API";

export const getLevels = async ()=>{
    try {
        const response = await API().get('/admin/course/levels')
        return response.data;
    } catch (error) {
        throw error;
    }
      
}

export const getLevel = async (id)=>{
    try {
        const response = await API().get('/admin/course/getlevel', {params: {id: id}});
        return response.data;
    } catch (error) {
        throw error;
    }
      
}