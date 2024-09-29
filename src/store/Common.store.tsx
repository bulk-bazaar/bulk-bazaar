import {createAppSlice} from "./createAppSlice";
import {AlertData} from "../components1/redux/interfaces";

const initialState: {
    alertData?: AlertData;
} = {};

const commonSlice = createAppSlice({
    name: "common",
    initialState: initialState,
    reducers: (create) => ({
        showNotification: create.reducer<AlertData>((state, action) => {
            state.alertData = action.payload
        }),
    })
});

export const commonActions = commonSlice.actions;
export default commonSlice.reducer;
