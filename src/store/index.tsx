import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { tasksMiddleware } from "./Product.store";
import modalReducer from "./Modal.store";
import menuReducer from "./Menu.store";
import userReducer from "./User.store";
import orderReducer from "./Order.store";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from "redux";

// Persist configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Combine all your reducers
const rootReducer = combineReducers({
  orders: orderReducer,
  products: productsReducer,
  modal: modalReducer,
  menu: menuReducer,
  user: userReducer
});

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: false, // Prevent errors with non-serializable data
      }).concat(tasksMiddleware),
});

// Persistor for syncing store
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export { store, persistor };
