import API from "./API";
export const getClassesById = async (id, role) => {
        const response = await API().get('/admin/class/getClassesById', { params: { id: id, role: role } })
        return response.data;
}

export const getClass = async (id) => {
        try {
                const response = await API().get('/admin/class/getclass', { params: { id: id } })
                return response.data;
        } catch (error) {
                throw error;
        }

}