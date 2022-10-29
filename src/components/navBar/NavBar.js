import React, { useState } from 'react';

import './NavBar.scss';

import UKFlag from '../../assets/images/UK.png';
import EGFlag from '../../assets/images/EG.png';
import MobMenu from '../global/mobMenu/MobMenu';

const NavBar = ({ menuToggle }) => {
    const [langMenuShown, setLangMenuShown] = useState(false);
    const [lang, setLang] = useState('en');

    const changeLangHandler = (val) => {
        setLang(val);
        setLangMenuShown(!langMenuShown);
    }

    const clickHandler = () => {
        menuToggle(true);
    }

    return (
        <div className='nav-bar full-width'>
            <div className='nav-bar--cont full-width flex-row-between white-bg'>
                <h1 className='nav-bar--logo space-none mint-green pt-sans'>CELLA</h1>
                <i className='nav-bar--btn bi bi-list mint-green size-38px pointer' onClick={clickHandler}></i>
                <div style={{ position: 'relative' }} className='flex-row-center'>
                    <div onClick={setLangMenuShown.bind(null, !langMenuShown)} className='nav-bar--card flex-row-center radius-15px margin-6px-H shadow-2px pointer'>
                        <img className='nav-bar--card--img flex-row-center radius-circular' src={lang === 'en' ? UKFlag : EGFlag} alt='flag' />
                        <p className='nav-bar--card--content space-none inter mint-green size-12px margin-4px-H'>{lang.toLocaleUpperCase()}</p>
                        <i className={`nav-bar--card--content bi bi-chevron-${langMenuShown ? 'up' : 'down'} mint-green size-12px margin-4px-H`}></i>
                    </div>
                    {langMenuShown && <div className='nav-bar--lang-menu flex-col-center white-bg radius-15px shadow-2px'>
                        <div onClick={changeLangHandler.bind(null, 'en')} className='nav-bar--lang-menu--item full-width flex-row-left-start margin-2px-V pointer'>
                            <img className='nav-bar--lang-menu--item--img flex-row-center radius-circular' src={UKFlag} alt='flag' />
                            <p className='space-none inter mint-green size-12px '>EN</p>
                        </div>
                        <div onClick={changeLangHandler.bind(null, 'ar')} className='nav-bar--lang-menu--item full-width flex-row-left-start margin-2px-V pointer'>
                            <img className='nav-bar--lang-menu--item--img flex-row-center radius-circular' src={EGFlag} alt='flag' />
                            <p className='space-none inter mint-green size-12px '>AR</p>
                        </div>
                    </div>}
                    <div className='nav-bar--card flex-row-center radius-15px margin-6px-H shadow-2px pointer'>
                        <i className='bi bi-bell mint-green size-22px'></i>
                    </div>
                    <div className='nav-bar--card flex-row-center radius-15px margin-6px-H shadow-2px pointer'>
                        <div className='nav-bar--card--img flex-row-center radius-circular gray-bg white inter size-10px'>MM</div>
                        <p className='nav-bar--card--content space-none inter mint-green margin-4px-H size-12px'>Hi, Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;