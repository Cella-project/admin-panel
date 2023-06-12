import React from "react";
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../apis/actions";

import './SideBar.scss';

const SideBar = () => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.theme.mode);

  const handleLogout = () => {
    dispatch(authActions.logout());
  }

  return (
    <div className="side-bar flex-col-center mint-green-bg">
      <PerfectScrollbar className="side-bar--cont flex-col-top-start">
        <NavLink end to={'/'}>
          <i className={`bi bi-house-door margin-8px-V size-24px ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Home</span>
        </NavLink>
        <NavLink to={'/admins'} >
          <i className={`bi bi-person-square margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Admins</span>
        </NavLink>
        <NavLink to={'/stores'} >
          <i className={`bi bi-shop-window margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Stores</span>
        </NavLink>
        <NavLink to={'/customers'} >
          <i className={`bi bi-people margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Customers</span>
        </NavLink>
        <NavLink to={'/specialty'} >
          <i className={`bi bi-patch-check margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Specialty</span>
        </NavLink>
        <NavLink to={'/products'} >
          <i className={`bi bi-box-seam margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Products</span>
        </NavLink>
        {/* <NavLink to={'/orders'} >
          <i className={`bi bi-receipt margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Orders</span>
        </NavLink> */}
        <NavLink to={'/ordersHistory'} >
          <i className={`bi bi-hourglass-split margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Orders History</span>
        </NavLink>
        <NavLink to={'/drivers'} >
          <i className={`bi bi-truck margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Drivers</span>
        </NavLink>
        <NavLink to={'/reviews'} >
          <i className={`bi bi-stars margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Reviews</span>
        </NavLink>
        <NavLink to={'/vouchers'} >
          <i className={`bi bi-tags margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Vouchers</span>
        </NavLink>
        <NavLink to={'/payments'} >
          <i className={`bi bi-credit-card-2-front margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Payment Methods</span>
        </NavLink>
        <NavLink to={'/logActivities'} >
          <i className={`bi bi-clock-history margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Log Activity</span>
        </NavLink>
        <NavLink to={'/comp&suggestions'} >
          <i className={`bi bi-exclamation-triangle margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Comp & Suggestions</span>
        </NavLink>
        <NavLink onClick={handleLogout} to={'/login'} >
          <i className={`bi bi-door-open margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Log out</span>
        </NavLink>
      </PerfectScrollbar>
    </div>
  );
}

export default SideBar;
