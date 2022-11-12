import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Admins from '../pages/Admins/Admins';
import Stores from '../pages/Stores/Stores';
import Customers from '../pages/Customers/Customers';
import Speciality from '../pages/Speciality/Speciality';
import Products from '../pages/Products/Products';
import Orders from '../pages/Orders/Orders';
import Delivery from '../pages/Delivery/Delivery';
import Reviews from '../pages/Reviews/Reviews';
import Vouchers from '../pages/Vouchers/Vouchers';
import Payments from '../pages/Payments/Payments';
import LogActivity from '../pages/LogActivity/LogActivity';
import ComplainsAndSuggestions from '../pages/ComplainsAndSuggestions/ComplainsAndSuggestions';
import Reports from '../pages/Reports/Reports';
import './Routing.scss';
import '../assets/styles/style.scss';

const Routing = () => {
    return (
        <div className='full-width full-screen-height routes'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admins" element={<Admins />} />
                <Route path="/stores" element={<Stores />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/speciality" element={<Speciality />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/vouchers" element={<Vouchers />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/logActivities" element={<LogActivity />} />
                <Route path="/suggestions" element={<ComplainsAndSuggestions />} />
                <Route path="/reports" element={<Reports />} />

            </Routes>
        </div>
    )
}

export default Routing;