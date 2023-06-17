import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import PerfectScrollbar from "react-perfect-scrollbar";
import OrangeCard from "../../../components/common/OrangeCard";
import StoreApplicationInfo from "../../../components/storeApplications/StoreApplicationInfo";
import StoreApplicationControl from "../../../components/storeApplications/StoreApplicationControl";
import ProductCard from "../../../components/products/ProductCard";
import ListsCard from "../../../components/common/ListsCard";
import FaceBook from "../../../assets/images/facebook.png";
import Instagram from "../../../assets/images/instagram.png";
import Whatsapp from "../../../assets/images/whatsapp.png";

import "./StoreApplicationDetails.scss";

import { useSelector, useDispatch } from 'react-redux';
import { storeApplicationActions, productActions } from '../../../apis/actions';
import { storeApplicationMutations, productMutations } from '../../../redux/mutations';

const StoreApplicationDetails = () => {
  const params = useParams();
  const storeApplication = useSelector((state) => state.storeApplication.storeApplicationData);
  const products = useSelector((state) => state.product.products)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeApplicationMutations.setStoreApplicationData(null));
    dispatch(storeApplicationActions.getStoreApplicationData(params.id));
    dispatch(productMutations.setProducts(null));
    dispatch(productActions.getProducts());
  }, [dispatch, params.id]);

  const [expandedAddressId, setExpandedAddressId] = useState(null);

  const toggleAddress = (addressId) => {
    if (expandedAddressId === addressId) {
      setExpandedAddressId(null);
    } else {
      setExpandedAddressId(addressId);
    }
  };

  storeApplication && (document.title = `${storeApplication.storeName} • Admin Panel`);

  return (
    <div className="store-application-details--container full-width flex-col-left-start2col">
      {storeApplication && (
        <>
          <div className="flex-row-left-start2col store-application-details full-width">
            <div className="width-90-100 store-application-details">
              <StoreApplicationInfo storeApplication={storeApplication} />
            </div>
            <div className="flex-row-between store-application-details width-10-100">
              <StoreApplicationControl id={storeApplication._id} status={storeApplication.status} />
            </div>
          </div>
          <div className='flex-row-left-start2col store-application-details--control full-width'>
            <div className="flex-row-top-between2col width-80-100">
              <div className="flex-col-center store-application-details--card-cont width-50-100">
                <OrangeCard title="Branches">
                  {(storeApplication && storeApplication.addresses && storeApplication.addresses.length > 0) && (
                    <div>
                      {storeApplication.addresses.map((address) => {
                        const isExpanded = expandedAddressId === address._id;
                        return (
                          <div key={address._id}>
                            <div className="pointer flex-col-right-start" onClick={() => toggleAddress(address._id)}>
                              <div className="store-application-details--content-container shadow-2px flex-col-center radius-15px margin-8px-V gray inter full-width">
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
                              <i
                                className={`bi bi-chevron-${isExpanded ? "up" : "down"} gray`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </OrangeCard>
                <OrangeCard title="Products">
                  <PerfectScrollbar className="store-details--scroll--cont full-width">

                    {products &&
                      products
                        .filter((productCard) =>
                          productCard.store._id === storeApplication._id
                        )
                        .map((product, index) => {
                          return (
                            <ListsCard width="full-width">
                              <div
                                key={Math.random().toString()}
                                className="flex-row-left-start full-width"
                              >
                                <ProductCard
                                  key={index}
                                  productCard={product}
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
              <div className="flex-col-center store-application-details--card-cont width-50-100">
                <OrangeCard title="Voucher">
                  {/* <PerfectScrollbar className="store-application-details--scroll--cont full-width flex-col-top-start"> */}
                  {/* {voucherCards.map((voucher) => {
                  return (
                    voucher.storeApplication === storeApplicationData.name && (
                      <VoucherCard
                        type={voucher.type}
                        status={voucher.status}
                        value={voucher.value}
                        storeApplication={storeApplicationData.name}
                        code={voucher.code}
                      />
                    )
                  );
                })} */}
                  {/* </PerfectScrollbar> */}
                  <Link to={`/vouchers`} className="pointer bi bi-arrow-right flex-row-right-start lists-card--link" />
                </OrangeCard>
                <OrangeCard title="Reviews">
                  {/* <PerfectScrollbar className="store-application-details--scroll--cont full-width flex-col-top-start"> */}
                  {/* {reviewCards.map((reviewCard) => {
                  return (
                    (reviewCard.type === 'bi bi-shop-window' && reviewCard.name === storeApplicationData.name) &&
                    <ListsCard width="full-width">
                      <div key={Math.random().toString()} className="flex-row-left-start full-width">
                        <ReviewCard
                          visible={reviewCard.reviewShown}
                          img={reviewCard.img}
                          store-application={reviewCard.store-application}
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
                </OrangeCard>
              </div>
            </div>
            <div className="store-application-details--card-cont flex-col-top-start width-20-100">
              <OrangeCard title="Owner">
                <div className="full-width flex-col-center">
                  <div className="gray inter size-20px font-bold">{storeApplication.owner.name}</div>
                  <div className="gray inter size-14px margin-6px-V">{storeApplication.owner.email}</div>
                  <div className="gray inter size-14px margin-6px-V">{storeApplication.owner.phoneNum.replace('+20', '')}</div>
                </div>
              </OrangeCard>
              <OrangeCard title="Social media">
                <div className="flex-row-between pointer full-width store-application-details--socials flex-wrap">
                  {storeApplication.socialMediaAccounts && storeApplication.socialMediaAccounts.length > 0 && (
                    storeApplication.socialMediaAccounts.map(account => {
                      if (account.accountType === 'Facebook') {
                        return (
                          <div className="store-application-details--socials--btn" key={account.accountType}>
                            <a href={account.link} target="_blank" rel="noreferrer">
                              <img src={FaceBook} alt='facebook' />
                              <div className="store-application-details--socials--btn--tag white inter size-12px radius-5px shadow-5px">
                                Facebook
                              </div>
                            </a>
                          </div>
                        )
                      } if (account.accountType === 'Whatsapp') {
                        return (
                          <div className="store-application-details--socials--btn" key={account.accountType}>
                            <a href={account.link} target="_blank" rel="noreferrer">
                              <img src={Whatsapp} alt='whatsapp' />
                              <div className="store-application-details--socials--btn--tag white inter size-12px radius-5px shadow-5px">
                                Whatsapp
                              </div>
                            </a>
                          </div>
                        )
                      } else if (account.accountType === 'Instagram') {
                        return (
                          <div className="store-application-details--socials--btn" key={account.accountType}>
                            <a href={account.link} target="_blank" rel="noreferrer">
                              <img src={Instagram} alt='instagram' />
                              <div className="store-application-details--socials--btn--tag white inter size-12px radius-5px shadow-5px">
                                Instagram
                              </div>
                            </a>
                          </div>
                        )
                      }
                      return account;
                    })
                  )}
                </div>
              </OrangeCard>



              <OrangeCard title="Speciality" >
                <div className="inter size-22px text-shadow gray flex-row-center font-bold">{storeApplication.speciality.title}</div>
              </OrangeCard>
            </div>
          </div>
        </>
      )}
    </div>

  );
};
export default StoreApplicationDetails;
