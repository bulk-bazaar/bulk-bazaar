import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { tasksMiddleware } from "./Tasks.store";
import modalReducer from "./Modal.store";
import menuReducer from "./Menu.store";
import { thunk } from 'redux-thunk';

const store = configureStore({
  reducer: { products: tasksReducer, modal: modalReducer, menu: menuReducer },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(thunk, tasksMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store;
