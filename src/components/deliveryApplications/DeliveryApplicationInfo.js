import React from "react";
import Canvas from "../common/Canvas";
import { useSelector } from "react-redux";

import "./DeliveryApplicationInfo.scss";

const DeliveryApplicationInfo = ({ deliveryApplication }) => {
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div className="deliveryApplication-card full-width shadow-2px inter radius-15px white-bg flex-row-between2col">
      <div className="deliveryApplication-card--img flex-row-center">
        {deliveryApplication.img === 'No Image' ?
          <Canvas name={deliveryApplication.name} />
          :
          <img src={deliveryApplication.img} className='white-bg' alt="" />
        }
        <div className={`deliveryApplication-card-status ${deliveryApplication.status === 'Approved' ? 'green-bg' : (deliveryApplication.status === 'Pending' ? 'yellow-bg' : 'red-bg')}  radius-circular`} />
      </div>
      <div className="deliveryApplication-card--details flex-col-top-start">
        <div className="full-width flex-row-between deliveryApplication-card--info flex-wrap">
          <div className="flex-col-left-start">
            <div className={`font-bold size-24px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{deliveryApplication.name.toUpperCase()}</div>
            <div className="font-bold gray margin-6px-V">{deliveryApplication.phoneNum}</div>
            <div className="gray">{deliveryApplication.email}</div>
          </div>
        </div>
        <div className="full-width flex-col-right-start deliveryApplication-card--age">
          <div className="gray font-bold">
            {new Date().getFullYear() - new Date(deliveryApplication.dateOfBirth.split('/').reverse().join('-')).getFullYear()} years
          </div>
          <div className={deliveryApplication.gender === "male" ? "baby-blue" : "pink"}>{deliveryApplication.gender.charAt(0).toUpperCase() + deliveryApplication.gender.slice(1)}</div>
          <div className="gray">{deliveryApplication.country && deliveryApplication.city ? `${deliveryApplication.country}, ${deliveryApplication.city}` : ''}</div>
        </div>
      </div>
    </div>
  );
};
export default DeliveryApplicationInfo;
