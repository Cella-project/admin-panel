import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import PerfectScrollbar from "react-perfect-scrollbar";
import GreenCard from "../../../components/common/GreenCard";
import StoreInfo from "../../../components/stores/StoreInfo";
import StoreControl from "../../../components/stores/StoreControl";
import ProductCard from "../../../components/products/ProductCard";
import OrderCard from "../../../components/orders/OrderCard";
import FaceBook from "../../../assets/images/facebook.png";
import Instagram from "../../../assets/images/instagram.png";
import Whatsapp from "../../../assets/images/whatsapp.png";

import { useSelector, useDispatch } from 'react-redux';
import { storeActions, productActions, orderHistoryActions } from '../../../apis/actions';
import { storeMutations, productMutations, orderHistoryMutations } from '../../../redux/mutations';
import Popup from "../../../components/common/PopupForm";

import "./StoreDetails.scss";

const StoreDetails = () => {
  const params = useParams();
  const store = useSelector((state) => state.store.storeData);
  const products = useSelector((state) => state.product.products)
  const order = useSelector((state) => state.orderHistory.orderHistory)
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
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }
  const addBranch = () => {
    setPopupShown(true);
    setHeader('Add Branch');
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  const deleteSocialAcc = (accountID) => {
    dispatch(storeActions.deleteStoreSocialMediaAccount({
      _id: params.id,
      socialMediaAccountId: accountID
    }));
  }
  const deleteAddress = (addressID) => {
    dispatch(storeActions.deleteStoreBranch({
      _id: params.id,
      addressId: addressID
    }));
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
              <GreenCard title="Orders">
                <PerfectScrollbar className="store-details--scroll--cont full-width flex-col-top-start">
                  {order ? (
                    order.map((order) => (
                      <OrderCard key={order._id} order={order} />
                    ))
                  ) : (
                    <p className="gray inter size-20px font-bold">No orders to display</p>
                  )}

                </PerfectScrollbar>
                <Link to={`/OrdersHistory`} className="pointer lists-card--link">
                  <i className="bi bi-arrow-right flex-row-right-start"></i>
                </Link>
              </GreenCard>
              <div className="flex-row-top-between2col full-width">
                <div className="flex-col-center store-details--card-cont width-50-100">
                  <GreenCard title="Branches" icon={'bi bi-plus-circle'} iconClickHandle={addBranch}>
                    {(store && store.addresses.length > 0) && (
                      <div>

                        {store.addresses.map((address) => {
                          const isExpanded = expandedAddressId === address._id;
                          return (
                            <div key={address._id}>
                              <div className="pointer flex-col-right-start" onClick={() => toggleAddress(address._id)}>
                                <div className="store-details--content-container shadow-2px flex-col-center radius-15px margin-8px-V gray inter full-width">
                                  <div className="text-shadow">{address.addressTitle}
                                    <i
                                      className="store-details--address--btn--delete margin-6px-H shadow-2px bi bi-trash pointer size-14px mint-green white-bg radius-circular flex-row-center"
                                      onClick={() => deleteAddress(address._id)}
                                    />
                                  </div>
                                  {isExpanded && (
                                    <div className="flex-col-left-start gray mint-green full-width margin-8px-V">
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
                        })}
                      </div>
                    )}
                  </GreenCard>
                  <GreenCard title="Products">
                    {products &&
                      <PerfectScrollbar className="store-details--scroll--cont full-width flex-col-top-start">
                        {products.filter((productCard) =>
                          productCard.store._id === store._id
                        ).map((product) => {
                          return (
                            <ProductCard
                              key={product._id}
                              productCard={product}
                            />
                          );
                        })}
                      </PerfectScrollbar>
                    }
                    <Link to={`/Products`} className="pointer lists-card--link">
                      <i className="bi bi-arrow-right flex-row-right-start"></i>
                    </Link>
                  </GreenCard>
                </div>
                <div className="flex-col-center store-details--card-cont width-50-100">
                  <GreenCard title="Voucher">
                    {/* <PerfectScrollbar className="store-details--scroll--cont full-width flex-col-top-start"> */}
                    {/* {voucherCards.map((voucher) => {
                  return (
                    voucher.store === storeData.name && (
                      <VoucherCard
                        type={voucher.type}
                        status={voucher.status}
                        value={voucher.value}
                        store={storeData.name}
                        code={voucher.code}
                      />
                    )
                  );
                })} */}
                    {/* </PerfectScrollbar> */}
                    <Link to={`/vouchers`} className="pointer bi bi-arrow-right flex-row-right-start lists-card--link" />
                  </GreenCard>
                  <GreenCard title="Reviews">
                    {/* <PerfectScrollbar className="store-details--scroll--cont full-width flex-col-top-start"> */}
                    {/* {reviewCards.map((reviewCard) => {
                  return (
                    (reviewCard.type === 'bi bi-shop-window' && reviewCard.name === storeData.name) &&
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
                    {/* </PerfectScrollbar> */}
                    <Link to={`/Reviews`} className="pointer lists-card--link">
                      <i className="bi bi-arrow-right flex-row-right-start"></i>
                    </Link>
                  </GreenCard>
                </div>
                <div>
                </div>
              </div>
            </div>

            <div className="store-details--card-cont flex-col-top-start width-20-100">
              <GreenCard title="Owner">
                <div className="full-width flex-col-center">
                  <div className="gray inter size-20px font-bold">{store.owner.name}</div>
                  <div className="gray inter size-14px margin-6px-V">{store.owner.email}</div>
                  <div className="gray inter size-14px margin-6px-V">{store.owner.phoneNum}</div>
                </div>
              </GreenCard>
              <GreenCard title="Social media" icon={'bi bi-plus-circle'} iconClickHandle={addSocialAccount}>
                <div className="flex-row-between pointer full-width store-details--socials flex-wrap">
                  {store && store.socialMediaAccounts && store.socialMediaAccounts.length > 0 && (
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
                            <i
                              className="store-details--socials--btn--delete shadow-2px bi bi-trash pointer size-12px mint-green white-bg radius-circular flex-row-center"
                              onClick={() => deleteSocialAcc(account._id)}
                            />
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
                              <i className="store-details--socials--btn--delete shadow-2px bi bi-trash pointer size-14px mint-green white-bg radius-circular flex-row-center" onClick={deleteSocialAcc} />
                            </a>
                            <i
                              className="store-details--socials--btn--delete shadow-2px bi bi-trash pointer size-12px mint-green white-bg radius-circular flex-row-center"
                              onClick={() => deleteSocialAcc(account._id)}
                            />
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
                            <i
                              className="store-details--socials--btn--delete shadow-2px bi bi-trash pointer size-12px mint-green white-bg radius-circular flex-row-center"
                              onClick={() => deleteSocialAcc(account._id)}
                            />
                          </div>
                        )
                      }
                      return account;
                    })
                  )}
                </div>
              </GreenCard>
              <GreenCard title="Speciality" >
                <div className="inter size-22px text-shadow gray flex-row-center font-bold">{store.speciality.title}</div>
              </GreenCard>
            </div>
          </div>
        </>)
      }
    </div >

  );
};
export default StoreDetails;
