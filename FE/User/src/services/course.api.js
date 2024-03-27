import API from "./API";
export const getAllCourse = async ()=>{
    try {
        const response = await API().get('/admin/course/listcourse')
        return response.data;
    } catch (error) {
        throw error;
    }
      
}

export const getCourseWithCategory = async (category)=>{
    try {
        const response = await API().get('/admin/course/listcoursewithcategory', {params: {category: category}});
        return response.data;
    } catch (error) {
        throw error;
    }
      
}

export const getCourse = async (id)=>{
    try {
        const response = await API().get('/admin/course/getcourse', {params: {id: id}});
        return response.data;
    } catch (error) {
        throw error;    
    }
      
}