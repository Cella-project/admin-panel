import React from "react";
import { Outlet } from "react-router-dom"; 

import './Customers.scss';

const Customers = () => {
    return (
        <div className="full-width">
            <Outlet/>
        </div>
    );
};

export default Customers;