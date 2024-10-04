import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalCreateTaskOpen: false,
  modalAddressOpened: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModalCreateTask(state) {
      state.modalCreateTaskOpen = true;
    },
    closeModalCreateTask(state) {
      state.modalCreateTaskOpen = false;
    },
    openModalAddress(state) {
      state.modalAddressOpened = true;
    },
    closeModalAddress(state) {
      state.modalAddressOpened = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
