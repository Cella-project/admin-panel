import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { notificationActions } from '../../apis/actions';

import './Announcement.scss';

const Announcement = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.theme.mode);
    const [roles, setRoles] = useState([]); // Store roles as a state variable
    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;

        if (roles.includes(selectedRole)) {
            // If the role is already in the array, remove it
            const updatedRoles = roles.filter((role) => role !== selectedRole);
            setRoles(updatedRoles);
        } else {
            // If the role is not in the array, add it
            const updatedRoles = [...roles, selectedRole];
            setRoles(updatedRoles);
        }
    };

    const {
        value: enteredSubject,
        error: subjectError,
        isTouched: subjectIsTouched,
        valueChangeHandler: subjectChangedHandler,
        inputBlurHandler: subjectBlurHandler,
        reset: resetSubjectInput,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length > 0;
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter an Subject.';
        } else if (value.length < 0) {
            error = 'Please enter a valid Subject.';
        }
        return { isValid, error };
    });

    const {
        value: enteredBody,
        error: bodyError,
        isTouched: bodyIsTouched,
        valueChangeHandler: bodyChangedHandler,
        inputBlurHandler: bodyBlurHandler,
        reset: resetBodyInput,
    } = useInput((value) => {
        const isValid = value.trim() !== '';
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter a Body.';
        }
        return { isValid, error };
    });


    const formSubmissionHandler = (e) => {
        e.preventDefault();

        // Here, we can filter out the selected roles based on the checked checkboxes
        const selectedRoles = ['admins', 'stores', 'drivers', 'customers'].filter((r) =>
            roles.includes(r)
        );
        const msg = {
            subject: enteredSubject,
            body: enteredBody,
        }

        // Check if any roles are selected
        if (selectedRoles.length === 0) {
            return;
        }
        if (selectedRoles.includes('admins')) {
            dispatch(notificationActions.sendNotificationToAdmins(msg));
        }

        if (selectedRoles.includes('stores')) {
            console.log('stores');
            console.log(msg);
            dispatch(notificationActions.sendNotificationToStores(msg));

        }

        if (selectedRoles.includes('drivers')) {
            dispatch(notificationActions.sendNotificationToDrivers(msg));
        }

        if (selectedRoles.includes('customers')) {
            dispatch(notificationActions.sendNotificationToCustomers(msg));
        }

        // Reset form inputs
        resetSubjectInput();
        resetBodyInput();
        // Close the popup or do other necessary actions
        popupToggle(false);
        document.getElementById('dashboard-view').style.zIndex = 10;
        window.onscroll = function () { };
    };


    return (
        <form noValidate className="announcement full-width" onSubmit={formSubmissionHandler}>
            <div className="full-width flex-col-left-start announcement--input-container">
                <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="ForRoles" >
                    Roles <span className='red'> *</span>
                </label>
                <div className={`full-width gray radius-10px flex-col-left-start flex-wrap`}>
                    <div className="full-width flex-col-left-start">
                        <div className="full-width flex-col-left-start">
                            <div>
                                <input
                                    className="pointer margin-12px-H"
                                    type="checkbox"
                                    id="admins"
                                    name="Role"
                                    value="admins"
                                    checked={roles.includes('admins')}
                                    onChange={handleRoleChange}
                                />
                                <label className='pointer' htmlFor="admins">All Admins</label>
                            </div>
                            <div>
                                <input
                                    className="pointer margin-12px-H"
                                    type="checkbox"
                                    id="stores"
                                    name="Role"
                                    value="stores"
                                    checked={roles.includes('stores')}
                                    onChange={handleRoleChange}
                                />
                                <label className='pointer' htmlFor="stores">All Stores</label>
                            </div>
                            <div>
                                <input
                                    className="pointer margin-12px-H"
                                    type="checkbox"
                                    id="drivers"
                                    name="Role"
                                    value="drivers"
                                    checked={roles.includes('drivers')}
                                    onChange={handleRoleChange}
                                />
                                <label className='pointer' htmlFor="drivers">All Drivers</label>
                            </div>
                            <div>
                                <input
                                    className="pointer margin-12px-H"
                                    type="checkbox"
                                    id="customers"
                                    name="Role"
                                    value="customers"
                                    checked={roles.includes('customers')}
                                    onChange={handleRoleChange}
                                />
                                <label className='pointer' htmlFor="customers">All Customers</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="full-width flex-col-left-start announcement--input-container">
                <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="subject" >
                    Subject <span className='red'> *</span>
                </label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start announcement--input`}>
                    <i className="bi bi-announcement size-20px" />
                    <input
                        className="full-width gray margin-4px-H"
                        type={"text"}
                        placeholder={"Subject"}
                        id={"subject"}
                        value={enteredSubject}
                        onChange={subjectChangedHandler}
                        onBlur={subjectBlurHandler}
                        autoFocus
                    />
                </div>
                {subjectIsTouched && (
                    <div className='error-message'>{subjectError}</div>
                )}
            </div>
            <div className='full-width flex-col-left-start announcement--input-container'>
                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>Body <span className='red'>*</span></label>
                <div className={`full-width light-gray radius-10px white-bg flex-row-left-start announcement--input`}>
                    <textarea
                        className='full-width gray margin-4px-H'
                        type={'text'}
                        placeholder={'Body'}
                        id={'body'}
                        value={enteredBody}
                        onChange={bodyChangedHandler}
                        onBlur={bodyBlurHandler}
                        style={{ resize: 'none' }} // disable resizing
                    />
                </div>
                {bodyIsTouched && (<div className="error-message">{bodyError}</div>)}
            </div>
            <div className="announcement--actions flex-row-between full-width">
                <button
                    className={`announcement--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                    type='submit'
                >
                    Confirm
                </button>
                <button
                    className="announcement--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                    onClick={() => {
                        resetSubjectInput();
                        popupToggle(false);
                        document.getElementById("dashboard-view").style.zIndex = 10;
                        window.onscroll = function () { }
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default Announcement;