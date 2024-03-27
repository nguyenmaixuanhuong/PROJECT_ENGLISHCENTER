import API from "./API";
export const getAllRegister = async ()=>{
    try {
        const response = await API().get('/admin/register/listregister');
        return response.data;
    } catch (error) {
        throw error;
    }    
}

export const confirmContact = async (id)=>{
    try {
        const response = await API().get('/admin/register/confirm',{params:{id:id}});
        return response.data;
    } catch (error) {
        throw error;
    }    
}

