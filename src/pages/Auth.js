import React from "react";

import { Outlet } from "react-router-dom";

import AuthImg from '../assets/images/auth-img.png';
import AuthImgDark from '../assets/images/auth-img-dark.png';

import logo from '../assets/images/white-logo.png';

import { useSelector } from "react-redux";

import './Auth.scss';

const Auth = () => {
    const mode = useSelector(state => state.theme.mode);

    return (
        <div className={`auth ${mode === 'dark-mode' ? 'dark' : ''} full-width`}>
            <div className="auth--header flex-row-center orange-bg shadow-2px">
                <img src={logo} alt='ACTORE' style={{ width: '150px' }} className='mob-menu--logo' />
            </div>
            <div className="auth--body full-width flex-row2col">
                <img className="auth--body--img" src={mode === 'dark-mode' ? AuthImgDark : AuthImg} alt="ok" />
                <Outlet />
            </div>
            <div className={`auth--sign full-width flex-row-center inter ${mode === 'dark-mode' ? 'gray' : 'orange'} size-12px`}>
                © 2023. All Rights Reserved. made with <i className="bi bi-suit-heart-fill red margin-4px-H" /> By ACTORE
            </div>
        </div>
    );
};

export default Auth;