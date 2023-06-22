import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { storeApplicationActions } from '../../apis/actions';
import { popupMutation } from "../../redux/mutations";
import router from '../../router/router';
import Popup from "../common/PopupForm";

import "./StoreApplicationControl.scss";

const StoreApplicationControl = ({ id, status }) => {
  const dispatch = useDispatch();
  const [popupShown, setPopupShown] = useState(false);

  const mode = useSelector(state => state.theme.mode);

  //handle delete 
  const handleDelete = () => {
    dispatch(storeApplicationActions.deleteStoreApplication(id, () => {
      router.navigate("/stores/storeApplications");
    }))
  }

  const handleApprove = async () => {
    dispatch(storeApplicationActions.approveStoreApplication(id))
  }

  const handleReject = async () => {
    dispatch(storeApplicationActions.rejectStoreApplication(id))
  }

  const handleEdit = () => {
    if (status === 'Pending') {
      setPopupShown(true)
      document.getElementById('dashboard-view').style.zIndex = 60;

      const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
      window.onscroll = () => {
        window.scrollTo(LeftScroll, TopScroll);
      };
    } else {
      dispatch(popupMutation.popFeedBack({
        type: 'error',
        msg: 'You can not edit this application'
      }));
    }
  }

  return (
    <div className="full-width flex-col-center storeApplication-control flex-wrap">
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={'Edit Store Application'} />
      }
      {status === "Pending" &&
        <div className="full-width flex-row-center flex-wrap" >
          <div
            className={`storeApplication-control--btn flex-row-center white green-bg radius-circular pointer }`}
            onClick={handleApprove}>
            <i className="bi bi-check-lg size-28px"></i>
          </div>
          <div
            className={`storeApplication-control--btn flex-row-center white red-bg radius-circular pointer }`}
            onClick={handleReject}>
            <i className="bi bi-x-lg size-28px"></i>
          </div>
        </div>
      }
      <div className="storeApplication-control--btn flex-row-center white orange-bg radius-circular pointer" onClick={handleDelete}>
        <i className={`bi bi-trash pointer size-28px ${mode === 'dark-mode' ? 'gray' : 'white'}`}></i>
        <div className={`storeApplication-control--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          Delete
        </div>
      </div>
      <div className="storeApplication-control--btn flex-row-center white orange-bg radius-circular pointer" onClick={handleEdit}>
        <i className={`bi bi-pencil-square size-28px ${mode === 'dark-mode' ? 'gray' : 'white'}`}></i>
        <div className={`storeApplication-control--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          Edit
        </div>
      </div>
    </div>
  );
};

export default StoreApplicationControl;
