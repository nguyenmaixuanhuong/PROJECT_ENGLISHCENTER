import API from "./API";
export const login = async (data)=>{
        return await API().post('/admin/login',data)
        
}
