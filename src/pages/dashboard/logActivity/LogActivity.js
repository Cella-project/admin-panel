import React, { useEffect } from 'react';
import ListsCard from '../../../components/common/ListsCard';
import Search from '../../../components/common/Search';

import './LogActivity.scss';

const LogActivity = () => {
  const activityCards = [
    { name: 'Admin admin', type: <i className="bi bi-shop-window mint-green icon white size-30px" />, timeStamp: new Date().toLocaleString(), action: 'Change the Statue of Customer #aertsa12 from Active to suspended' },
    { name: 'Admin admin', type: <i className="bi bi-people mint-green icon white size-30px" />, timeStamp: new Date().toLocaleString(), action: 'Change the profile picture' },
    { name: 'Admin admin', type: <i className="bi bi-shop-window mint-green icon white size-30px" />, timeStamp: new Date().toLocaleString(), action: 'Change the Statue of Customer #aertsa12 from Active to suspended' },
    { name: 'Admin admin', type: <i className="bi bi-people mint-green icon white size-30px" />, timeStamp: new Date().toLocaleString(), action: 'Change the profile picture' },
    { name: 'Admin admin', type: <i className="bi bi-shop-window mint-green icon white size-30px" />, timeStamp: new Date().toLocaleString(), action: 'Change the Statue of Customer #aertsa12 from Active to suspended' },
    { name: 'Admin admin', type: <i className="bi bi-people mint-green icon white size-30px" />, timeStamp: new Date().toLocaleString(), action: 'Change the profile picture', },
  ]

  useEffect(() => {
    document.title = 'Log Activity • Admin Panel';
  }, []);

  return (
    <div className="log-activity full-width" >
      <div className="log-activity--braud-cramb gray inter size-16px font-bold">
        Log Activity
      </div>

      <Search width={'full-width'} />

      <div className='flex-col-left-start full-width inter gray'>
        <div className='log-activity--list-header full-width flex-row-left-start margin-2px-V'>
          <div className='width-25-100 flex-row-left-start font-bold size-14px' style={{ marginLeft: '-45px' }}>Name</div>
          <div className='width-10-100 flex-row-left-start font-bold size-14px'>Type</div>
          <div className='width-45-100 flex-row-left-start font-bold size-14px'>Action</div>
          <div className='width-20-100 flex-row-left-start font-bold size-14px' style={{ marginLeft: '10px' }}>Time stamp</div>
        </div>

        {
          activityCards.map((activityCard, index) => {
            return (
              <ListsCard key={index} width={'full-width'} >
                <div className='flex-row-left-start full-width'>
                  <div className='lists-card--img radius-circular flex-row-left-start'>
                    {activityCard.img}
                  </div>
                  <div className='lists-card--info gray shadow-5px size-16px margin-10px-V inter radius-15px white-bg full-width flex-row-left-start2col'>
                    <div className='width-25-100 margin-2px-V'>
                      <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Name: </span>{activityCard.name}
                    </div>
                    <div className='width-10-100 margin-2px-V'>
                      <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Type: </span>{activityCard.type}
                    </div>
                    <div className='width-45-100 margin-2px-V'>
                      <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Action: </span>{activityCard.action}
                    </div>
                    <div className='width-20-100 margin-2px-V'>
                      <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Time stamp: </span>{activityCard.timeStamp}
                    </div>
                  </div>
                </div>
              </ListsCard>
            )
          })
        }
      </div>
    </div>
  )
}


export default LogActivity;