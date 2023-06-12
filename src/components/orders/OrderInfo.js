import React from "react";
import { useSelector } from "react-redux";

import "./OrderInfo.scss";

const OrderInfo = ({ order }) => {
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div className="order-info white-bg full-width shadow-2px margin-10px-V inter radius-15px" >
      <div className="flex-col-left-start gray font-bold size-26px padding-10px-V">
        {order.code}
      </div>
      <div className="full-witdh flex-row-between2col">
        <div className="flex-col-center">
          <span className="gray size-20px">Payment Method:
            <span className={`${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px margin-6px-H`}>{order.paymentMethod}</span>
          </span>
        </div>
        <div className="flex-row-left-start gray ">
          <div className="flex-col-center ">
            <div className="flex-row-center ">
              Subtotal :
              <div className={`flex-row-center ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-18px margin-2px-H`}>{order.subTotal} EGP</div>
            </div>
            <div className="flex-row-center order-info-money">
              Delivery Fee :
              <div className={`flex-row-center ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-18px margin-2px-H`}> {order.deliveryFee} EGP</div>
            </div>
            <div className="flex-row-center">
              Total Cost :
              <div className={`flex-row-center ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-24px margin-2px-H`}> {order.total} EGP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderInfo;
