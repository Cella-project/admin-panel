import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import OrangeCard from "../../../components/common/OrangeCard";
import OrderInfo from "../../../components/orders/OrderInfo";
import OrderControl from "../../../components/orders/OrderControl";
import ProductCard from "../../../components/products/ProductCard";
import ListsCard from "../../../components/common/ListsCard";
import StoreInfo from "../../../components/stores/StoreInfo";
import DeliveryInfo from '../../../components/delivery/DeliveryInfo';
import { useSelector, useDispatch } from 'react-redux';
import { orderActions } from "../../../apis/actions";
import { orderMutations } from "../../../redux/mutations";

import "./OrderDetails.scss";
const OrderDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const order = useSelector(state => state.order.orderData);
  const [expandedPickup, setExpandedPickup] = useState(false)
  const [expandedDrop, setExpandedDrop] = useState(false)

  const handleExpandPick = () => {
    setExpandedPickup(!expandedPickup)
  }

  const handleExpandDrop = () => {
    setExpandedDrop(!expandedDrop)
  }

  useEffect(() => {
    dispatch(orderMutations.setOrderData(null));
    dispatch(orderActions.getOrderData(params.id));
  }, [dispatch, params.id]);

  order && (document.title = `${order.code} • Admin Panel`);

  return (
    <div className="order-details--container full-width flex-col-left-start2col">
      {order && (<>
        <div className="flex-row-left-start2col order-details full-width">
          <div className="width-90-100 order-details">
            <OrderInfo order={order} />
          </div>
          <div className="flex-row-between order-details width-10-100">
            <OrderControl id={order._id} />
          </div>
        </div>
        <div className="flex-row-left-start2col order-details--control full-width">
          <div className="flex-col-center width-80-100">
            <div className="flex-col-left-start order-details--card-cont full-width">
              <div className="flex-row-left-start2col full-width">
                <div className="flex-row-top-between2col full-width" >
                  <OrangeCard title="Delivery">
                    {order.driver.state === 'NotAssigned' ? (
                      <div className="gray inter size-20px font-bold flex-row-center">Not Assigned</div>
                    ) : (
                      <Link to={`/drivers/${order.driver.driverId}`} className="pointer lists-card--link">
                        <DeliveryInfo delivery={order.driver} />
                      </Link>
                    )}
                  </OrangeCard>
                  <OrangeCard title="Store">
                    {
                      <Link to={`/stores/${order.store.storeId}`} className="pointer lists-card--link">
                        <StoreInfo store={order.store} />
                      </Link>
                    }
                  </OrangeCard>
                </div>
              </div>
              <div className="flex-col-center full-width">
                <OrangeCard title="Products">
                  <PerfectScrollbar className="review-scroll--cont full-width">
                    {order.items
                      .map((item) => {
                        return (
                          <ListsCard key={item._id} width="full-width">
                            <div className="flex-row-left-start full-width">
                              <ProductCard
                                productCard={item.product}
                                size={item.size}
                                color={item.color}
                                quantity={item.quantity}
                                price={item.unitTotal}
                                width="full-width"
                              />
                            </div>
                          </ListsCard>
                        );
                      })
                    }
                  </PerfectScrollbar>
                  <Link to={`/Products`} className="pointer lists-card--link">
                    <i className="bi bi-arrow-right flex-row-right-start"></i>
                  </Link>
                </OrangeCard>
              </div>
              <div className="flex-row-top-between2col full-width full-width">
                <OrangeCard title="Review">
                  {/* <PerfectScrollbar className="review-scroll--cont full-width"></PerfectScrollbar> */}
                  <Link to={`/Reviews`} className="pointer lists-card--link">
                    <i className="bi bi-arrow-right flex-row-right-start"></i>
                  </Link>
                </OrangeCard>
                <OrangeCard title="Voucher">
                  {/* {
                                    voucherCards.map((voucher) => {
                                        return (
                                            voucher.id === order.voucher &&
                                            <VoucherCard type={voucher.type}
                                            status={voucher.status}
                                            store={voucher.store}
                                            value={voucher.value}
                                            code={voucher.code}
                                            img={voucher.img} />
                                            );
                                        })
                                    }
                                    <Link to={`/Vouchers`} className="pointer lists-card--link">
                                    <i className="bi bi-arrow-right flex-row-right-start"></i>
                                </Link> */}
                </OrangeCard>
              </div>
            </div>

          </div>
          <div className="flex-col-top-start order-details--card-cont width-20-100">
            <OrangeCard title="Customer">
              {
                <Link to={`/customers/${order.customer.customerId}`} className="pointer lists-card--link order-details--customer">
                  <div className="gray inter size-20px font-bold flex-row-center">{order.customer.name}</div>
                </Link>
              }
            </OrangeCard>
            <OrangeCard title="Pickup Location">
              {order && order.pickupLocation && (
                <div>
                  <div className="pointer flex-col-right-start" onClick={() => handleExpandPick()}>
                    <div className="order-details--content-container shadow-2px flex-col-left-start radius-15px margin-8px-V gray inter full-width">
                      <div className="text-shadow full-width flex-row-center">{order.pickupLocation.addressTitle}</div>
                      {expandedPickup && (
                        <div className="flex-col-left-start gray orange full-width margin-8px-V">
                          <div className="margin-6px-V flex-row-left-start">Address Type:
                            <div className='gray margin-12px-H'>
                              {order.pickupLocation.addressType}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-left-start">City:
                            <div className='gray margin-12px-H'>
                              {order.pickupLocation.city}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-left-start">District:
                            <div className='gray margin-12px-H'>
                              {order.pickupLocation.district}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-left-start">Street:
                            <div className='gray margin-12px-H'>
                              {order.pickupLocation.street}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-left-start">Building:
                            <div className='gray margin-12px-H'>
                              {order.pickupLocation.building}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-left-start">Floor:
                            <div className='gray margin-12px-H'>
                              {order.pickupLocation.floor}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-left-start">Flat:
                            <div className='gray margin-12px-H'>
                              {order.pickupLocation.flat}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-top-start full-width">Phone Numbers:
                            <div className="margin-12px-H flex-col-left-start gray">
                              {order.pickupLocation.phoneNums.map((phone) => (
                                <div key={phone._id}>
                                  {phone.type}: {phone.phoneNum}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-row-right-start margin-2px-V size-14px font-bold">
                    <i
                      className={`bi bi-chevron-${expandedPickup ? "up" : "down"} gray`}
                    />
                  </div>
                </div>
              )}

            </OrangeCard>
            <OrangeCard title="Drop Location">
              {order && order.dropLocation && (
                <div>
                  <div className="pointer flex-col-right-start" onClick={() => handleExpandDrop()}>
                    <div className="order-details--content-container shadow-2px flex-col-center radius-15px margin-8px-V gray inter full-width">
                      <div className="text-shadow">{order.dropLocation.addressTitle}</div>
                      {expandedDrop && (
                        <div className="flex-col-left-start gray orange full-width margin-8px-V">
                          <div className="margin-6px-V flex-row-left-start">Address Type:
                            <div className='gray margin-12px-H'>
                              {order.dropLocation.addressType}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-left-start">City:
                            <div className='gray margin-12px-H'>
                              {order.dropLocation.city}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-left-start">District:
                            <div className='gray margin-12px-H'>
                              {order.dropLocation.district}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-left-start">Street:
                            <div className='gray margin-12px-H'>
                              {order.dropLocation.street}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-left-start">Building:
                            <div className='gray margin-12px-H'>
                              {order.dropLocation.building}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-left-start">Floor:
                            <div className='gray margin-12px-H'>
                              {order.dropLocation.floor}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-left-start">Flat:
                            <div className='gray margin-12px-H'>
                              {order.dropLocation.flat}
                            </div>
                          </div>
                          <div className="margin-6px-V flex-row-top-start full-width">Phone Numbers:
                            <div className="margin-12px-H flex-col-left-start gray">
                              {order.dropLocation.phoneNums.map((phone) => (
                                <div key={phone._id}>
                                  {phone.type}: {phone.phoneNum}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-row-right-start margin-2px-V size-14px font-bold">
                    <i
                      className={`bi bi-chevron-${expandedDrop ? "up" : "down"} gray`}
                    />
                  </div>
                </div>
              )}

            </OrangeCard>
          </div>
        </div>
      </>)}
    </div>
  );
};

export default OrderDetails;
