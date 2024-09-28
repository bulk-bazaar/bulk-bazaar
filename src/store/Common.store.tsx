import {createAppSlice} from "./createAppSlice";
import {MessageAlertProps} from "../components1/common/ui/MessageAlert";

const initialState: {
    messageAlert?: MessageAlertProps;
} = {
};

const commonSlice = createAppSlice({
    name: "common",
    initialState: initialState,
    reducers: (create) => ({
        showNotification: create.reducer<MessageAlertProps>((state, action) => {
            state.messageAlert = action.payload
        }),
    })
});

export const commonActions = commonSlice.actions;
export default commonSlice.reducer;
