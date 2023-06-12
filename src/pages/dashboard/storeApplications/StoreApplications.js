import React from "react";
import { Outlet } from "react-router-dom"; 

import './StoreApplications.scss';

const StoreApplications = () => {
    return (
        <div className="full-width">
            <Outlet/>
        </div>
    );
};

export default StoreApplications;