import React from 'react';
import { Link } from 'react-router-dom';
import Canvas from '../common/Canvas';
import './CustomerCard.scss';

const CustomerCard = ({ customerCard }) => {
    return (
        <>
            <div className='full-width flex-row-left-start'>
                <div className='lists-card--img radius-circular flex-row-left-start'>
                    <Canvas name={customerCard.name} borderRadius='50%' width={55} height={55} fontSize={'42px'} />
                    <div className={`lists-status ${customerCard.status === 'Active' ? 'green' : 'red'}-bg radius-circular`}></div>
                </div>
                <Link to={`/customers/${customerCard._id}`} className='lists-card--link pointer full-width flex-row-left-start2col'>
                    <div className='lists-card--info gray pointer shadow-5px size-16px margin-10px-V inter radius-15px white-bg full-width flex-row-between2col'>
                        <div className='width-30-100 margin-2px-V'>
                            <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Name: </span>{customerCard.name.toUpperCase()}
                        </div>
                        <div className='width-40-100 margin-2px-V size-14px'>
                            <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Email: </span>{customerCard.email}
                        </div>
                        <div className='width-30-100 margin-2px-V size-14px'>
                            <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Phone: </span>{customerCard.phoneNum}
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default CustomerCard;