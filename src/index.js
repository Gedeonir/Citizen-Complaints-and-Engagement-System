import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";
import { Provider } from 'react-redux'
import store from "./redux/store";
import 'react-calendar/dist/Calendar.css';


const root = ReactDOM.createRoot(document.getElementById("app")).render(
    <Provider store={store}>
        <App />
    </Provider>
);