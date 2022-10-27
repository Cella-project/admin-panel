import React from 'react';

import './NavBar.scss';

import UKFlag from '../../assets/images/UK.png';

const NavBar = () => {

    return (
        <div className='nav-bar full-width flex-row-between white-bg'>
            <h1 className='nav-bar--logo space-none mint-green pt-sans'>CELLA</h1>
            <i className='nav-bar--btn bi bi-list mint-green size-38px pointer'></i>
            <div className='flex-row-center'>
                <div className='nav-bar--card flex-row-center radius-15px margin-6px-H shadow-2px pointer'>
                    <img className='nav-bar--card--img flex-row-center radius-circular' src={UKFlag} alt='flag' />
                    <p className='nav-bar--card--content space-none inter mint-green size-12px margin-4px-H'>EN</p>
                    <i className='nav-bar--card--content bi bi-chevron-down mint-green size-12px margin-4px-H'></i>
                </div>
                <div className='nav-bar--card flex-row-center radius-15px margin-6px-H shadow-2px pointer'>
                    <i className='bi bi-bell mint-green size-22px'></i>
                </div>
                <div className='nav-bar--card flex-row-center radius-15px margin-6px-H shadow-2px pointer'>
                    <div className='nav-bar--card--img flex-row-center radius-circular gray-bg white inter size-10px'>MM</div>
                    <p className='nav-bar--card--content space-none inter mint-green margin-4px-H size-12px'>Hi, Admin</p>
                </div>
            </div>
        </div>
    );
};

export default NavBar;