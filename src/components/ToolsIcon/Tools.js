import React, { useState } from "react";
// import '../../assets/styles/mainStyles.css';
import './Tools.scss';

const Tools = () => {
    const [isMenuShown, setIsMenuShown] = useState(false);

    const clickHandler = () => {
        setIsMenuShown(!isMenuShown);
    }

    return (
        <div className="tool-box flex align-items-center justify-content-center fixed pointer">
            {isMenuShown &&
                <div className="tools flex align-items-center justify-content-center fixed pointer">
                    <i className="bi bi-pencil-square flex align-items-center justify-content-center beige-color mint-green-bg pointer font26 tool-icon" />
                    <i className="bi bi-circle-half flex align-items-center justify-content-center beige-color mint-green-bg pointer font26 tool-icon" />
                    <i className="bi bi-calendar4 flex align-items-center justify-content-center beige-color mint-green-bg pointer font26 tool-icon" />
                    <i className="bi bi-chat-text flex align-items-center justify-content-center beige-color mint-green-bg pointer font26 tool-icon" />
                </div>
            }
            <i onClick={clickHandler} className={`${isMenuShown ? 'bi bi-x grey-bg' : 'bi bi-columns-gap mint-green-bg'} flex align-items-center justify-content-center beige-color pointer font26 tool-icon`} />
        </div>
    );

}

export default Tools;