import API from "./API";

export const getRooms = async ()=>{
    try {
        const response = await API().get('/admin/room/listroom')
        return response.data;
    } catch (error) {
        throw error;
    }
      
}