import React from "react";
import { Outlet } from "react-router-dom"; 

import './Stores.scss';

const Stores = () => {
    return (
        <div className="full-width">
            <Outlet/>
        </div>
    );
};

export default Stores;