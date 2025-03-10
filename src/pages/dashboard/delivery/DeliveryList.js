import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import OrangeCard from '../../../components/common/OrangeCard';
import ListsCard from '../../../components/common/ListsCard';
import Rating from '@mui/material/Rating';
import StarBorder from '@material-ui/icons/StarBorder';
import Search from '../../../components/common/Search';
import { driverActions } from '../../../apis/actions';
import { driverMutations } from '../../../redux/mutations';
import { driverApplicationActions } from '../../../apis/actions';
import { driverApplicationMutations } from '../../../redux/mutations';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/global/Loading';
import Canvas from '../../../components/common/Canvas';
import Popup from '../../../components/common/PopupForm';

import './DeliveryList.scss';

const DeliveryList = () => {
  const dispatch = useDispatch();
  const { drivers } = useSelector((state) => state.driver);
  const { driverApplications } = useSelector((state) => state.driverApplication);

  const mode = useSelector(state => state.theme.mode);

  useEffect(() => {
    document.title = 'Drivers • Admin Panel';
    dispatch(driverMutations.setDrivers(null));
    dispatch(driverActions.getDrivers());
    dispatch(driverApplicationMutations.setDriverApplications(null));
    dispatch(driverApplicationActions.getDriverApplications());
  }, [dispatch]);


  let cards = [
    { title: 'Drivers', content: 0, icon: "bi bi-truck orange" },
    { title: 'Online Drivers', content: 0, icon: "bi bi-truck orange" },
    { title: 'Offline Drivers', content: 0, icon: "bi bi-truck orange" },
  ];

  let content = <Loading />;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchWorking, setSearchWorking] = useState(null);
  const [searchVehicle, setSearchVehicle] = useState("");

  const handleSearch = (query, type, filter) => {
    setSearchQuery(query);
    setSearchType(type);
    setSearchStatus(filter.status);
    setSearchWorking(filter.working);
    setSearchVehicle(filter.vehicle);
  };

  if (drivers !== null && drivers.length === 0) {
    content = <p>Found no drivers.</p>;
  }

  if (drivers !== null && drivers.length > 0) {
    const numberOfDrivers = drivers.length;
    const onlineDrivers = drivers.filter(driver => driver.connected === true ).length;
    const offlineDrivers = drivers.filter(driver => driver.connected === false).length;

    if (drivers && drivers.length > 0) {
      const sorteddrivers = [...drivers].sort((a, b) => a.name.localeCompare(b.name)); // Sort drivers by name

      let filtereddrivers = sorteddrivers;
      if (searchQuery !== "") {
        if (searchType === "all") {
          filtereddrivers = filtereddrivers.filter(driver =>
            (driver.name + driver.email + driver.phoneNum + driver.city).toLowerCase().includes(searchQuery.toLowerCase())
          );
        } else {
          filtereddrivers = filtereddrivers.filter(driver =>
            driver[searchType].toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
      }
      if (searchStatus !== "" && searchStatus !== "all") {
        filtereddrivers = filtereddrivers.filter(driver => {
          return (
            searchQuery === "" ? driver.status === searchStatus :
              (driver.status === searchStatus &&
                (searchType === "all" ?
                  (driver.name + driver.email + driver.phoneNum + driver.city).toLowerCase().includes(searchQuery.toLowerCase()) :
                  driver[searchType].toLowerCase().includes(searchQuery.toLowerCase())
                )
              )
          )
        });
      }
      if (searchWorking !== null && searchWorking !== "all") {
        filtereddrivers = filtereddrivers.filter(driver => {
          return (
            searchQuery === "" ? driver.isWorking === searchWorking :
              (driver.isWorking === searchWorking &&
                (searchType === "all" ?
                  (driver.name + driver.email + driver.phoneNum + driver.city).toLowerCase().includes(searchQuery.toLowerCase()) :
                  driver[searchType].toLowerCase().includes(searchQuery.toLowerCase())
                )
              )
          )
        });
      }
      if (searchVehicle !== "" && searchVehicle !== "all") {
        filtereddrivers = filtereddrivers.filter(driver => {
          return (
            searchQuery === "" ? driver.vehicle.vehicleType === searchVehicle :
              (driver.vehicle.vehicleType === searchVehicle &&
                (searchType === "all" ?
                  (driver.name + driver.email + driver.phoneNum + driver.city).toLowerCase().includes(searchQuery.toLowerCase()) :
                  driver[searchType].toLowerCase().includes(searchQuery.toLowerCase())
                )
              )
          )
        });
      }

      content = filtereddrivers.length === 0 ? 'No results found.' :
        filtereddrivers.map((driver) => {
          return (
            <ListsCard key={driver._id}>
              <Link to={`/admin-panel/drivers/${driver._id}`} className='link pointer full-width flex-row-left-start2col'>
                <div className='flex-row-left-start full-width'>
                  <div className='lists-card--img radius-circular flex-row-left-start'>
                    {driver.img === 'No Image' ?
                      <Canvas name={driver.name} />
                      :
                      <img src={driver.img} className='white-bg' alt="" />
                    }
                    <div className={`lists-status ${driver.connected === true ? 'green-bg' : 'red-bg'} radius-circular`}></div>
                  </div>
                  <div className='lists-card--info gray pointer shadow-5px size-16px margin-10px-V inter radius-15px white-bg full-width flex-row-between2col'>
                    <div className='margin-2px-V'>
                      <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Name: </span>{driver.name.toUpperCase()}
                    </div>
                    <div className='margin-2px-V'>
                      <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Phone: </span>{driver.phoneNum}
                    </div>
                    <div className='margin-2px-V'>
                      <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Status: </span>
                      <span className={`margin-2px-H font-bold ${driver.status === 'Active' ? 'green' : 'red'}`}>
                        {driver.status}
                      </span>
                    </div>
                    <div className='margin-2px-V'>
                      <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Working: </span>
                      <span className={`margin-2px-H font-bold ${driver.isWorking === true ? 'green' : 'red'}`}>
                        {driver.isWorking === true ? 'Working' : 'NotWorking'}
                      </span>
                    </div>
                    <div className='margin-2px-V font-bold'>
                      <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Rating: </span>
                      <div className='flex-row-left-start'>
                        <Rating name="rating" emptyIcon={<StarBorder className='gray' fontSize='inherit' />} style={{ color: '#FDCC0D' }} value={+driver.rating} precision={0.5} size={"small"} readOnly />
                        <span className='size-12px gray font-bold margin-4px-H'>{+driver.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </ListsCard>
          );
        });

      cards = [
        { title: 'Drivers', content: numberOfDrivers, icon: "bi bi-truck orange" },
        { title: 'Online Drivers', content: onlineDrivers, icon: "bi bi-truck orange" },
        { title: 'Offline Drivers', content: offlineDrivers, icon: "bi bi-truck orange" },
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
    <div className="delivery full-width" >
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={'Add Driver'} />
      }
      <div className="delivery--braud-cramb gray inter size-16px font-bold">
        Drivers
      </div>
      <div className="delivery--cards">
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
        {driverApplications !== null && (
          <Link to={`/admin-panel/drivers/driverApplications`} className={`application-container full-width orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}>
            Application Drivers
            {driverApplications.filter(driverApplication => driverApplication.status === 'Pending').length > 0 && (
              <div className='pending-badge red-bg size-12px font-bold flex-row-center'>
                {driverApplications.filter(driverApplication => driverApplication.status === 'Pending').length}
              </div>
            )}
          </Link>
        )}
      </div>
      <div className='flex-row-top-start'>
        <Search width={'width-90-100'} page={'Drivers'} onSearch={handleSearch} />

        <div className='delivery add-icon flex-row-center size-34px orange-bg radius-circular pointer' onClick={handleClick}>
          <i className="bi bi-plus-lg white"></i>
        </div>
      </div>

      <div className='flex-col-left-start inter gray'>
        {content}
      </div>
    </div>
  )
}

export default DeliveryList;