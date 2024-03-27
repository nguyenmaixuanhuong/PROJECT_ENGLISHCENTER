import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from '../services/auth.api';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (account) => {
        return login(account);
    }
)
export const logoutUser = () => (
    'user/logoutUser'
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        role: '',
        user: null,
        err: null,
    },
    reducers: {
        // Xử lý khi logout thành công
        logoutUserSuccess: (state) => {
            state.role = '';
            state.user = null;
            state.err = null;
        },
        updateAvatar: (state, action) => {
            state.user.account.avatar = action.payload.urlImage;
        },
        updateInfor: (state, action) => {
            state.user.fullName = action.payload.formData.fullName;
            state.user.birthDay = action.payload.formData.birthDay;
            state.user.phoneNumber = action.payload.formData.phoneNumber;
            if (state.role === "Teacher") {
                state.user.email = action.payload.formData.email;
            }
            else {
                state.user.address = action.payload.formData.address;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.role = ''
                state.user = null;
                state.err = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.role = action.payload.account.role;
                state.user = action.payload;
                state.err = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.role = '';
                state.user = null;
                state.err = 'Username or password incorrect';
            });
    },


});
export const { logoutUserSuccess, updateAvatar,updateInfor } = userSlice.actions;
export default userSlice.reducer;