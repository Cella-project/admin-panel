import React, { useState, useEffect } from 'react';
import GreenCard from '../../../components/common/GreenCard';
import Search from '../../../components/common/Search';
import SpecialityCard from '../../../components/speciality/SpecialityCard';
import Popup from '../../../components/common/PopupForm';
import ListsCard from '../../../components/common/ListsCard';
import Loading from '../../../components/global/Loading';

import { useDispatch, useSelector } from 'react-redux';
import { specialityActions } from '../../../apis/actions';
import { specialityMutations } from '../../../redux/mutations';

import './SpecialityList.scss';

const SpecialityList = () => {
  const dispatch = useDispatch();
  const specialities = useSelector((state) => state.speciality.specialties);

  useEffect(() => {
    document.title = 'Specialties • Admin Panel';
    dispatch(specialityMutations.setSpecialties(null));
    dispatch(specialityActions.getSpecialties());
  }, [dispatch]);

  let cards = [
    { title: 'Specialties', content: 0, icon: 'bi bi-patch-check' },
    { title: 'Active Specialties', content: 0, icon: 'bi bi-patch-check' },
    { title: 'Inactive Specialties', content: 0, icon: 'bi bi-patch-check' },
  ];

  let content = <Loading />;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const handleSearch = (query, type, filter) => {
    setSearchQuery(query);
    setSearchType(type);
    setSearchStatus(filter.status);
  };

  if (specialities !== null && specialities.length === 0) {
    content = <div className='gray inter size-16px font-bold'>Found no Speciality.</div>;
  }

  //Before loading the data from the server, show a loading spinner
  if (specialities !== null) {
    if (specialities?.length > 0) {
      const sortedSpecialities = [...specialities].sort((a, b) => a.title.localeCompare(b.title)); // sort by Title

      let filteredSpecialities = sortedSpecialities;
      if (searchQuery !== '' && searchType === 'all') {
        filteredSpecialities = filteredSpecialities.filter(speciality =>
          speciality.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (searchStatus !== '' && searchStatus !== 'all') {
        filteredSpecialities = filteredSpecialities.filter(speciality =>
          speciality.status === searchStatus && speciality.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }


      content = filteredSpecialities.length === 0 ? 'No results found.' :
        filteredSpecialities.map((speciality, index) => {
          return (
            <ListsCard key={speciality._id} >
              <SpecialityCard key={index} speciality={speciality} />
            </ListsCard>
          );
        });
    }

    cards = [
      { title: 'Specialties', content: specialities.length, icon: 'bi bi-patch-check' },
      { title: 'Active Specialties', content: specialities.filter((speciality) => speciality.status === 'Active').length, icon: 'bi bi-patch-check' },
      { title: 'Inactive Specialties', content: specialities.filter((speciality) => speciality.status === 'InActive').length, icon: 'bi bi-patch-check' },
    ];
  }

  //haddling the popup form to add a new Speciality
  const [popupShown, setPopupShown] = useState(false);
  const handleClick = () => {
    setPopupShown(true)
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  return (
    <div className="speciality full-width">
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={'Add Specialty'} />
      }

      <div className="speciality--braud-cramb gray inter size-16px font-bold">
        Specialties
      </div>

      <div className="speciality--cards">
        {cards.map((card, index) => {
          return (
            <GreenCard title={card.title} key={index}>
              <div className="full-width flex-row-center">
                <i className={`${card.icon} mint-green size-28px`}></i>
                <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
              </div>
            </GreenCard>
          );
        })}
      </div>

      <div className="flex-row-top-start">
        <Search width={'width-90-100'} page={'Specialty'} onSearch={handleSearch} />

        <div className="speciality add-icon flex-row-center size-34px mint-green-bg radius-circular pointer" onClick={handleClick}>
          <i className="bi bi-plus-lg white" ></i>
        </div>
      </div>

      <div className="flex-col-left-start inter gray width-80-100">
        {content}
      </div>
    </div>
  );
};

export default SpecialityList;

