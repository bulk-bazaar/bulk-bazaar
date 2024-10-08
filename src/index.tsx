import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import {store, persistor} from "./store";
import App from "./App";
import "./index.css";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <App/>
                </HashRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
