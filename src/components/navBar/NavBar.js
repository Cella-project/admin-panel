import React from "react";
// import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import adminImg from '../../assets/images/1.JPEG';
// import '../../assets/styles/mainStyles.css';
import './NavBar.scss';

const NavBar = () => {
    // const languages = [
    //     'EN', 'AR'
    // ];
    // const defaultLanguage = languages[0];
    return (
        <div className="nav-bar fixed full-width flex">
            <div className="container full-width white-bg flex align-items-center space-between">
                <span className="cella mint-green-color font30 pt-sans weight900">CELLA</span>
                <div className="info flex align-items-center">
                    {/* <Dropdown options={languages} value={defaultLanguage} placeholder={defaultLanguage} controlClassName={'mint-green-color shadow pointer flex align-items-center inter font15 weight600'} menuClassName={'menu inter font15 weight600'} /> */}
                    <select className="language-droplist beige-bg mint-green-color shadow pointer flex align-items-center inter font15 weight600">
                        <option value={'english'}>EN</option>
                        <option value={'arabic'}>AR</option>
                    </select>
                    <span className="notifications shadow inter font12 weight600 mint-green-color flex justify-content-center pointer">0 <i className="bi bi-bell font26"></i></span>
                    <span className="admin shadow flex space-between align-items-center mint-green-color inter font12 weight600 pointer"><img src={adminImg} className={'admin-img'} />Hi, Admin</span>
                </div>
            </div>
        </div>
    )
}

export default NavBar;