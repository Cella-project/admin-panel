import React, { useEffect, useState } from 'react';
import ListsCard from '../../../components/common/ListsCard';
import Search from '../../../components/common/Search';

import { useDispatch, useSelector } from 'react-redux';
import { driverMutations, logActivityMutations, storeMutations } from '../../../redux/mutations';
import { authActions, driverActions, logActivityActions, storeActions } from '../../../apis/actions';
import Loading from '../../../components/global/Loading';
import LogActivityCard from '../../../components/logActivity/LogActivityCard';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import './LogActivity.scss';

const LogActivity = () => {
  const dispatch = useDispatch();
  const logs = useSelector(state => state.log.logs);
  const driverData = useSelector(state => state.driver.driverData);
  const storeData = useSelector(state => state.store.storeData);
  const userData = useSelector(state => state.auth.userData);

  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const storeID = searchParams.get('store');
  const driverID = searchParams.get('driver');
  const adminID = searchParams.get('admin');

  useEffect(() => {
    document.title = 'Log Activity • Admin Panel';

    dispatch(logActivityMutations.setLogs(null));

    if (storeID) {
      dispatch(storeMutations.setStoreData(null));
      dispatch(storeActions.getStoreData(storeID));
    }
    if (driverID) {
      dispatch(driverMutations.setDriverData(null));
      dispatch(driverActions.getDriverData(driverID));
    }
    if (adminID) {
      dispatch(authActions.getProfile());
    }
  }, [dispatch, storeID, driverID, adminID]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setOffset((prevOffset) => prevOffset + 10);
      }
    }

    window.addEventListener('scroll', handleScroll);

    setIsLoading(true);
    setShowLoading(true);

    if (storeID) {
      dispatch(logActivityActions.getStoreLogs(storeID, offset)).then(() => {
        setIsLoading(false);
        setShowLoading(false);
      });
    } else if (driverID) {
      dispatch(logActivityActions.getDriverLogs(driverID, offset)).then(() => {
        setIsLoading(false);
        setShowLoading(false);
      });
    } else if (adminID) {
      dispatch(logActivityActions.getAdminLogs(adminID, offset)).then(() => {
        setIsLoading(false);
        setShowLoading(false);
      });
    } else {
      dispatch(logActivityActions.getAllLogs(offset)).then(() => {
        setIsLoading(false);
        setShowLoading(false);
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, offset, storeID, driverID, adminID]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const handleSearch = (query, type, filter) => {
    setSearchQuery(query);
    setSearchType(type);
    setSearchStatus(filter.status);
  };

  let cards = <Loading />;

  if (logs !== null && logs.length > 0) {
    let filteredLogs = logs;

    if (searchQuery !== '') {
      if (searchType === 'all') {
        filteredLogs = filteredLogs.filter(log =>
          (log.user.name + log.user.role + log.action + log.user.email).toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        filteredLogs = filteredLogs.filter(log =>
          log.user[searchType]?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }

    if (searchStatus !== '' && searchStatus !== 'all') {
      filteredLogs = filteredLogs.filter(log => {
        return (
          searchQuery === '' ? log.user.role === searchStatus :
            (log.user.role === searchStatus &&
              (searchType === 'all' ?
                (log.user.name + log.user.role + log.action + log.user.email).toLowerCase().includes(searchQuery.toLowerCase()) :
                log.user[searchType]?.toLowerCase().includes(searchQuery.toLowerCase())
              ))
        )
      });
    }

    cards = filteredLogs.map((log) => {
      return (
        <ListsCard key={log._id} width={'full-width'}>
          <LogActivityCard log={log} role={true} />
        </ListsCard>
      );
    });
  }

  let content = (
    <>
      {(logs !== null && logs.length === 0) ? (
        <div className='gray inter size-16px font-bold'>No logs found</div>
      ) : (logs !== null && logs.length > 0) ? (
        <>
          <div className='log-activity--list-header full-width flex-row-left-start margin-2px-V'>
            <div className='width-25-100 flex-row-left-start font-bold size-14px'>Name</div>
            <div className='width-10-100 flex-row-left-start font-bold size-14px'>Role</div>
            <div className='width-45-100 flex-row-left-start font-bold size-14px'>Action</div>
            <div className='width-20-100 flex-row-left-start font-bold size-14px'>Time stamp</div>
          </div>
          {cards}
          {showLoading && <Loading />}
        </>
      ) : (
        <Loading />
      )
      }
      {isLoading && !showLoading && <Loading />}
    </>
  );

  let braudCramb = 'Log Activities';

  if (logs !== null) {
    if (storeID && storeData) {
      braudCramb =
        <>
          <Link to={'/admin-panel/logActivities'} className='gray pointer lists-card--link'
            onClick={() => {
              dispatch(logActivityMutations.setLogs(null))
              dispatch(logActivityActions.getAllLogs(0))
            }}>Log Activities</Link>
          <span> / </span>
          <span>{storeData.storeName}</span>
        </>
    } else if (driverID && driverData) {
      braudCramb =
        <>
          <Link to={'/admin-panel/logActivities'} className='gray pointer lists-card--link'
            onClick={() => {
              dispatch(logActivityMutations.setLogs(null))
              dispatch(logActivityActions.getAllLogs(0))
            }}>Log Activities</Link>
          <span> / </span>
          <span>{driverData.name}</span>
        </>
    } else if (adminID && userData) {
      braudCramb =
        <>
          <Link to={'/admin-panel/logActivities'} className='gray pointer lists-card--link'
            onClick={() => {
              dispatch(logActivityMutations.setLogs(null))
              dispatch(logActivityActions.getAllLogs(0))
            }}>Log Activities</Link>
          <span> / </span>
          <span>{userData.name}</span>
        </>
    }
  }

  return (
    <div className={`log-activity full-width ${showLoading ? 'loading' : ''}`}>
      <div className="log-activity--braud-cramb gray inter size-16px font-bold">
        {braudCramb}
      </div>

      <Search width={'full-width'} page={'Logs'} onSearch={handleSearch} />

      <div className='flex-col-left-start full-width inter gray'>
        {content}
      </div>
    </div>
  )
}

export default LogActivity;