import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PerfectScrollbar from "react-perfect-scrollbar";
import CustomerInfo from "../../../components/customers/CustomerInfo";
import CustomerControl from "../../../components/customers/CustomerControl";
import OrangeCard from "../../../components/common/OrangeCard";
import OrderCard from "../../../components/orders/OrderCard";

import { customerMutations, orderHistoryMutations, orderMutations } from "../../../redux/mutations";
import { customerActions, orderHistoryActions, orderActions } from "../../../apis/actions";

import "./CustomerDetails.scss";

const CustomerDetails = () => {
  const params = useParams();
  const customer = useSelector((state) => state.customer.customerData);
  const order = useSelector((state) => state.order.orders)
  const orderHistory = useSelector((state) => state.orderHistory.ordersHistory)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(customerMutations.setCustomerData(null));
    dispatch(customerActions.getCustomerData(params.id))
    dispatch(orderHistoryMutations.setOrderHistory(null));
    dispatch(orderHistoryActions.getOrderHistoryForCustomer(params.id));
    dispatch(orderMutations.setOrder(null));
    dispatch(orderActions.getOrderForCustomer(params.id));
  }, [dispatch, params.id]);

  const [expandedAddressId, setExpandedAddressId] = useState(null);

  const toggleAddress = (addressId) => {
    if (expandedAddressId === addressId) {
      setExpandedAddressId(null);
    } else {
      setExpandedAddressId(addressId);
    }
  };

  customer && (document.title = `${customer.name} • Admin Panel`);
  return (
    <div className="customer-details--container full-width flex-col-left-start2col">
      {customer && (
        <>
          <div className="full-width customer-details flex-row-left-start2col">
            <div className="width-90-100 customer-details ">
              <CustomerInfo customer={customer} />
            </div>
            <div className="flex-row-between width-10-100 customer-details ">
              <CustomerControl id={customer._id} />
            </div>
          </div>

          <div className="full-width flex-col-top-start customer-details--control">
            <div className="full-width flex-row-top-start2col">
              <OrangeCard title="Addresses">
                <div className="full-width flex-col-top-start">
                  {(customer.addresses && customer.addresses.length > 0) ? (
                    customer.addresses.map((address) => {
                      const isExpanded = expandedAddressId === address._id;
                      return (
                        <div key={address._id} className="full-width">
                          <div className="pointer flex-col-right-start" onClick={() => toggleAddress(address._id)}>
                            <div className="customer-details--content-container shadow-2px flex-col-center radius-15px margin-8px-V gray inter full-width">
                              <div className="text-shadow">{address.addressTitle}</div>
                              {isExpanded && (
                                <div className="flex-col-left-start gray orange full-width margin-8px-V">
                                  <div className="margin-6px-V flex-row-left-start">Address Type:
                                    <div className='gray margin-12px-H'>
                                      {address.addressType}
                                    </div>
                                  </div>
                                  <div className="margin-6px-V flex-row-left-start">City:
                                    <div className='gray margin-12px-H'>
                                      {address.city}
                                    </div>
                                  </div>
                                  <div className="margin-6px-V flex-row-left-start">District:
                                    <div className='gray margin-12px-H'>
                                      {address.district}
                                    </div>
                                  </div>
                                  <div className="margin-6px-V flex-row-left-start">Street:
                                    <div className='gray margin-12px-H'>
                                      {address.street}
                                    </div>
                                  </div>
                                  <div className="margin-6px-V flex-row-left-start">Building:
                                    <div className='gray margin-12px-H'>
                                      {address.building}
                                    </div>
                                  </div>
                                  <div className="margin-6px-V flex-row-left-start">Floor:
                                    <div className='gray margin-12px-H'>
                                      {address.floor}
                                    </div>
                                  </div>
                                  <div className="margin-6px-V flex-row-left-start">Flat:
                                    <div className='gray margin-12px-H'>
                                      {address.flat}
                                    </div>
                                  </div>
                                  <div className="margin-6px-V flex-row-top-start full-width">Phone Numbers:
                                    <div className="margin-12px-H flex-col-left-start gray">
                                      {address.phoneNums.map((phone) => (
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
                            <i className={`bi bi-chevron-${isExpanded ? "up" : "down"} gray pointer`} onClick={() => toggleAddress(address._id)} />
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="gray inter size-16px font-bold">No addresses found.</p>
                  )
                  }
                </div>
              </OrangeCard>
            </div>
            <div className="full-width flex-row-top-between2col">
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
                    <p className="gray inter size-16px font-bold">No orders to display.</p>
                  )}

                </PerfectScrollbar>
                <Link to={`/admin-panel/Orders?customer=${customer._id}`} className="pointer lists-card--link">
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
                    <p className="gray inter size-16px font-bold">No orders to display.</p>
                  )}
                </PerfectScrollbar>
                <Link to={`/admin-panel/OrdersHistory?customer=${customer._id}`} className="pointer lists-card--link">
                  <i className="bi bi-arrow-right flex-row-right-start"></i>
                </Link>
              </OrangeCard>
            </div>
          </div>
        </>)
      }
    </div >
  );
};

export default CustomerDetails;
