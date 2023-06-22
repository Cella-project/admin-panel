import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import OrangeCard from '../../../components/common/OrangeCard';
import Search from '../../../components/common/Search';
import Popup from '../../../components/common/PopupForm';
import StoreCard from '../../../components/stores/StoreCard';
import { useDispatch, useSelector } from 'react-redux';
import { storeActions } from '../../../apis/actions';
import { storeMutations } from '../../../redux/mutations';
import { storeApplicationActions } from '../../../apis/actions';
import { storeApplicationMutations } from '../../../redux/mutations';
import Loading from '../../../components/global/Loading';

import './StoreList.scss';

const StoreList = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store.stores);
  const storeApplications = useSelector((state) => state.storeApplication.storeApplications);

  const mode = useSelector(state => state.theme.mode);

  useEffect(() => {
    document.title = 'Stores • Admin Panel';

    dispatch(storeMutations.setStores(null));
    dispatch(storeMutations.setStoreData(null));
    dispatch(storeActions.getStores());
    dispatch(storeApplicationMutations.setStoreApplications(null));
    dispatch(storeApplicationActions.getStoreApplications());
  }, [dispatch]);

  let cards = [
    { title: 'Stores', content: 0, icon: "bi bi-shop-window" },
    { title: 'Active Stores', content: 0, icon: "bi bi-shop-window" },
    { title: 'Inactive Stores', content: 0, icon: "bi bi-shop-window" },
  ];

  let content = <Loading />;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchSpecialty, setSearchSpecialty] = useState("");

  const handleSearch = (query, type, filter) => {
    setSearchQuery(query);
    setSearchType(type);
    setSearchStatus(filter.status);
    setSearchSpecialty(filter.specialty);
  };

  if (stores !== null && stores.length === 0) {
    content = <p>Found no stores.</p>;
  }

  if (stores !== null && stores.length > 0) {
    const numberOfStores = stores.length;
    const activeStores = stores.filter(store => store.status === 'Active').length;
    const inactiveStores = stores.filter(store => store.status === 'InActive').length;

    if (stores && stores.length > 0) {
      const sortedStores = [...stores].sort((a, b) => b.rating - a.rating); // Sort stores by rate

      let filteredStores = sortedStores;
      if (searchQuery !== '') {
        if (searchType === 'all') {
          filteredStores = filteredStores.filter(store =>
            (store.owner.name + store.storeName + store.owner.phoneNum)?.toLowerCase().includes(searchQuery?.toLowerCase())
          );
        } else {
          filteredStores = filteredStores.filter(store => {
            if (searchType.includes('.')) {
              return store[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery?.toLowerCase())
            } else return store[searchType]?.toLowerCase().includes(searchQuery?.toLowerCase())
          }
          );
        }
      }
      if (searchStatus !== '' && searchStatus !== 'all') {
        filteredStores = filteredStores.filter(store => {
          return (
            searchQuery === '' ? store.status === searchStatus :
              (store.status === searchStatus &&
                (searchType === 'all' ?
                  (store.owner.name + store.storeName + store.owner.phoneNum)?.toLowerCase().includes(searchQuery?.toLowerCase()) :
                  searchType.includes('.') ?
                    store[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery?.toLowerCase()) :
                    store[searchType]?.toLowerCase().includes(searchQuery?.toLowerCase())
                ))
          )
        }
        );
      }
      if (searchSpecialty !== '' && searchSpecialty !== 'all') {
        filteredStores = filteredStores.filter(store => {
          return (
            searchQuery === '' ? store.speciality.title === searchSpecialty :
              (store.speciality.title === searchSpecialty &&
                (searchType === 'all' ?
                  (store.owner.name + store.storeName + store.owner.phoneNum)?.toLowerCase().includes(searchQuery?.toLowerCase()) :
                  searchType.includes('.') ?
                    store[searchType.split('.')[0]][searchType.split('.')[1]]?.toLowerCase().includes(searchQuery?.toLowerCase()) :
                    store[searchType]?.toLowerCase().includes(searchQuery?.toLowerCase())
                ))
          )
        }
        );
      }

      content = filteredStores.length === 0 ? 'No results found.' :
        filteredStores.map((store) => {
          return (
            <StoreCard key={store._id} storeCards={store} />
          );
        });

      cards = [
        { title: 'Stores', content: numberOfStores, icon: "bi bi-shop-window" },
        { title: 'Active Stores', content: activeStores, icon: "bi bi-shop-window" },
        { title: 'Inactive Stores', content: inactiveStores, icon: "bi bi-shop-window" },
      ];
    }
  }

  const [popupShown, setPopupShown] = useState(false);

  const handleClick = () => {
    setPopupShown(true)
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  return (
    <div className="stores full-width" >
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={'Add Store'} />
      }

      <div className="stores--braud-cramb gray inter size-16px font-bold">
        Stores
      </div>
      <div className="stores--cards">
        {
          cards.map((card) => {
            return (
              <OrangeCard title={card.title} key={Math.random().toString()}>
                <div className="full-width flex-row-center">
                  <i className={`${card.icon} orange size-28px`}></i>
                  <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                </div>
              </OrangeCard>
            );
          })
        }
        {storeApplications !== null && (
          <Link to={`/stores/storeApplications`} className={`stores--application-container full-width orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}>
            Application Stores
            {storeApplications.filter(storeApplication => storeApplication.status === 'Pending').length > 0 && (
              <div className='stores--pending-badge shadow-5px white font-bold red-bg size-12px flex-row-center'>
                {storeApplications.filter(storeApplication => storeApplication.status === 'Pending').length}
              </div>
            )}
          </Link>
        )}

      </div>
      <div className='flex-row-top-start'>
        <Search width={'width-90-100'} onSearch={handleSearch} page={'Stores'} />
        <div className='stores add-icon flex-row-center size-34px orange-bg radius-circular pointer' onClick={handleClick}>
          <i className="bi bi-plus-lg white"></i>
        </div>
      </div>
      <div className='flex-col-left-start inter gray'>
        {content}
      </div>
    </div>
  )
}

export default StoreList;