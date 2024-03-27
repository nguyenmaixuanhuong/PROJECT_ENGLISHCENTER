import API from "./API";
export const addRegister = async (infor)=>{
    try {
        const response = await API().post('/admin/register/add',{infor});
        console.log(response.data);
        return response.data;
    } catch (error) {
        return null;
    }
}
