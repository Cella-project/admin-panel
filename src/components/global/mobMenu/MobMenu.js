import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';
import '../../../assets/styles/style.scss';
import '../../../assets/icons/icons.scss';
import './MobMenu.scss'

const MobMenu = ({ menuToggle }) => {
    const clickHandler = () => {
        menuToggle(false);
    }

    return (
        <PerfectScrollbar className="mob-menu mint-green-bg full-screen-height">
            <i className='bi bi-x mob-menu--close icon size-40px white pointer' onClick={clickHandler} />
            <div className='full-width flex-row-center'>
                <h1 className='mob-menu--logo white pt-sans'>CELLA</h1>
            </div>
            <div className='flex-col-left-start'>
                <NavLink end to={'/'}>
                    <i className="bi bi-house-door icon size-30px off-white"></i><span className="icon-description inter size-24px font-bold off-white">Home</span>
                </NavLink>
                <NavLink to={'/admins'} >
                    <i className="bi bi-file-person icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Admins</span>
                </NavLink>
                <NavLink to={'/stores'} >
                    <i className="bi bi-shop icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Stores</span>
                </NavLink>
                <NavLink to={'/customers'} >
                    <i className="bi bi-people icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Customers</span>
                </NavLink>
                <NavLink to={'/speciality'} >
                    <i className="bi bi-bookmarks icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Speciality</span>
                </NavLink>
                <NavLink to={'/products'} >
                    <i className="bi bi-box-seam icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Products</span>
                </NavLink>
                <NavLink to={'/orders'} >
                    <i className="bi bi-receipt icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Orders</span>
                </NavLink>
                <NavLink to={'/delivery'} >
                    <i className="bi bi-truck icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Delivery</span>
                </NavLink>
                <NavLink to={'/reviews'} >
                    <i className="bi bi-star-half icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Reviews</span>
                </NavLink>
                <NavLink to={'/vouchers'} >
                    <i className="bi bi-percent icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Vouchers</span>
                </NavLink>
                <NavLink to={'/payments'} >
                    <i className="bi bi-credit-card-2-front icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Payments</span>
                </NavLink>
                <NavLink to={'/logActivities'} >
                    <i className="bi bi-clock-history icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Log Activity</span>
                </NavLink>
                <NavLink to={'/suggestions'} >
                    <i className="bi bi-lightbulb icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Comp & Suggestions</span>
                </NavLink>
                <NavLink to={'/reports'} >
                    <i className="bi bi-file-earmark-medical icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Reports</span>
                </NavLink>
                <NavLink to={'/logOut'} >
                    <i className="bi bi-door-open icon off-white size-30px"></i><span className="icon-description inter size-24px font-bold off-white">Log out</span>
                </NavLink>
            </div>
        </PerfectScrollbar>
    )
}

export default MobMenu