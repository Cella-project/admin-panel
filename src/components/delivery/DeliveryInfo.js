import React from "react";
import Rating from "@mui/material/Rating";
import StarBorder from '@material-ui/icons/StarBorder';
import { useSelector } from "react-redux";

import "./DeliveryInfo.scss";

const DeliveryInfo = ({ delivery }) => {
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate.split('/').reverse().join('-'));
    console.log(birthDate);
    console.log(birthDateObj);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  }

  const mode = useSelector(state => state.theme.mode);

  return (
    <div className="delivery-card full-width shadow-2px inter radius-15px white-bg flex-row-between2col flex-wrap">
      <div className="delivery-card--img flex-row-center">
        <img src={delivery.img} className='white-bg' alt="" />
        <div className={`delivery-card-status ${(delivery.isWorking === true) ? 'green-bg' : 'red-bg'}  radius-circular`} />
      </div>
      <div className="delivery-card--details flex-col-top-start">
        <div className="full-width flex-row-between delivery-card--info flex-wrap">
          <div className="flex-col-left-start">
            <div className={`font-bold size-24px ${mode === 'dark-mode' ? 'gray' : 'orange'}`}>{delivery.name.toUpperCase()}</div>
            <div className="font-bold gray margin-6px-V">{delivery.phoneNum}</div>
            <div className="gray">{delivery.email}</div>
          </div>
          <div className="flex-row-right-start">
            <Rating
              name="rating"
              style={{ color: "#FDCC0D" }}
              emptyIcon={<StarBorder className="gray" fontSize='inherit' />}
              value={parseFloat(delivery.rating)}
              precision={0.5}
              size={"medium"}
              readOnly
            />
            <div className="size-14px gray font-bold margin-4px-H">
              {parseFloat(delivery.rating)}
            </div>
          </div>
        </div>
        <div className="full-width flex-col-right-start delivery-card--age">
          <div className="flex-row-between full-width flex-wrap">
            <div className="gray">
              Email is
              <span className={`${delivery.validEmail === true ? 'green' : 'red'} margin-6px-H`}>
                {delivery.validEmail === true ? 'Valid' : 'Invalid'}
              </span>
            </div>
            <div className="gray font-bold ">
              {calculateAge(delivery.dateOfBirth)} years
            </div>
          </div>
          <div className="flex-row-between full-width margin-6px-V flex-wrap">
            <div className="gray">
              Status :
              <span className={`${delivery.status === 'Active' ? 'green' : 'red'} margin-6px-H`}>
                {delivery.status === "Active" ? 'Active' : 'Suspended'}
              </span>
            </div>
            <div className={delivery.gender === "male" ? "baby-blue" : "pink"}>
              {delivery.gender.charAt(0).toUpperCase() + delivery.gender.slice(1)}
            </div>
          </div>
          <div className="flex-row-between full-width flex-wrap">
            <div className="gray">
              Working Status:
              <span className={`${delivery.isWorking === true ? 'green' : 'red'} margin-6px-H`}>
                {delivery.isWorking === true ? 'Working' : 'Not Working'}
              </span>
            </div>
            <div className="gray">{delivery.country && delivery.city ? `${delivery.city}, ${delivery.country}` : ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeliveryInfo;
