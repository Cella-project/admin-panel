import React from 'react';
import { useSelector } from 'react-redux';

import './Loading.scss';

const Loading = () => {
    const mode = useSelector(state => state.theme.mode);

    return (
        <div className="full-width loading-container">
            <div className={`loading-animation ${mode === 'dark-mode' ? 'dark' : ''}`}></div>
            <h2 className='gray'>Loading...</h2>
        </div>
    );
};

export default Loading;