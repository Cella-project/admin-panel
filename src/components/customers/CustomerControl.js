import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerActions } from "../../apis/actions";
import router from "../../router/router";

import "./CustomerControl.scss";

const CustomerControl = ({ id }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  //handle change state
  const handleChangeState = async () => {
    dispatch(customerActions.changeCustomerState(id))
  };

  //handle delete 
  const handleDelete = () => {
    dispatch(customerActions.deleteCustomer(id, () => {
      router.navigate("/customers");
    }))
  }

  return (
    <div className="full-width flex-col-left-start control-customer flex-wrap">
      <div
        className="control-customer--btn flex-row-center white orange-bg radius-circular pointer"
        onClick={handleChangeState}>
        <i className={`bi bi-arrow-clockwise ${mode === 'dark-mode' ? 'gray' : 'white'} size-28px`}></i>
        <div className={`control-customer--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          Change State
        </div>
      </div>
      <div
        className="control-customer--btn flex-row-center white orange-bg radius-circular pointer"
        onClick={handleDelete}>
        <i className={`bi bi-trash pointer ${mode === 'dark-mode' ? 'gray' : 'white'} size-28px`}></i>
        <div className={`control-customer--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          Delete
        </div>
      </div>
    </div>
  );
};
export default CustomerControl;
