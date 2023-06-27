import React, { useEffect, useState } from 'react';
import ListsCard from '../../../components/common/ListsCard';
import Search from '../../../components/common/Search';

import { useDispatch, useSelector } from 'react-redux';
import { logActivityMutations } from '../../../redux/mutations';
import { logActivityActions } from '../../../apis/actions';
import Loading from '../../../components/global/Loading';

import './LogActivity.scss';

const LogActivity = () => {
  const dispatch = useDispatch();
  const logs = useSelector(state => state.log.logs);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    document.title = 'Log Activity • Admin Panel';

    dispatch(logActivityMutations.setLogs(null));
  }, [dispatch]);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setOffset((prevOffset) => prevOffset + 10);
      }
    }

    window.addEventListener('scroll', handleScroll);

    setIsLoading(true);
    setShowLoading(true);

    dispatch(logActivityActions.getAllLogs(offset)).then(() => {
      setIsLoading(false);
      setShowLoading(false);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, offset]);

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
          <div className='flex-row-left-start full-width'>
            <div className='lists-card--info gray shadow-5px size-16px margin-10px-V inter radius-15px white-bg full-width flex-row-left-start2col'>
              <div className='width-25-100 margin-2px-V'>
                <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Name: </span>{log.user.name}
              </div>
              <div className='width-10-100 margin-2px-V orange'>
                <span className='lists-card--info--disc--hide margin-6px-H font-bold gray'>Role: </span>{log.user.role.toUpperCase()}
              </div>
              <div className='width-45-100 margin-2px-V'>
                <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Action: </span>{log.action}
              </div>
              <div className='width-20-100 margin-2px-V'>
                <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Time stamp: </span>{new Date(log.createdAt.toLocaleString("en-US", { timeZone: "Africa/Cairo" })).toLocaleString("en-US", {
                  timeZone: "Africa/Cairo",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            </div>
          </div>
        </ListsCard>
      );
    });
  }

  let content = (
    <>
      {logs !== null && logs.length === 0 && (
        <div className='gray inter size-16px font-bold'>No logs found</div>
      )}

      {logs !== null && logs.length > 0 && (
        <>
          {cards}
          {showLoading && <Loading />}
        </>
      )}

      {isLoading && !showLoading && <Loading />}
    </>
  );

  return (
    <div className={`log-activity full-width ${showLoading ? 'loading' : ''}`}>
      <div className="log-activity--braud-cramb gray inter size-16px font-bold">
        Log Activity
      </div>

      <Search width={'full-width'} page={'Logs'} onSearch={handleSearch} />

      <div className='flex-col-left-start full-width inter gray'>
        <div className='log-activity--list-header full-width flex-row-left-start margin-2px-V'>
          <div className='width-25-100 flex-row-left-start font-bold size-14px' style={{ marginLeft: '-45px' }}>Name</div>
          <div className='width-10-100 flex-row-left-start font-bold size-14px'>Role</div>
          <div className='width-45-100 flex-row-left-start font-bold size-14px'>Action</div>
          <div className='width-20-100 flex-row-left-start font-bold size-14px' style={{ marginLeft: '10px' }}>Time stamp</div>
        </div>

        {content}
      </div>
    </div>
  )
}


export default LogActivity;