import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import OrangeCard from "../../../components/common/OrangeCard";
import DeliveryInfo from "../../../components/delivery/DeliveryInfo";
import DeliveryControl from "../../../components/delivery/DeliveryControl";
import ExpandDocument from "../../../components/common/ExpandDocument";
import OrderCard from "../../../components/orders/OrderCard";

import { useSelector, useDispatch } from 'react-redux';
import { driverActions, orderHistoryActions, orderActions, logActivityActions, reviewActions } from '../../../apis/actions';
import { driverMutations, logActivityMutations, orderHistoryMutations, orderMutations, reviewMutations } from '../../../redux/mutations';
import Popup from "../../../components/common/PopupForm";
import ListsCard from "../../../components/common/ListsCard";
import LogActivityCard from "../../../components/logActivity/LogActivityCard";
import ReviewCard from "../../../components/reviews/ReviewCard";

import "./DeliveryDetails.scss";

const DeliveryDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const delivery = useSelector(state => state.driver.driverData);
  const order = useSelector((state) => state.order.orders);
  const orderHistory = useSelector((state) => state.orderHistory.ordersHistory);
  const reviews = useSelector(state => state.review.reviews);
  const logs = useSelector(state => state.log.logs);
  const [popupShown, setPopupShown] = useState(false);
  const [popupHeader, setPopupHeader] = useState('');
  const visible = false;

  useEffect(() => {
    dispatch(driverMutations.setDriverData(null));
    dispatch(driverActions.getDriverData(params.id));
    dispatch(orderHistoryMutations.setOrderHistory(null));
    dispatch(orderHistoryActions.getOrderHistoryForDriver(params.id));
    dispatch(orderMutations.setOrder(null));
    dispatch(orderActions.getOrderForDriver(params.id));
    dispatch(logActivityMutations.setLogs(null));
    dispatch(logActivityActions.getDriverLogs(params.id, 0));
    dispatch(reviewMutations.setReviews(null));
    dispatch(reviewActions.getReviewsForDriver(params.id));
  }, [dispatch, params.id]);


  const handleClick = (header) => {
    setPopupHeader(header)
    setPopupShown(true)
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  delivery && (document.title = `${delivery.name} • Admin Panel`);

  return (
    <div className="delivery-details--container full-width flex-col-left-start2col">
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={popupHeader} />
      }
      {delivery && (<>
        <div className="full-width flex-row-left-start2col">
          <div className="width-90-100">
            <DeliveryInfo delivery={delivery} />
          </div>
          <div className="width-10-100">
            <DeliveryControl id={delivery._id} />
          </div>
        </div>
        <div className="full-width flex-row-top-between2col ">
          <div className="width-70-100 flex-col-center delivery-details--container">
            <OrangeCard title="Balance">
              <div className="flex-col-center full-width">
                <div className="flex-row-center full-width gray">
                  <div className="size-24px margin-6px-H">{delivery.balance}</div>
                  <div className="size-24px">EGP</div>
                </div>
                <div className="flex-row-between2col delivery-details--cash inter size-16px full-width gray">
                  <button className="delivery-details--cash--btn width-50-100 orange-bg white pointer radius-15px" onClick={() => handleClick('Cash in')}>
                    Cash in
                  </button>
                  <button className="delivery-details--cash--btn width-50-100 orange-bg white pointer radius-15px" onClick={() => handleClick('Cash out')}>
                    Cash out
                  </button>
                </div>
              </div>
            </OrangeCard>
            <OrangeCard title="Orders">
              <PerfectScrollbar className="store-details--scroll--cont full-width flex-col-top-start">
                {(order && order.length > 0) ? (
                  order
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3)
                    .map((order) => (
                      <OrderCard key={order._id} order={order} />
                    ))
                ) : (
                  <p className="gray inter size-16px font-bold">No orders to display</p>
                )}

              </PerfectScrollbar>
              <Link to={`/admin-panel/Orders?driver=${delivery._id}`} className="pointer lists-card--link">
                <i className="bi bi-arrow-right flex-row-right-start"></i>
              </Link>
            </OrangeCard>
            <OrangeCard title="Orders History">
              <PerfectScrollbar className="store-details--scroll--cont full-width flex-col-top-start">
                {(orderHistory && orderHistory.length > 0) ? (
                  orderHistory
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3)
                    .map((order) => (
                      <OrderCard type='history' key={order._id} order={order} />
                    ))
                ) : (
                  <p className="gray inter size-16px font-bold">No orders to display</p>
                )}

              </PerfectScrollbar>
              <Link to={`/admin-panel/OrdersHistory?driver=${delivery._id}`} className="pointer lists-card--link">
                <i className="bi bi-arrow-right flex-row-right-start"></i>
              </Link>
            </OrangeCard>
            <OrangeCard title="Reviews">
              <PerfectScrollbar className="delivery-details--scroll--cont full-width flex-col-top-start">
                {(reviews && reviews.length > 0) ? (
                  reviews
                    .slice()
                    .sort((a, b) => b.rate - a.rate)
                    .slice(0, 3)
                    .map((review) => (
                      <ListsCard key={review._id} width="full-width">
                        <ReviewCard review={review} visible={visible} role={true} />
                      </ListsCard>
                    ))
                ) : (
                  <p className="gray inter size-16px font-bold">No reviews to display</p>
                )
                }
              </PerfectScrollbar>
              <Link to={`/admin-panel/Reviews?driver=${delivery._id}`} className="pointer lists-card--link">
                <i className="bi bi-arrow-right flex-row-right-start"></i>
              </Link>
            </OrangeCard>
            <OrangeCard title="Log Activities">
              <PerfectScrollbar className="delivery-details--scroll--cont full-width flex-col-top-start">
                {(logs && logs.length > 0) ?
                  <div className='flex-col-left-start full-width inter gray'>
                    <div className='log-activity--list-header full-width flex-row-left-start margin-2px-V'>
                      <div className='width-30-100 flex-row-left-start font-bold size-14px'>Name</div>
                      <div className='width-50-100 flex-row-left-start font-bold size-14px'>Action</div>
                      <div className='width-20-100 flex-row-left-start font-bold size-14px'>Time stamp</div>
                    </div>
                    {logs
                      .slice(0, 5)
                      .map((log) => {
                        return (
                          <ListsCard key={log._id} width="full-width">
                            <LogActivityCard log={log} role={false} />
                          </ListsCard>
                        )
                      })}
                  </div>
                  : <p className="gray inter size-16px font-bold">No logs to display</p>
                }
              </PerfectScrollbar>
              <Link to={`/admin-panel/logActivities?driver=${delivery._id}`} className="pointer lists-card--link"
                onClick={() => {
                  dispatch(logActivityMutations.setLogs(null))
                  dispatch(logActivityActions.getDriverLogs(delivery._id, 0))
                }}
              >
                <i className="bi bi-arrow-right flex-row-right-start"></i>
              </Link>
            </OrangeCard>
          </div>
          <div className="flex-col-center width-30-100 delivery-details--container">
            <div className="full-width flex-col-center">
              <ExpandDocument driver={delivery.name} title='National ID' front={delivery.nationalIdImgFront} back={delivery.nationalIdImgBack} />
              {delivery.vehicle.vehicleType !== 'Bike' &&
                <>
                  <ExpandDocument driver={delivery.name} title='Driver License' front={delivery.vehicle.vehicleLicenseImgFront} back={delivery.vehicle.vehicleLicenseImgBack} />
                  <ExpandDocument driver={delivery.name} title={`Vehicle License for ${delivery.vehicle.vehicleType}`} front={delivery.vehicle.driverLicenseImgFront} back={delivery.vehicle.driverLicenseImgBack} />
                </>
              }
              {delivery.vehicle.vehicleType === 'Bike' &&
                <>
                  <div className="expand-document radius-15px shadow-5px baby-blue-bg">
                    <div className="expand-document--header flex-row-between ">
                      <p className="inter white size-16px space-none text-shadow">
                        Vehicle is {delivery.vehicle.vehicleType}
                      </p>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </>)}
    </div>
  );
};
export default DeliveryDetails;
