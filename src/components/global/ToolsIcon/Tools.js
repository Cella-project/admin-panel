import React, { useState } from "react";
// import '../../assets/styles/mainStyles.css';
import './Tools.scss';

const Tools = () => {
    const [isMenuShown, setIsMenuShown] = useState(false);

    const clickHandler = () => {
        setIsMenuShown(!isMenuShown);
    }

    return (
        <div className="tool-box flex-col-center pointer">
            {isMenuShown &&
                <div className="tools flex-col-center pointer">
                    <i className="bi bi-pencil-square flex-row-center off-white mint-green-bg pointer size-26px tool-icon radius-circular" />
                    <i className="bi bi-circle-half flex-row-center off-white mint-green-bg pointer size-26px tool-icon radius-circular" />
                    <i className="bi bi-calendar4 flex-row-center off-white mint-green-bg pointer size-26px tool-icon radius-circular" />
                    <i className="bi bi-chat-text flex-row-center off-white mint-green-bg pointer size-26px tool-icon radius-circular" />
                </div>
            }
            <i onClick={clickHandler} className={`${isMenuShown ? 'bi bi-x gray-bg' : 'bi bi-columns-gap mint-green-bg'} flex-row-center off-white pointer size-26px tool-icon radius-circular`} />
        </div>
    );

}

export default Tools;