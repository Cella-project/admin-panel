import React, { useState, useEffect } from 'react';
import GreenCard from '../../../components/common/GreenCard';
import Search from '../../../components/common/Search';
import Popup from '../../../components/common/PopupForm';
import StoreApplicationCard from '../../../components/storeApplications/StoreApplicationCard';
import { useDispatch, useSelector } from 'react-redux';
import { storeApplicationActions } from '../../../apis/actions';
import { storeApplicationMutations } from '../../../redux/mutations';
import './StoreApplicationList.scss';
import Loading from '../../../components/global/Loading';


const StoreApplicationList = () => {
  const dispatch = useDispatch();
  const storeApplications = useSelector((state) => state.storeApplication.storeApplications);

  useEffect(() => {
    document.title = 'Store Applications • Admin Panel';

    dispatch(storeApplicationMutations.setStoreApplications(null));
    dispatch(storeApplicationActions.getStoreApplications());
  }, [dispatch]);

  let content = <Loading />;

  if (storeApplications !== null && storeApplications.length === 0) {
    content = <p>Found no storeApplications.</p>;
  }

  let cards = [
    { title: 'StoreApplications', content: 0, icon: "bi bi-shop-window" },
    { title: 'Approved StoreApplications', content: 0, icon: "bi bi-shop-window" },
    { title: 'Rejected StoreApplications', content: 0, icon: "bi bi-shop-window" },
    { title: 'Pending StoreApplications', content: 0, icon: "bi bi-shop-window" },
  ];

  if (storeApplications !== null && storeApplications.length > 0) {
    const numberOfStoreApplications = storeApplications.length;
    const approvedStoreApplications = storeApplications.filter(storeApplication => storeApplication.status === 'Approved').length;
    const rejectedStoreApplications = storeApplications.filter(storeApplication => storeApplication.status === 'Rejected').length;
    const pendingStoreApplications = storeApplications.filter(storeApplication => storeApplication.status === 'Pending').length;

    if (storeApplications && storeApplications.length > 0) {
      const sortedApplications = [...storeApplications].sort((a, b) => a.storeName.localeCompare(b.storeName)); // Sort store applications by name

      content = sortedApplications.map((storeApplication, index) => {
        return (
          <StoreApplicationCard key={index} storeApplicationCards={storeApplication} />
        );
      })
    }

    cards = [
      { title: 'Store Applications', content: numberOfStoreApplications, icon: "bi bi-shop-window" },
      { title: 'Approved Store Applications', content: approvedStoreApplications, icon: "bi bi-shop-window" },
      { title: 'Rejected Store Applications', content: rejectedStoreApplications, icon: "bi bi-shop-window" },
      { title: 'Pending Store Applications', content: pendingStoreApplications, icon: "bi bi-shop-window" },
    ];
  }

  const [popupShown, setPopupShown] = useState(false);

  return (
    <div className="storeApplications full-width" >
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={'Add Store Application'} />
      }

      <div className="storeApplications--braud-cramb gray inter size-16px font-bold">
        Store Applications
      </div>
      <div className="storeApplications--cards">
        {
          cards.map((card) => {
            return (
              <GreenCard title={card.title} key={Math.random().toString()}>
                <div className="full-width flex-row-center">
                  <i className={`${card.icon} mint-green size-28px`}></i>
                  <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                </div>
              </GreenCard>
            );
          })
        }
      </div>
      <div className='flex-row-left-start'>
        <Search width={'width-90-100'} />
      </div>
      <div className='flex-col-left-start inter'>
        {content}
      </div>
    </div>
  )
}

export default StoreApplicationList;