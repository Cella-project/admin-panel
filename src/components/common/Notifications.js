import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../global/Loading';

import './Notifications.scss';
import { notificationMutations } from '../../redux/mutations';
import { notificationActions } from '../../apis/actions';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Notifications = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notification.notifications);

    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const [notificationsShown, setNotificationsShown] = useState(false);

    const mode = useSelector(state => state.theme.mode);

    let menuRef = useRef();

    useEffect(() => {
        let mouseHandler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setNotificationsShown(false);
            }
        };

        let keyboardHandler = (e) => {
            if (e.key === "Escape") {
                setNotificationsShown(false);
            }
        }

        document.addEventListener('mousedown', mouseHandler);
        document.addEventListener('keydown', keyboardHandler);

        return () => {
            document.removeEventListener('mousedown', mouseHandler);
            document.removeEventListener('keydown', keyboardHandler);
        }
    });

    const getTimeSinceCreation = (createdAt) => {
        const notificationDate = new Date(createdAt);
        const currentDate = new Date();

        const timeDiff = currentDate.getTime() - notificationDate.getTime();
        const secondsDiff = Math.floor(timeDiff / 1000);
        const minutesDiff = Math.floor(secondsDiff / 60);
        const hoursDiff = Math.floor(minutesDiff / 60);
        const daysDiff = Math.floor(hoursDiff / 24);

        if (daysDiff >= 10) {
            return notificationDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } else if (daysDiff >= 1) {
            return `${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago`;
        } else if (hoursDiff >= 1) {
            return `${hoursDiff} ${hoursDiff === 1 ? 'hour' : 'hours'} ago`;
        } else if (minutesDiff >= 1) {
            return `${minutesDiff} ${minutesDiff === 1 ? 'minute' : 'minutes'} ago`;
        } else {
            return `${secondsDiff} ${secondsDiff === 1 ? 'second' : 'seconds'} ago`;
        }
    }

    const handleScroll = (e) => {
        if (e.scrollTop + e.clientHeight >= e.scrollHeight) {
            setOffset(prevOffset => prevOffset + 5);
        }
    };

    useEffect(() => {
        if (offset > 0) {
            setLoading(true);
            dispatch(notificationActions.getAllNotifications(offset)).then(() => {
                setLoading(false);
            });
        }
    }, [offset, dispatch]);

    useEffect(() => {
        if (notificationsShown) {
            setLoading(true);
            dispatch(notificationMutations.setNotifications(null));
            dispatch(notificationActions.getAllNotifications(0)).then(() => {
                setLoading(false);
            });
        }
        if (!notificationsShown) {
            dispatch(notificationMutations.setNotifications(null));
            setOffset(0);
        }
    }, [notificationsShown, dispatch]);


    let content = loading && <Loading />;

    if (notifications !== null) {
        if (notifications.length === 0) {
            content =
                <div className='full-width flex-row-center'>
                    <p className={`space-none pt-sans ${mode === 'dark-mode' ? 'gray' : 'gray'}`}>No notifications</p>
                </div>
        } else if (notifications.length > 0) {
            content =
                <>
                    {notifications.map((notification) => {
                        return (
                            <div key={notification._id} className='notifications--menu--item full-width flex-row-between open-sans'>
                                <div className='notifications--icon flex-row-center'>
                                    <i className={`bi bi-bell ${mode === 'dark-mode' ? 'gray' : 'gray'} size-30px`} />
                                </div>
                                <div className='full-width flex-col-left-start'>
                                    <div className='full-width flex-row-between'>
                                        <div className='notifications--menu--item--subject flex-row-center size-18px font-bold pt-sans'>
                                            <p className={`space-none pt-sans ${mode === 'dark-mode' ? 'gray' : 'gray'}`}>{notification.subject}</p>
                                        </div>
                                        <div className='notifications--menu--item--date flex-row-center size-12px inter'>
                                            <p className={`space-none pt-sans baby-blue`}>
                                                {getTimeSinceCreation(notification.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='notifications--menu--item--body flex-row-left-start size-14px'>
                                        <p className={`space-none pt-sans ${mode === 'dark-mode' ? 'gray' : 'gray'}`}>{notification.body}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                    {loading && <Loading />}
                </>
        }
    }

    return (
        <div ref={menuRef} className='notifications flex-row-center radius-15px margin-6px-H white-bg shadow-2px'>
            <div className='notifications--icon flex-row-center pointer full-width' onClick={setNotificationsShown.bind(null, !notificationsShown)} >
                <i className={`bi bi-bell ${mode === 'dark-mode' ? 'gray' : 'orange'} size-22px`} />
                <div className={`notifications--icon--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
                    Notifications
                </div>
            </div>
            {notificationsShown &&
                <>
                    <i className={`bi bi-caret-up-fill ${mode === 'dark-mode' ? 'white' : 'white'} size-14px`} />
                    <div className='notifications--menu flex-col-center white-bg radius-15px'>
                        <div className='notifications--menu--header full-width flex-row-left-start'>
                            <h2 className={`space-none pt-sans ${mode === 'dark-mode' ? 'gray' : 'gray'}`}>Notifications</h2>
                        </div>
                        <PerfectScrollbar className={`notifications--scroll-cont full-width ${loading ? 'loading' : ''}`} onScrollY={handleScroll}>
                            {content}
                        </PerfectScrollbar>
                    </div>
                </>
            }
        </div>
    )
}

export default Notifications;