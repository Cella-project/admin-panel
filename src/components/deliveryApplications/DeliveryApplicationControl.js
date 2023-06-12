import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { driverApplicationActions } from '../../apis/actions';
import router from '../../router/router';
import Popup from "../common/PopupForm";
import "./DeliveryApplicationControl.scss";


const DeliveryApplicationControl = ({id,status}) => {
  const dispatch = useDispatch();
  const [popupShown, setPopupShown] = useState(false);

  const mode = useSelector(state => state.theme.mode);

  const handleApprove = async () => {
    dispatch(driverApplicationActions.approveDriverApplication(id))
  }

  const handleReject = async () => {
    dispatch(driverApplicationActions.rejectDriverApplication(id))
  }

  //handle delete 
  const handleDelete = () => {
    dispatch(driverApplicationActions.deleteDriverApplication(id, () => {
      router.navigate("/drivers/driverApplications");      
    }))
  }

  //handle edit (under construction)
  const handleEdit = () => {
    setPopupShown(true)
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  return (
    <div className="full-width flex-col-center deliveryApplication-control flex-wrap">
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={'Edit Driver Application'} />
      }
      {status === "Pending" && 
        <div className=" flex-row-center" >
          <div
            className={`deliveryApplication-control--btn flex-row-center white green-bg radius-circular pointer }`}
            onClick={handleApprove}>
            <i className="bi bi-check-lg size-28px"></i>
          </div>
          <div
            className={`deliveryApplication-control--btn flex-row-center white red-bg radius-circular pointer }`}
            onClick={handleReject}>
            <i className="bi bi-x-lg size-28px"></i>
          </div>
        </div>
      }
      <div className=" deliveryApplication-control--btn flex-row-center white mint-green-bg radius-circular pointer" onClick={handleDelete}>
        <i className={`bi bi-trash pointer ${mode === 'dark-mode' ? 'gray' : 'white'} size-28px`}></i>
        <div className={`deliveryApplication-control--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`} >
          Delete
        </div>
      </div>
      <div className=" deliveryApplication-control--btn flex-row-center white mint-green-bg radius-circular pointer" onClick={handleEdit}>
        <i className={`bi bi-pencil-square ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`}></i>
        <div className={`deliveryApplication-control--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`} >
          Edit
        </div>
      </div>
    </div>
  );
};
export default DeliveryApplicationControl;
