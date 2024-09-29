import {createAppSlice} from "./createAppSlice";
import {User} from "../components1/redux/interfaces";
import ApiService from "../components1/network/ApiService";
import {waitForSeconds} from "../components1/common/util/functions";

const initialState: {
    token: string,
    loading: boolean,
    user: User | {}
} = {
    loading: false,
    token: '',
    user: {}
};

const userSlice = createAppSlice({
    name: "user",
    initialState: initialState,
    reducers: (create) => ({
        setToken: create.reducer<string>((state, action) => {
            state.token = action.payload;
        }),
        setUser: create.reducer<User>((state, action) => {
            state.user = action.payload;
        }),
        requestSeller: create.asyncThunk(
            async (pancard: string, thunkApi) => {
                const apiService = new ApiService();
                const response = await apiService.post(`/api/request/seller`, {
                    pancard: pancard,
                });
                await waitForSeconds(1);
                return response?.data
            },
            {
                pending: (state) => {
                    state.loading = true
                },
                rejected: (state, action) => {
                    state.loading = false
                },
                fulfilled: (state, action) => {
                    state.loading = false
                    state.user = {...state.user, isSeller: 'pending'}
                },
            }
        ),
        changePassword: create.asyncThunk(
            async ({newPassword, currentPassword}: { newPassword: string, currentPassword: string }, thunkApi) => {
                const apiService = new ApiService();
                const response = await apiService.post(`/api/usersAuth/changePassword`, {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                });
                await waitForSeconds(1);
                return response?.data
            },
            {
                pending: (state) => {
                    state.loading = true
                },
                rejected: (state, action) => {
                    state.loading = false
                },
                fulfilled: (state, action) => {
                    state.loading = false
                },
            }
        ),
        updateInfo: create.asyncThunk(
            async ({firstName, lastName, mobile}: {
                firstName: string,
                lastName: string,
                mobile: string
            }, thunkApi) => {
                const apiService = new ApiService();
                const response = await apiService.post(`/api/usersAuth/updateInfo`, {
                    firstName: firstName,
                    lastName: lastName,
                    mobile: mobile,
                });
                await waitForSeconds(1);
                return response?.data
            },
            {
                pending: (state) => {
                    state.loading = true
                },
                rejected: (state, action) => {
                    state.loading = false
                },
                fulfilled: (state, action) => {
                    state.loading = false
                    state.user = {...state?.user, ...action.payload.data};
                },
            }
        ),
    })
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
