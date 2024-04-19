import API from "./API";
export const createAttendance = async (infor) => {
    try {
        const response = await API().post('/attendance/create',infor);
        return response.data;
    } catch (error) {
        throw error;
    }        
}

export const updateAttendance = async (id,attendees) => {
    try {
        const response = await API().post('/attendance/update',{id:id,attendees:attendees});
        return response.status;
    } catch (error) {
        return error.response.status
    }        
}


export const listAttendance = async (id) => {
    try {
        const response = await API().get('/attendance/listattendances',{params:{id:id}});
        return response.data;
    } catch (error) {
        throw error;
    }        
}