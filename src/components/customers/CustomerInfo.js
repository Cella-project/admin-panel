import React from "react";
import Canvas from "../common/Canvas";
import { useSelector } from "react-redux";

import "./CustomerInfo.scss";

const CustomerInfo = ({ customer }) => {
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  }

  const mode = useSelector(state => state.theme.mode);

  return (
    <div className="customer-card full-width shadow-2px inter radius-15px white-bg flex-row-between2col">
      <div className="customer-card--img flex-row-center">
        <Canvas name={customer.name} width={130} height={130} fontSize={'90px'} />
        <div className={`customer-card-status ${customer.status === 'Active' ? 'green' : 'red'}-bg  radius-circular`} />
      </div>
      <div className="full-width customer-card--details">
        <div className="full-width customer-card--customer-info">
          <div className={`${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-24px font-bold`}>{customer.name.toUpperCase()}</div>
          <div className="gray margin-8px-V">{customer.email&& customer.email}</div>
          <div className="gray margin-8px-V">{customer.phoneNum && customer.phoneNum}</div>
        </div>
        <div className="full-width flex-col-right-start">
          {
            customer.dateOfBirth &&
            <div className=" gray font-bold">
              {calculateAge(customer.dateOfBirth)} years
            </div>
          }
          {
            customer.gender &&
            <div className={customer.gender === 'male' ? 'baby-blue' : 'pink'}>
              {customer.gender.charAt(0).toUpperCase() + customer.gender.slice(1)}
            </div>
          }
        </div>
      </div>
    </div>
  );
};
export default CustomerInfo;
