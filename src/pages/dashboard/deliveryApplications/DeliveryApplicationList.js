import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import OrangeCard from '../../../components/common/OrangeCard';
import ListsCard from '../../../components/common/ListsCard';
import Search from '../../../components/common/Search';
import { driverApplicationActions } from '../../../apis/actions';
import { driverApplicationMutations } from '../../../redux/mutations';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/global/Loading';
import Canvas from '../../../components/common/Canvas';

import './DeliveryApplicationList.scss';

const DeliveryList = () => {
  const dispatch = useDispatch();
  const { driverApplications } = useSelector((state) => state.driverApplication);

  useEffect(() => {
    document.title = 'DriverApplications • Admin Panel';
    dispatch(driverApplicationMutations.setDriverApplications(null));
    dispatch(driverApplicationActions.getDriverApplications());
  }, [dispatch]);


  let cards = [
    { title: 'Driver Applications', content: 0, icon: "bi bi-truck orange" },
    { title: 'Approved  Driver Applications', content: 0, icon: "bi bi-truck orange" },
    { title: 'Rejected  Driver Applications', content: 0, icon: "bi bi-truck orange" },
    { title: 'Pending   Driver Applications', content: 0, icon: "bi bi-truck orange" },
  ];

  let content = <Loading />;

  if (driverApplications !== null && driverApplications.length === 0) {
    content = <p>Found no Driver Applications.</p>;
  }

  if (driverApplications !== null && driverApplications.length > 0) {
    const numberOfdriverApplications = driverApplications.length;
    const activedriverApplications = driverApplications.filter(driverApplication => driverApplication.status === 'Approved').length;
    const inactivedriverApplications = driverApplications.filter(driverApplication => driverApplication.status === 'Rejected').length;
    const penddingriverApplications = driverApplications.filter(driverApplication => driverApplication.status === 'Pending').length;

    if (driverApplications && driverApplications.length > 0) {
      const sorteddriverApplications = [...driverApplications].sort((a, b) => a.name.localeCompare(b.name)); // Sort driverApplications by name

      content = sorteddriverApplications.map((driverApplication, index) => {
        return (
          <ListsCard key={index}>
            <Link to={`/drivers/driverApplications/${driverApplication._id}`} className='link pointer full-width flex-row-left-start2col'>
              <div className='flex-row-left-start full-width'>
                <div className='lists-card--img radius-circular flex-row-left-start'>
                  {driverApplication.img === 'No Image' ?
                    <Canvas name={driverApplication.name} />
                    :
                    <img src={driverApplication.img} className='white-bg' alt="" />
                  }
                  <div className={`lists-status ${driverApplication.status === 'Approved' ? 'green-bg' : (driverApplication.status === 'Pending' ? 'yellow-bg' : 'red-bg')} radius-circular`}></div>
                </div>
                <div className='lists-card--info gray pointer shadow-5px size-16px margin-10px-V inter radius-15px white-bg full-width flex-row-left-start2col'>
                  <div className='width-35-100 margin-2px-V'>
                    <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Name: </span>{driverApplication.name}
                  </div>
                  <div className='width-45-100 margin-2px-V'>
                    <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Phone: </span>{driverApplication.phoneNum}
                  </div>
                  <div className='width-20-100 margin-2px-V font-bold'>
                    <span className='lists-card--info--disc--hide margin-2px-H font-bold'>Vehicle Type </span>
                    <div className='flex-row-left-start'>
                      <span className='margin-2px-H'>{driverApplication.vehicle.vehicleType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </ListsCard>
        );
      });

      cards = [
        { title: 'Driver Applications', content: numberOfdriverApplications, icon: "bi bi-truck orange" },
        { title: 'Approved Driver Applications', content: activedriverApplications, icon: "bi bi-truck orange" },
        { title: 'Rejected Driver Applications', content: inactivedriverApplications, icon: "bi bi-truck orange" },
        { title: 'Pending Driver Applications', content: penddingriverApplications, icon: "bi bi-truck orange" },
      ];
    }
  }

  return (
    <div className="delivery full-width" >
      <div className="delivery--braud-cramb gray inter size-16px font-bold">
        Driver Applications
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
      </div>
      <div className='flex-row-left-start'>
        <Search width={'width-90-100'} />
      </div>
      <div className='flex-col-left-start inter gray'>
        {content}
      </div>
    </div>
  )
}

export default DeliveryList;