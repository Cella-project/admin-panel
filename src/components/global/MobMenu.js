import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import logo from '../../assets/images/white-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../apis/actions';

import './MobMenu.scss';


const MobMenu = ({ menuToggle }) => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.theme.mode);

    const handleLogout = () => {
        dispatch(authActions.logout());
    }


    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                menuToggle(false);
                window.onscroll = function () { };
            }
        };

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    });

    return (
        <div className='mob-menu flex-col-top-start orange-bg shadow-5px' ref={menuRef}>
            <div className='full-width flex-row-right-start'>
                <i className={`bi bi-x size-40px ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`}
                    onClick={() => {
                        menuToggle(false)
                        window.onscroll = function () { };
                    }}
                />
            </div>
            <div className='full-width flex-row-center margin-10px-V'>
                {/* <h1 className='pt-sans white space-none size-32px'>CELLA</h1> */}
                <img src={logo} alt='ACTORE' className='mob-menu--logo' />
            </div>
            <PerfectScrollbar className="mob-menu--body margin-10px-V">
                <div className='full-width flex-col-left-start'>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        end to={'/admin-panel/'} className="margin-8px-V"
                    >
                        <i className={`bi bi-house-door ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Home</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/admin-panel/admins'} className="margin-8px-V"
                    >
                        <i className={`bi bi-person-square ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Admins</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/admin-panel/stores'} className="margin-8px-V"
                    >
                        <i className={`bi bi-shop-window ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Stores</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/admin-panel/customers'} className="margin-8px-V"
                    >
                        <i className={`bi bi-people ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Customers</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/admin-panel/specialty'} className="margin-8px-V"
                    >
                        <i className={`bi bi-patch-check ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Specialty</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/admin-panel/products'} className="margin-8px-V"
                    >
                        <i className={`bi bi-box-seam ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Products</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/admin-panel/orders'} className="margin-8px-V"
                    >
                        <i className={`bi bi-receipt ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Orders</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/admin-panel/ordersHistory'} className="margin-8px-V"
                    >
                        <i className={`bi bi-hourglass-split ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Order History</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/admin-panel/drivers'} className="margin-8px-V"
                    >
                        <i className={`bi bi-truck ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Drivers</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/admin-panel/reviews'} className="margin-8px-V"
                    >
                        <i className={`bi bi-stars ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Reviews</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/admin-panel/payments'} className="margin-8px-V"
                    >
                        <i className={`bi bi-credit-card-2-front ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Payment Methods</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/admin-panel/logActivities'} className="margin-8px-V"
                    >
                        <i className={`bi bi-clock-history ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Log Activity</span>
                    </NavLink>
                    <NavLink onClick={handleLogout} to={'/admin-panel/login'} className="margin-8px-V"
                    >
                        <i className={`bi bi-door-open ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Log out</span>
                    </NavLink>
                </div>
            </PerfectScrollbar>
        </div>
    )
}

export default MobMenu