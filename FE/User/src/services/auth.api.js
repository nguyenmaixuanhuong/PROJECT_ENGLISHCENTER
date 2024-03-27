import API from "./API";
export const login = async (account) => {
        const request = await API().post('/auth/login', { account: account })
        const response = await request.data;
        localStorage.setItem('token', response.token);
        return response.infor;
}

export const changeAvatar = async (id, avatar) => {
        try {
                const response = await API().post('/account/changeavatar', { id: id, avatar: avatar })
                return response.data;
        } catch (error) {
                throw error;
        }

}

export const changePassword = async (id, prePassword, newPassword) => {
        try {
                const response = await API().post('/account/changepassword', { id: id, prePassword: prePassword, newPassword: newPassword })
                return response.status;
        } catch (error) {
                return error.response.status
        }
}
export const changeInfor = async (id, role, infor) => {
        try {
                const response = await API().post('/account/changeinfor', { id: id, role: role, infor: infor })
                return response.status;
        } catch (error) {
                return error.response.status
        }

}