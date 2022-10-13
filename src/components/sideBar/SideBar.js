import React, { Component } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link, NavLink } from 'react-router-dom';
import '../../assets/styles/mainStyles.css';
import '../../assets/icons/icons.css';
import '../../assets/styles/SideBar.css';


class SideBar extends Component {
  render() {
    return (
      <PerfectScrollbar className="sideBar absolute mintGreenBg hidden flex">
        <Link to={'/'}>
          <i className="bi bi-house-door icon font26 greyColor"></i><span className="description none hidden inter font20 weight700 greyColor">Home</span>
        </Link>
        <NavLink to={'/admins'} >
          <i className="bi bi-file-person icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Admins</span>
        </NavLink>
        <NavLink to={'/stores'} >
          <i className="bi bi-shop icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Stores</span>
        </NavLink>
        <NavLink to={'/customers'} >
          <i className="bi bi-people icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Customers</span>
        </NavLink>
        <NavLink to={'/speciality'} >
          <i className="bi bi-bookmarks icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Speciality</span>
        </NavLink>
        <NavLink to={'/products'} >
          <i className="bi bi-box-seam icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Products</span>
        </NavLink>
        <NavLink to={'/orders'} >
          <i className="bi bi-receipt icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Orders</span>
        </NavLink>
        <NavLink to={'/delivery'} >
          <i className="bi bi-truck icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Delivery</span>
        </NavLink>
        <NavLink to={'/reviews'} >
          <i className="bi bi-star-half icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Reviews</span>
        </NavLink>
        <NavLink to={'/vouchers'} >
          <i className="bi bi-percent icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Vouchers</span>
        </NavLink>
        <NavLink to={'/payments'} >
          <i className="bi bi-credit-card-2-front icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Payments</span>
        </NavLink>
        <NavLink to={'/logActivities'} >
          <i className="bi bi-clock-history icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Log Activity</span>
        </NavLink>
        <NavLink to={'/suggestions'} >
          <i className="bi bi-lightbulb icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Comp & Suggestions</span>
        </NavLink>
        <NavLink to={'/reports'} >
          <i className="bi bi-file-earmark-medical icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Reports</span>
        </NavLink>
        <NavLink to={'/logOut'} >
          <i className="bi bi-door-open icon beigeColor font26"></i><span className="description none hidden inter font20 weight700 beigeColor">Log out</span>
        </NavLink>




      </PerfectScrollbar>
    );
  }
}

export default SideBar;
