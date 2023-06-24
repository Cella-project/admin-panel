import React from 'react';
import { Link } from 'react-router-dom';

// import LangMenu from '../common/LangMenu';

import logo from '../../assets/images/green-logo.png';
import darkLogo from '../../assets/images/white-logo.png';
import Canvas from '../common/Canvas';

import { useSelector } from 'react-redux';

import './NavBar.scss';

const NavBar = ({ menuToggle }) => {
    const userData = useSelector(state => state.auth.userData);
    const mode = useSelector(state => state.theme.mode);

    const handleClick = () => {
        menuToggle(true)
        const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
        window.onscroll = () => {
            window.scrollTo(LeftScroll, TopScroll);
        };
    }

    // Extract the first name from the user data
    const firstName = userData.name.split(' ')[0];

    if (userData === null) return (<div></div>);

    return (
        <div className={`nav-bar ${mode === 'dark-mode' ? 'dark' : ''} full-width`} style={{ marginTop: (userData.validEmail !== null && userData.validEmail) ? '0px' : '15px' }}>
            <div className='nav-bar--cont full-width white-bg flex-row-between'>
                <Link to={'/admin-panel'} className='home-link'>
                    <img src={mode === 'dark-mode' ? darkLogo : logo} alt='ACTORE' className='nav-bar--logo pointer' />
                </Link>
                <i className={`nav-bar--btn bi bi-list ${mode === 'dark-mode' ? 'gray' : 'orange'} size-38px pointer`} onClick={handleClick}></i>
                <div className='flex-row-center'>
                    {/* <LangMenu /> */}
                    <div className='nav-bar--card flex-row-center radius-15px margin-6px-H white-bg shadow-2px pointer'>
                        <i className={`bi bi-bell ${mode === 'dark-mode' ? 'gray' : 'orange'} size-22px`} />
                        <div className={`nav-bar--card--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
                            Notification
                        </div>
                    </div>
                    <Link to={'/admin-panel/profile'}>
                        <div className='nav-bar--card flex-row-center white-bg radius-15px margin-6px-H shadow-2px pointer'>
                            <div className='nav-bar--card--img flex-row-center radius-circular'>
                                {userData.img === 'NO IMAGE' ?
                                    <Canvas name={userData.name} borderRadius='50%' width={50} height={50} fontSize={'28px'} /> :
                                    <img src={userData.img} className='white-bg' alt='admin-pic' />
                                }
                            </div>
                            <p className={`nav-bar--card--content space-none inter ${mode === 'dark-mode' ? 'gray' : 'orange'} margin-4px-H size-12px`}>Hi, {firstName}</p>
                            <div className={`nav-bar--card--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
                                Profile
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
