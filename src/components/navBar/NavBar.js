import React from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import adminImg from '../../assets/images/1.JPEG';
import '../../assets/styles/mainStyles.css';
import '../../assets/styles/NavBar.css';

const NavBar = () => {
    const languages = [
        'EN', 'AR'
    ];
    const defaultLanguage = languages[0];
    return (
        <div className="navBar fullWidth maxContentHeight flex">
            <div className="container relative fullWidth whiteBg flex centeringItems spaceBetween">
                <span className="cella mintGreenColor font30 ptSans weight900">CELLA</span>
                <div className="info flex centeringItems">
                    <Dropdown options={languages} value={defaultLanguage} placeholder={defaultLanguage} controlClassName={'mintGreenColor shadow pointer flex centeringItems inter font15 weight600'} menuClassName={'menu inter font15 weight600'} />
                    <span className="notifications shadow inter font20 weight600 mintGreenColor flex centeringContent pointer">0 <i className="bi bi-bell font25"></i></span>
                    <span className="admin shadow flex spaceBetween centeringItems mintGreenColor inter font12 weight600 pointer"><img src={adminImg} className={'adminImg'}/>Hi, Admin</span>
                </div>
            </div>
        </div>

    )
}

export default NavBar;