import React from "react";
import { Outlet } from "react-router-dom"; 

import './Delivery.scss';

const Delivery = () => {
    return (
        <div className="full-width">
            <Outlet/>
        </div>
    );
};

export default Delivery;