import API from "./API";

export const listSchedules = async (id,role) => {
    try {
            const response = await API().get('/admin/schedule/getschedules', { params: { id: id,role:role } })
            return response.data;
    }
    catch (error) {
            throw error;
    }

}
export const getRooms = async ()=>{
    try {
        const response = await API().get('/admin/room/listroom')
        return response.data;
    } catch (error) {
        throw error;
    }
      
}

export const getListTeacher = async ()=>{
    try {
        const response = await API().get('/admin/teacher/teacherlist')
        return response.data;
    } catch (error) {
        throw error;
    }
      
}