import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import OrangeCard from "../../../components/common/OrangeCard";
import DeliveryApplicationInfo from "../../../components/deliveryApplications/DeliveryApplicationInfo";
import DeliveryApplicationControl from "../../../components/deliveryApplications/DeliveryApplicationControl";
// import ListsCard from "../../../components/common/ListsCard";
import ExpandDocument from "../../../components/common/ExpandDocument";

// import { reviewCards } from "../reviews/Reviews";

import "./DeliveryApplicationDetails.scss";
// import ReviewCard from "../../../components/reviews/ReviewCard";

import { useSelector, useDispatch } from 'react-redux';
import { driverApplicationActions } from '../../../apis/actions';
import { driverApplicationMutations } from '../../../redux/mutations';

const DeliveryApplicationDetails = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const deliveryApplication = useSelector(state => state.driverApplication.driverApplicationData);

  useEffect(() => {
    document.title = 'Driver Application Details • Admin Panel';
    dispatch(driverApplicationMutations.setDriverApplicationData(null));
    dispatch(driverApplicationActions.getDriverApplicationData(params.id));

  }, [dispatch, params.id]);

  deliveryApplication && (document.title = `${deliveryApplication.name} • Admin Panel`);


  return (
    <div className="deliveryApplication-details--container full-width flex-col-left-start2col">
      {deliveryApplication && (<>
        <div className="full-width flex-row-left-start2col">
          <div className="width-90-100">
            <DeliveryApplicationInfo deliveryApplication={deliveryApplication} />
          </div>
          <div className="width-10-100">
            <DeliveryApplicationControl id={deliveryApplication._id} status={deliveryApplication.status} />
          </div>
        </div>
        <div className="full-width flex-row-top-between2col ">
          <div className="width-70-100 flex-col-center delivery-details--container">
            <OrangeCard title="Balance"></OrangeCard>
            <OrangeCard title="Reviews">
              <PerfectScrollbar className="deliveryApplication-details--scroll--cont full-width flex-col-top-start">
                {/* {reviewCards.map((reviewCard) => {
                  return (
                    reviewCard.type === 'bi bi-truck' && reviewCard.name === deliveryApplication.name &&
                    <ListsCard width="full-width">
                      <div key={Math.random().toString()} className="flex-row-left-start full-width">
                        <ReviewCard
                          visible={reviewCard.reviewShown}
                          img={reviewCard.img}
                          customer={reviewCard.customer}
                          rating={reviewCard.rating}
                        />
                      </div>
                    </ListsCard>
                  )
                })} */}
              </PerfectScrollbar>
              <Link to={`/admin-panel/Reviews`} className="pointer lists-card--link">
                <i className="bi bi-arrow-right flex-row-right-start"></i>
              </Link>
            </OrangeCard>
          </div>
          <div className="flex-col-center width-30-100 deliveryApplication-details--container">
            <div className="full-width flex-col-center">
              <ExpandDocument driver={deliveryApplication.name} title='National ID' front={deliveryApplication.nationalIdImgFront} back={deliveryApplication.nationalIdImgBack} />
              {deliveryApplication.vehicle.vehicleType !== 'Bike' &&
                <>
                  <ExpandDocument driver={deliveryApplication.name} title='Driver License' front={deliveryApplication.vehicle.vehicleLicenseImgFront} back={deliveryApplication.vehicle.vehicleLicenseImgBack} />
                  <ExpandDocument driver={deliveryApplication.name} title={`Vehicle License for ${deliveryApplication.vehicle.vehicleType}`} front={deliveryApplication.vehicle.driverLicenseImgFront} back={deliveryApplication.vehicle.driverLicenseImgBack} />
                </>
              }
              {deliveryApplication.vehicle.vehicleType === 'Bike' &&
                <>
                  <div className="expand-document radius-15px shadow-5px baby-blue-bg">
                    <div className="expand-document--header flex-row-between ">
                      <p className="inter white size-16px space-none text-shadow">
                      Vehicle is {deliveryApplication.vehicle.vehicleType}
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
export default DeliveryApplicationDetails;
