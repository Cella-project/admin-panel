import React, { useState } from 'react';

import ChangeInfo from '../../../components/profile/ChangeInfo';
import ChangePassword from '../../../components/profile/ChangePassword';
import Canvas from '../../../components/common/Canvas';

import { useDispatch, useSelector } from 'react-redux';

import { authActions, logActivityActions } from '../../../apis/actions';

import { useEffect } from 'react';

import OrangeCard from '../../../components/common/OrangeCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ListsCard from '../../../components/common/ListsCard';
import LogActivityCard from '../../../components/logActivity/LogActivityCard';
import { logActivityMutations } from '../../../redux/mutations';
import { Link } from 'react-router-dom';


import './Profile.scss';
import Loading from '../../../components/global/Loading';

const Profile = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const mode = useSelector((state) => state.theme.mode);
    const logs = useSelector((state) => state.log.logs);

    const [adminIMG, setAdminIMG] = useState(userData.img);
    const [editIMG, setEditIMG] = useState(false);

    useEffect(() => {
        document.title = 'Profile • Admin Panel';

        dispatch(authActions.getProfile());
        dispatch(logActivityMutations.setLogs(null));
        dispatch(logActivityActions.getAdminLogs(userData._id, 0));
    }, [dispatch, userData._id]);

    const uploadImg = async (e) => {
        setEditIMG(true);
        const data = new FormData();
        data.append('path', 'admin/profile');
        data.append('file', e.target.files[0]);

        dispatch(authActions.changeProfileImage(data, (response) => {
            setAdminIMG('http://www.actore.store/api/file-manager/file/' + response.data.data);
        }))
    }

    const handleChangeIMG = async () => {
        dispatch(authActions.editProfile({
            _id: userData._id,
            img: adminIMG,
        }, () => setEditIMG(false)));
    }

    const handleCancelIMG = () => {
        setAdminIMG(userData.img);
        setEditIMG(false);
    }

    if (userData === null) return (<Loading />);

    return (
        <div className="profile full-width" >
            <div className="profile--braud-cramb inter gray size-16px font-bold">
                Profile
            </div>
            <div className='full-width flex-col-top-start'>
                <div className='profile--content width-70-100 flex-col-top-start'>
                    <div className='profile--img flex-col-center radius-circular'>
                        {adminIMG === 'NO IMAGE' ?
                            <Canvas name={userData.name} borderRadius='50%' width={55} height={55} fontSize={'42px'} /> :
                            <img src={adminIMG} className='white-bg' alt='' />
                        }
                    </div>
                    <div className='profile--change-img flex-row-center radius-circular'>
                        <label className='full-width size-16px' htmlFor='profile-picture'>
                            <div className='full-width profile--change-img--tag flex-row-center white-bg gray open-sans pointer'>
                                <i className="bi bi-camera size-16px margin-4px-H" />
                                Change Picture
                                <input type="file" id='profile-picture' onChange={uploadImg} />
                            </div>
                        </label>
                    </div>
                    {editIMG &&
                        <>
                            <button
                                className={`profile--btn shadow-2px width-50-100 ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg font-bold size-20px pointer margin-12px-V`}
                                onClick={handleChangeIMG}
                            >Save</button>
                            <button
                                className={`profile--btn shadow-2px width-50-100 ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg font-bold size-20px pointer`}
                                onClick={handleCancelIMG}
                            >Cancel</button>
                        </>
                    }

                    <ChangeInfo />

                    <ChangePassword />

                    <OrangeCard title="Log Activities">
                        <PerfectScrollbar className="profile--scroll--cont full-width flex-col-top-start">
                            {(logs && logs.length > 0) ?
                                <div className='flex-col-left-start full-width inter gray'>
                                    <div className='log-activity--list-header full-width flex-row-left-start margin-2px-V'>
                                        <div className='width-25-100 flex-row-left-start font-bold size-14px' style={{ marginLeft: '-45px' }}>Name</div>
                                        <div className='width-10-100 flex-row-left-start font-bold size-14px'>Role</div>
                                        <div className='width-45-100 flex-row-left-start font-bold size-14px'>Action</div>
                                        <div className='width-20-100 flex-row-left-start font-bold size-14px' style={{ marginLeft: '10px' }}>Time stamp</div>
                                    </div>
                                    {logs
                                        .slice(0, 5)
                                        .map((log) => {
                                            return (
                                                <ListsCard key={log._id} width="full-width">
                                                    <LogActivityCard log={log} />
                                                </ListsCard>
                                            )
                                        })}
                                </div>
                                : <p className="gray inter size-16px font-bold">No logs to display</p>
                            }
                        </PerfectScrollbar>
                        <Link to={`/admin-panel/logActivities?admin=${userData._id}`} className="pointer lists-card--link">
                            <i className="bi bi-arrow-right flex-row-right-start"></i>
                        </Link>
                    </OrangeCard>
                </div>

            </div >
        </div >
    )
}

export default Profile;