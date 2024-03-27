import API from './API'

export const createSChedule = async (schedule)=>{
    try {
        const response = await API().post('/admin/schedule/create',{schedule})
        return response.data;
    } catch (error) {
        return null;
    }
}

export const getAllSchedule = async ()=>{
    try {
        const response = await API().get('/admin/schedule/getall')
        return response.data;

    } catch (error) {
        return null;      
    }
}

export const updateSchedule = async (schedule)=>{
    try {
        const response = await API().post('/admin/schedule/update', {schedule})
        return response.data;

    } catch (error) {
        return null;      
    }
}

export const deteleSchedule = async (id)=>{
    try {
        const response = await API().get('/admin/schedule/delete', {params:{id:id}})
        return response.data;
    } catch (error) {
        return null;      
    }
}