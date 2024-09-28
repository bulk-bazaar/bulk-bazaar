import {Address, CartItem, OrderItem} from "../components1/redux/interfaces";
import {createAppSlice} from "./createAppSlice";
import ApiService from "../components1/network/ApiService";
import {waitForSeconds} from "../components1/common/util/functions";

const initialState: {
    addresess: Address[];
    loading: boolean;
} = {
    addresess: [],
    loading: false
};

const addressSlice = createAppSlice({
    name: "address",
    initialState: initialState,
    reducers: (create) => ({
        fetchAddress: create.asyncThunk(
            async (f: string, thunkApi) => {
                const apiService = new ApiService();
                const response = await apiService.get(`/api/address`);
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
                    state.addresess = action.payload
                },
            }
        ),
        updateAddress: create.asyncThunk(
            async ({id, houseNumber, street_address, pincode}: {id: number, houseNumber: string, street_address: string, pincode: string}, thunkApi) => {
                const apiService = new ApiService();
                const response = await apiService.post(`/api/address/update`, {
                    id,
                    houseNumber,
                    street_address,
                    pincode
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
                    state.addresess = action.payload
                },
            }
        ),
        createAddress: create.asyncThunk(
            async ({houseNumber, street_address, pincode}: {houseNumber: string, street_address: string, pincode: string}, thunkApi) => {
                const apiService = new ApiService();
                const response = await apiService.post(`/api/address`, {
                    houseNumber,
                    street_address,
                    pincode
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
                    state.addresess = action.payload
                },
            }
        ),
    })
});

export const addressActions = addressSlice.actions;
export default addressSlice.reducer;
