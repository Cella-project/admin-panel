import React from "react";
import { Outlet } from "react-router-dom"; 


const Speciality = () => {
    return (
        <div className="full-width">
            <Outlet/>
        </div>
    );
};

export default Speciality;