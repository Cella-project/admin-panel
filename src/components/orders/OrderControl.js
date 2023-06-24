import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../apis/actions';
import router from '../../router/router';
import "./OrderControl.scss";

const OrderControl = ({ id }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  //handle change state
  const handleCancel = async () => {
    dispatch(orderActions.cancelOrder(id , () => {
      router.navigate(`/admin-panel/ordersHistory/${id}`);
      }
      ))
  };

  //handle delete 
  const handleDelete = () => {
    dispatch(orderActions.deleteOrder(id, () => {
      router.navigate("/admin-panel/orders");
    }))
  }

  return (
    <div className="full-width flex-col-left-start order-control flex-wrap">
      <div className="order-control--btn flex-row-center white orange-bg radius-circular pointer" onClick={handleCancel}>
        <i className={`bi bi-x-lg ${mode === 'dark-mode' ? 'gray' : 'white'} size-28px`}></i>
        <div className={`order-control--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          Cancel
        </div>
      </div>
      <div className="order-control--btn flex-row-center white orange-bg radius-circular pointer" onClick={handleDelete}>
        <i className={`bi bi-trash pointer ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`}></i>
        <div className={`order-control--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          Delete
        </div>
      </div>
    </div>
  );
};
export default OrderControl;
