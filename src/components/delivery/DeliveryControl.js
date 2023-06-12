import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { driverActions } from '../../apis/actions';
import router from '../../router/router';

import "./DeliveryControl.scss";

const DeliveryControl = ({ id }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  //handle change state
  const handleChangeState = async () => {
    dispatch(driverActions.changeDriverState(id))
  };

  //handle delete 
  const handleDelete = () => {
    dispatch(driverActions.deleteDriver(id, () => {
      router.navigate("/drivers");
    }))
  }

  return (
    <div className="full-width flex-col-left-start delivery-control flex-wrap">
      <div className="delivery-control--btn flex-row-center white mint-green-bg radius-circular pointer" onClick={handleChangeState}>
        <i className={`bi bi-arrow-clockwise ${mode === 'dark-mode' ? 'gray' : 'white'} size-28px`}></i>
        <div className={`delivery-control--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          Change State
        </div>
      </div>
      <div className="delivery-control--btn flex-row-center white mint-green-bg radius-circular pointer" onClick={handleDelete}>
        <i className={`bi bi-trash pointer ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`}></i>
        <div className={`delivery-control--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          Delete
        </div>
      </div>
    </div>
  );
};
export default DeliveryControl;
