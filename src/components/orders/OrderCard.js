import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = ({ order }) => {
    return (
        <>
            <Link to={`/ordersHistory/${order._id}`} className='orders--link full-width flex-row-left-start2col'>
                <div className='lists-card--info gray pointer shadow-5px size-16px margin-10px-V inter radius-15px white-bg full-width flex-row-between2col flex-wrap'>
                    <div className='flex-row-left-start margin-2px-V flex-wrap'>
                        <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Customer: </span>{order.customer.name}
                    </div>

                    <div className='flex-row-left-start margin-2px-V'>
                        <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Order code: </span>{order.code}
                    </div>
                    <div className='flex-row-left-start margin-2px-V flex-wrap'>
                        <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Store: </span>
                        <i className='bi bi-shop-window mint-green size-30px margin-4px-H' />{order.store.storeName}
                    </div>
                    <div className='flex-row-left-start margin-2px-V'>
                        <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Date: </span>{order.createdAt.split("T")[0]}
                    </div>
                    <div className='flex-row-left-start margin-2px-V'>
                        <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Status: </span>
                        <span className={`${order.status === 'Delivered' ? 'green' : order.status === 'pending' ? 'yellow' : 'red'}`}>
                            {order.status}
                        </span>
                    </div>
                    <div className='flex-row-left-start margin-2px-V'>
                        <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Total: </span>{order.total} EGP
                    </div>
                </div>
            </Link>
        </>
    )
}

export default OrderCard;