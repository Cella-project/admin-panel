import React from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link, NavLink } from 'react-router-dom';
import '../../assets/styles/mainStyles.css';
import '../../assets/icons/icons.css';
import './SideBar.css';


const SideBar = () => {
    return (
      <PerfectScrollbar className="side-bar fixed mint-green-bg hidden flex">
        {/* <button className="bar-btn bar-close-btn pointer none"><i className="bi bi-x-circle icon beige-color font26"></i></button>
        <button className="bar-btn bar-open-btn pointer none"><i className="bi bi-list icon beige-color font30"></i></button> */}
        <Link to={'/'}>
          <i className="bi bi-house-door icon font26 grey-color"></i><span className="description none hidden inter font20 weight700 grey-color">Home</span>
        </Link>
        <NavLink to={'/admins'} >
          <i className="bi bi-file-person icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Admins</span>
        </NavLink>
        <NavLink to={'/stores'} >
          <i className="bi bi-shop icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Stores</span>
        </NavLink>
        <NavLink to={'/customers'} >
          <i className="bi bi-people icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Customers</span>
        </NavLink>
        <NavLink to={'/speciality'} >
          <i className="bi bi-bookmarks icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Speciality</span>
        </NavLink>
        <NavLink to={'/products'} >
          <i className="bi bi-box-seam icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Products</span>
        </NavLink>
        <NavLink to={'/orders'} >
          <i className="bi bi-receipt icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Orders</span>
        </NavLink>
        <NavLink to={'/delivery'} >
          <i className="bi bi-truck icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Delivery</span>
        </NavLink>
        <NavLink to={'/reviews'} >
          <i className="bi bi-star-half icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Reviews</span>
        </NavLink>
        <NavLink to={'/vouchers'} >
          <i className="bi bi-percent icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Vouchers</span>
        </NavLink>
        <NavLink to={'/payments'} >
          <i className="bi bi-credit-card-2-front icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Payments</span>
        </NavLink>
        <NavLink to={'/logActivities'} >
          <i className="bi bi-clock-history icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Log Activity</span>
        </NavLink>
        <NavLink to={'/suggestions'} >
          <i className="bi bi-lightbulb icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Comp & Suggestions</span>
        </NavLink>
        <NavLink to={'/reports'} >
          <i className="bi bi-file-earmark-medical icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Reports</span>
        </NavLink>
        <NavLink to={'/logOut'} >
          <i className="bi bi-door-open icon beige-color font26"></i><span className="description none hidden inter font20 weight700 beige-color">Log out</span>
        </NavLink>
      </PerfectScrollbar>
    );
}

export default SideBar;
