import React from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from "react-router-dom";

import router from './router/router';

import 'normalize.css';
import './assets/styles/style.scss';


import { Provider } from 'react-redux';

import store from './redux/index';

const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>);