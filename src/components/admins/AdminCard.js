import React, { useState } from 'react';
import Canvas from '../common/Canvas';

import './AdminCard.scss';

const AdminCard = ({ adminCard }) => {
    const [cardExpanded, setCardExpanded] = useState(false);

    const toggleExpanding = () => {
        setCardExpanded(!cardExpanded);
    }

    return (
        <>
            <div className='full-width flex-row-left-start'>
                <div className='lists-card--img radius-circular flex-row-left-start'>
                    {adminCard.img === 'NO IMAGE' ?
                        <Canvas name={adminCard.name} borderRadius='50%' width={55} height={55} fontSize={'42px'} /> :
                        <img src={adminCard.img} className='white-bg' alt='admin-pic' />
                    }
                    <div className={`lists-status ${adminCard.status ? adminCard.status : 'red'}-bg radius-circular`}></div>
                </div>
                <div className='lists-card--info flex-col-left-start gray full-width white-bg inter radius-15px margin-10px-V shadow-5px size-16px'>
                    <div className='full-width margin-4px-V pointer flex-row-between2col' onClick={toggleExpanding}>
                        <div className='margin-12px-H full-width'>
                            <span className={`lists-card--info--disc${cardExpanded ? '--show' : '--hide'} margin-4px-H font-bold`}>Name: </span>{adminCard.name.toUpperCase()}
                        </div>
                        <div className='margin-8px-H size-14px flex-row-center font-bold'>
                            <i className={`bi bi-chevron-${cardExpanded ? 'up' : 'down'} gray`} />
                        </div>
                    </div>
                    {
                        cardExpanded &&
                        <div className='full-width flex-col-left-start margin-12px-H'>
                            <div className='full-width margin-4px-V'>
                                <span className={`lists-card--info--disc${cardExpanded ? '--show' : '--hide'} margin-4px-H font-bold`}>Email: </span>{adminCard.email}
                            </div>
                            <div className='full-width margin-4px-V'>
                                <span className={`lists-card--info--disc${cardExpanded ? '--show' : '--hide'} margin-4px-H font-bold`}>Phone Number: </span>{adminCard.phoneNum}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default AdminCard;