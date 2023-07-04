import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import OrangeCard from "../../../components/common/OrangeCard";
import StoreInfo from "../../../components/stores/StoreInfo";
import StoreControl from "../../../components/stores/StoreControl";
import ProductCard from "../../../components/products/ProductCard";
import OrderCard from "../../../components/orders/OrderCard";
import FaceBook from "../../../assets/images/facebook.png";
import Instagram from "../../../assets/images/instagram.png";
import Whatsapp from "../../../assets/images/whatsapp.png";
import { useSelector, useDispatch } from 'react-redux';
import { storeActions, productActions, orderHistoryActions, orderActions, logActivityActions } from '../../../apis/actions';
import { storeMutations, productMutations, orderHistoryMutations, orderMutations, logActivityMutations } from '../../../redux/mutations';
import Popup from "../../../components/common/PopupForm";
import LogActivityCard from "../../../components/logActivity/LogActivityCard";
import ListsCard from "../../../components/common/ListsCard";

import "./StoreDetails.scss";

const StoreDetails = () => {
  const params = useParams();
  const store = useSelector((state) => state.store.storeData);
  const products = useSelector((state) => state.product.products);
  const order = useSelector((state) => state.order.orders);
  const orderHistory = useSelector((state) => state.orderHistory.ordersHistory);
  const logs = useSelector((state) => state.log.logs);
  let editmode = false;
  const dispatch = useDispatch();
  const [popupShown, setPopupShown] = useState(false);
  const [header, setHeader] = useState('');

  useEffect(() => {
    dispatch(storeMutations.setStoreData(null));
    dispatch(storeActions.getStoreData(params.id));
    dispatch(productMutations.setProducts(null));
    dispatch(productActions.getProducts());
    dispatch(orderHistoryMutations.setOrderHistory(null));
    dispatch(orderHistoryActions.getOrderHistoryForStore(params.id));
    dispatch(orderMutations.setOrder(null));
    dispatch(orderActions.getOrderForStore(params.id));
    dispatch(logActivityMutations.setLogs(null));
    dispatch(logActivityActions.getStoreLogs(params.id, 0));
  }, [dispatch, params.id]);

  const [expandedAddressId, setExpandedAddressId] = useState(null);

  const toggleAddress = (addressId) => {
    if (expandedAddressId === addressId) {
      setExpandedAddressId(null);
    } else {
      setExpandedAddressId(addressId);
    }
  };

  const addSocialAccount = () => {
    setPopupShown(true);
    setHeader('Add Social Media Accounts');
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }
  const addBranch = () => {
    setPopupShown(true);
    setHeader('Add Branch');
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  store && (document.title = `${store.storeName} • Admin Panel`);

  return (
    <div className="store-details--container full-width flex-col-left-start2col">
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={header} />
      }
      {store && (
        <>
          <div className="flex-row-left-start2col store-details full-width">
            <div className="width-90-100 store-details">
              <StoreInfo store={store} editmode={editmode} />
            </div>
            <div className="flex-row-between store-details width-10-100">
              <StoreControl id={store._id} editmode={editmode} />
            </div>
          </div>

          <div className='flex-row-left-start2col store-details--control full-width'>
            <div className="full-width store-details--card-cont flex-col-center">
              <div className="flex-row-top-between2col full-width">
                <OrangeCard title="Branches" icon={'bi bi-plus-circle'} iconClickHandle={addBranch}>
                  <div className="full-width flex-col-top-start">
                    {(store && store.addresses.length > 0) ? (
                      store.addresses.map((address) => {
                        const isExpanded = expandedAddressId === address._id;
                        return (
                          <div key={address._id} className="full-width">
                            <div className="pointer flex-col-right-start" onClick={() => toggleAddress(address._id)}>
                              <div className="store-details--content-container shadow-2px flex-col-center radius-15px margin-8px-V gray inter full-width">
                                <div className="text-shadow">{address.addressTitle}
                                </div>
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
                              <i
                                className={`pointer bi bi-chevron-${isExpanded ? "up" : "down"} gray`}
                                onClick={() => toggleAddress(address._id)}
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="gray inter size-16px font-bold">No branches to display</p>
                    )}
                  </div>
                </OrangeCard>
                <div>
                </div>
              </div>
              <div className="full-width flex-row-top-between2col">
                <OrangeCard title="Orders">
                  <PerfectScrollbar className="store-details--scroll--cont full-width flex-col-top-start">
                    {(order && order.length > 0) ? (
                      order
                        .slice()
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 5)
                        .map((order) => (
                          <OrderCard key={order._id} order={order} />
                        ))
                    ) : (
                      <p className="gray inter size-16px font-bold">No orders to display</p>
                    )}
                  </PerfectScrollbar>
                  <Link to={`/admin-panel/Orders?store=${store._id}`} className="pointer lists-card--link">
                    <i className="bi bi-arrow-right flex-row-right-start"></i>
                  </Link>
                </OrangeCard>
                <OrangeCard title="Orders History">
                  <PerfectScrollbar className="store-details--scroll--cont full-width flex-col-top-start">
                    {(orderHistory && orderHistory.length > 0) ? (
                      orderHistory
                        .slice()
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 5)
                        .map((order) => (
                          <OrderCard type='history' key={order._id} order={order} />
                        ))
                    ) : (
                      <p className="gray inter size-16px font-bold">No orders to display</p>
                    )}

                  </PerfectScrollbar>
                  <Link to={`/admin-panel/OrdersHistory?store=${store._id}`} className="pointer lists-card--link">
                    <i className="bi bi-arrow-right flex-row-right-start"></i>
                  </Link>
                </OrangeCard>
              </div>
              <div className="flex-row-top-start2col full-width">
                <OrangeCard title="Products">
                  <PerfectScrollbar className="store-details--scroll--cont full-width flex-col-top-start">
                    {products && products.length > 0 ? (
                      products.filter((productCard) => productCard.store._id === store._id).length === 0 ? (
                        <p className="gray inter size-16px font-bold">No products to display</p>
                      ) : products.filter((productCard) => productCard.store._id === store._id)
                        .slice()
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 5)
                        .map((product) => {
                          return (
                            <ProductCard key={product._id} productCard={product} />
                          );
                        })
                    ) : (
                      <p className="gray inter size-16px font-bold">No products to display</p>
                    )
                    }
                  </PerfectScrollbar>
                  <Link to={`/admin-panel/products?store=${store._id}`} className="pointer lists-card--link">
                    <i className="bi bi-arrow-right flex-row-right-start"></i>
                  </Link>
                </OrangeCard>
              </div>
              <div className="flex-row-top-start2col full-width">
                <OrangeCard title="Log Activities">
                  <PerfectScrollbar className="store-details--scroll--cont full-width flex-col-top-start">
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
                              <ListsCard key={log._id} width={'full-width'}>
                                <LogActivityCard log={log} role={false} />
                              </ListsCard>
                            )
                          })}
                      </div>
                      : <p className="gray inter size-16px font-bold">No logs to display</p>
                    }
                  </PerfectScrollbar>
                  <Link to={`/admin-panel/logActivities?store=${store._id}`} className="pointer lists-card--link"
                    onClick={() => {
                      dispatch(logActivityMutations.setLogs(null))
                      dispatch(logActivityActions.getStoreLogs(store._id, 0))
                    }}
                  >
                    <i className="bi bi-arrow-right flex-row-right-start"></i>
                  </Link>
                </OrangeCard>
              </div>
            </div>

            <div className="store-details--card-cont flex-col-top-start width-20-100">
              {order && order.length > 0 &&
                <OrangeCard title="Active orders" >
                  <div className="full-width flex-row-center">
                    <p className="gray inter size-28px margin-12px-H text-shadow">{order.length}</p>
                    <i className={`bi bi-receipt orange size-30px`} />
                  </div>
                </OrangeCard>
              }
              <OrangeCard title="Owner">
                <div className="full-width flex-col-center">
                  <div className="gray inter size-20px font-bold">{store.owner.name}</div>
                  <div className="gray inter size-14px margin-6px-V">{store.owner.email}</div>
                  <div className="gray inter size-14px margin-6px-V">{store.owner.phoneNum}</div>
                </div>
              </OrangeCard>
              <OrangeCard title="Social media" icon={'bi bi-plus-circle'} iconClickHandle={addSocialAccount}>
                <div className="flex-row-between pointer full-width store-details--socials flex-wrap">
                  {(store && store.socialMediaAccounts && store.socialMediaAccounts.length > 0) ? (
                    store.socialMediaAccounts.map(account => {
                      if (account.accountType === 'Facebook') {
                        return (
                          <div className="store-details--socials--btn" key={account.accountType}>
                            <a href={account.link} target="_blank" rel="noreferrer">
                              <img src={FaceBook} alt='facebook' />
                              <div className="store-details--socials--btn--tag white inter size-12px radius-5px shadow-5px">
                                Facebook
                              </div>
                            </a>
                          </div>
                        )
                      } if (account.accountType === 'Whatsapp') {
                        return (
                          <div className="store-details--socials--btn" key={account.accountType}>
                            <a href={account.link} target="_blank" rel="noreferrer">
                              <img src={Whatsapp} alt='whatsapp' />
                              <div className="store-details--socials--btn--tag white inter size-12px radius-5px shadow-5px">
                                Whatsapp
                              </div>
                            </a>
                          </div>
                        )
                      }
                      if (account.accountType === 'Instagram') {
                        return (
                          <div className="store-details--socials--btn" key={account.accountType}>
                            <a href={account.link} target="_blank" rel="noreferrer">
                              <img src={Instagram} alt='instagram' />
                              <div className="store-details--socials--btn--tag white inter size-12px radius-5px shadow-5px">
                                Instagram
                              </div>
                            </a>
                          </div>
                        )
                      }
                      return account;
                    })
                  ) : (
                    <p className="gray inter size-16px font-bold">No social media accounts</p>
                  )}
                </div>
              </OrangeCard>
              <OrangeCard title="Speciality" >
                <div className="inter size-22px text-shadow gray flex-row-center font-bold">{store.speciality.title}</div>
              </OrangeCard>
            </div>
          </div>
        </>)
      }
    </div >

  );
};
export default StoreDetails;
