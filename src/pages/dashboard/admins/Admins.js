import React, { useEffect, useState } from 'react';
import Search from '../../../components/common/Search';
import Popup from '../../../components/common/PopupForm';
import AdminCard from '../../../components/admins/AdminCard';
import OrangeCard from '../../../components/common/OrangeCard';
import ListsCard from '../../../components/common/ListsCard';

import { useDispatch, useSelector } from 'react-redux';

import { adminActions } from '../../../apis/actions';
import { adminMutations } from '../../../redux/mutations';
import Loading from '../../../components/global/Loading';

import './Admins.scss';

const Admins = () => {
  const dispatch = useDispatch();
  const { admins } = useSelector((state) => state.admin);

  useEffect(() => {
    document.title = 'Admins • Admin Panel';
    dispatch(adminMutations.setAdmins(null));
    dispatch(adminActions.getAdmins());
  }, [dispatch]);

  let cards = [
    { title: 'Admins', content: 0, icon: "bi bi-person-square" },
    { title: 'Online Admins', content: 0, icon: "bi bi-person-square" },
  ];

  let content = <Loading />;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");

  const handleSearch = (query, type) => {
    setSearchQuery(query);
    setSearchType(type);
  };

  if (admins !== null && admins.length === 0) {
    content = <p>Found no admins.</p>;
  }

  if (admins !== null && admins.length > 0) {
    if (admins && admins.length > 0) {
      const sortedAdmins = [...admins].sort((a, b) => a.name.localeCompare(b.name)); // Sort admins by name

      let filteredAdmins = sortedAdmins;
      if (searchQuery !== '') {
        if (searchType === 'all') {
          filteredAdmins = filteredAdmins.filter(admin =>
            (admin.name + admin.email + admin.phoneNum)?.toLowerCase().includes(searchQuery?.toLowerCase())
          );
        } else {
          filteredAdmins = filteredAdmins.filter(admin =>
            admin[searchType]?.toLowerCase().includes(searchQuery?.toLowerCase())
          );
        }
      }

      content = filteredAdmins.length === 0 ? <p>No result found.</p> :
        filteredAdmins.map((admin) => {
          return (
            <ListsCard key={admin._id} >
              <AdminCard adminCard={admin} />
            </ListsCard>
          );
        })
    }

    cards = [
      { title: 'Admins', content: admins.length, icon: "bi bi-person-square" },
      { title: 'Online Admins', content: admins.filter(admin => admin.connected).length, icon: "bi bi-person-square" },
    ];
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
    <div className="admins full-width" >
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={'Add Admin'} />
      }

      <div className="admins--braud-cramb gray inter size-16px font-bold">
        Admins
      </div>

      <div className="admins--cards">
        {
          cards.map((card, index) => {
            return (
              <OrangeCard title={card.title} key={index}>
                <div className="full-width flex-row-center">
                  <i className={`${card.icon} orange size-28px`}></i>
                  <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                </div>
              </OrangeCard>
            );
          })
        }
      </div>

      <div className='flex-row-top-start'>
        <Search width={'width-90-100'} onSearch={handleSearch} page={'Admins'} />

        <div className='admins add-icon flex-row-center size-34px orange-bg radius-circular pointer' onClick={handleClick}>
          <i className="bi bi-plus-lg white" />
        </div>
      </div >

      <div className='flex-col-left-start inter gray'>
        {content}
      </div>
    </div>
  )
}

export default Admins;
