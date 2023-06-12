import React from "react";
import { Outlet } from "react-router-dom"; 

import './DeliveryApplication.scss';

const DeliveryApplication = () => {
    return (
        <div className="full-width">
            <Outlet/>
        </div>
    );
};

export default DeliveryApplication;