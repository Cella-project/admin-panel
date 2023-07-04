import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import OrangeCard from "../../../components/common/OrangeCard";
import StoreApplicationInfo from "../../../components/storeApplications/StoreApplicationInfo";
import StoreApplicationControl from "../../../components/storeApplications/StoreApplicationControl";
import FaceBook from "../../../assets/images/facebook.png";
import Instagram from "../../../assets/images/instagram.png";
import Whatsapp from "../../../assets/images/whatsapp.png";


import { useSelector, useDispatch } from 'react-redux';
import { storeApplicationActions } from '../../../apis/actions';
import { storeApplicationMutations } from '../../../redux/mutations';

import "./StoreApplicationDetails.scss";

const StoreApplicationDetails = () => {
  const params = useParams();
  const storeApplication = useSelector((state) => state.storeApplication.storeApplicationData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeApplicationMutations.setStoreApplicationData(null));
    dispatch(storeApplicationActions.getStoreApplicationData(params.id));
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
              <div className="flex-col-center store-application-details--card-cont full-width">
                <OrangeCard title="Branches">
                  <div className="full-width flex-col-top-start">
                    {(storeApplication && storeApplication.addresses && storeApplication.addresses.length > 0) ? (
                      storeApplication.addresses.map((address) => {
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
                      })
                    ) : (
                      <p className="gray inter size-16px font-bold">No branches to display</p>
                    )}
                  </div>
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
