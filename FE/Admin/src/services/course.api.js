import API from "./API";

export const getListCourse = async ()=>{
    try {
        const response = await API().get('/admin/course/listcourse')
        return response.data;
    } catch (error) {
        throw error;
    }
      
}
