import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { specialityActions, storeApplicationActions } from '../../apis/actions';
import { specialityMutations } from '../../redux/mutations';
import PhoneInput from 'react-phone-number-input';
import useInput from '../../hooks/useInput';
import Select from 'react-select';

import './EditStoreApplicationForm.scss';

const EditStoreApplicationForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const storeApplicationData = useSelector(state => state.storeApplication.storeApplicationData);
    const specialties = useSelector((state) => state.speciality.specialties);
    const specialtyRef = useRef({
        id: storeApplicationData.speciality._id,
        title: storeApplicationData.speciality.title,
    });

    const mode = useSelector((state) => state.theme.mode);

    useEffect(() => {
        dispatch(specialityMutations.setSpecialties(null));
        dispatch(specialityActions.getSpecialties());
    }, [dispatch]);

    const {
        value: enteredOwnerName,
        isValid: enteredOwnerNameIsValid,
        error: ownerNameError,
        isTouched: ownerNameIsTouched,
        valueChangeHandler: ownerNameChangedHandler,
        inputBlurHandler: ownerNameBlurHandler,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter a full name.';
        } else if (value.length < 3 || value.length > 50) {
            error = 'Please enter a full name between 3 and 50 characters.';
        }
        return { isValid, error };
    }, storeApplicationData.owner.name);

    const {
        value: enteredOwnerEmail,
        isValid: enteredOwnerEmailIsValid,
        error: ownerEmailError,
        isTouched: ownerEmailIsTouched,
        valueChangeHandler: ownerEmailChangedHandler,
        inputBlurHandler: ownerEmailBlurHandler,
    } = useInput((value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = regex.test(value);
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter an ownerEmail address.';
        } else if (!isValid) {
            error = 'Please enter a valid ownerEmail address.';
        }
        return { isValid, error };
    }, storeApplicationData.owner.email);

    const {
        value: enteredOwnerPhone,
        isValid: enteredOwnerPhoneIsValid,
        error: ownerPhoneError,
        isTouched: ownerPhoneIsTouched,
        valueChangeHandler: ownerPhoneChangedHandler,
        inputBlurHandler: ownerPhoneBlurHandler,
    } = useInput((value) => {
        let error = '';
        let isValid = true;
        if (!value) {
            error = 'Phone number is required';
            isValid = false;
        } else if (value.length < 13) {
            error = 'Please enter a valid phone number';
            isValid = false;
        }
        return { error, isValid };
    }, '+2' + storeApplicationData.owner.phoneNum);

    const {
        value: enteredStoreName,
        isValid: enteredStoreNameIsValid,
        error: storeNameError,
        isTouched: storeNameIsTouched,
        valueChangeHandler: storeNameChangedHandler,
        inputBlurHandler: storeNameBlurHandler,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter a store name.';
        } else if (value.length < 3 || value.length > 50) {
            error = 'Please enter a store name between 3 and 50 characters.';
        }
        return { isValid, error };
    }, storeApplicationData.storeName);

    const {
        value: enteredSlogan,
        isValid: enteredSloganIsValid,
        error: sloganError,
        isTouched: sloganIsTouched,
        valueChangeHandler: sloganChangedHandler,
        inputBlurHandler: sloganBlurHandler,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter a slogan.';
        } else if (value.length < 3 || value.length > 50) {
            error = 'Please enter a slogan between 3 and 50 characters.';
        }
        return { isValid, error };
    }, storeApplicationData.slogan);

    const {
        value: enteredSpeciality,
        isValid: enteredSpecialityIsValid,
        error: specialityError,
        isTouched: specialityIsTouched,
        valueChangeHandler: specialityChangedHandler,
        inputBlurHandler: specialityBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please select a speciality.';
        }
        return { isValid, error };
    }, storeApplicationData.speciality.title);

    const ownerNameClasses = ownerNameIsTouched && !enteredOwnerNameIsValid
        ? 'form-control-invalid'
        : '';
    const ownerEmailClasses = ownerEmailIsTouched && !enteredOwnerEmailIsValid
        ? 'form-control-invalid'
        : '';
    const ownerPhoneClasses = ownerPhoneIsTouched && !enteredOwnerPhoneIsValid
        ? 'form-control-invalid'
        : '';
    const storeNameClasses = storeNameIsTouched && !enteredStoreNameIsValid
        ? 'form-control-invalid'
        : '';
    const sloganClasses = sloganIsTouched && !enteredSloganIsValid
        ? 'form-control-invalid'
        : '';
    const specialityClasses = specialityIsTouched && !enteredSpecialityIsValid
        ? 'form-control-invalid'
        : '';

    const formSubmissionHandler = async (event) => {
        event.preventDefault();

        const updatedData = {};

        if (enteredOwnerName.trim() !== storeApplicationData.owner.name) {
            updatedData.owner = {
                name: enteredOwnerName.trim()
            };
        }

        if (enteredOwnerEmail.trim() !== storeApplicationData.owner.email) {
            updatedData.owner = {
                email: enteredOwnerEmail.trim()
            };
        }

        if (enteredOwnerPhone && storeApplicationData.owner.phoneNum && enteredOwnerPhone.replace("+2", "") !== storeApplicationData.owner.phoneNum.replace("+20", "")) {
            updatedData.owner = {
                phoneNum: enteredOwnerPhone.replace("+2", "")
            }
        }

        if (enteredStoreName.trim() !== storeApplicationData.storeName) {
            updatedData.storeName = enteredStoreName.trim();
        }

        if (enteredSlogan.trim() !== storeApplicationData.slogan) {
            updatedData.slogan = enteredSlogan.trim();
        }

        if (specialtyRef.current.id !== storeApplicationData.speciality._id) {
            updatedData.speciality = {
                _id: specialtyRef.current.id,
                title: specialtyRef.current.title
            };
        }

        dispatch(storeApplicationActions.updateStoreApplication({
            ...updatedData, _id: storeApplicationData._id
        }, () => {
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { };
        }));
    };


    return (
        <form noValidate className='edit-store-application' onSubmit={formSubmissionHandler}>
            <div className='full-width flex-col-center edit-store-application--input-container'>
                <div className='full-width flex-col-left-start edit-store-application--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='ownerName'>Owner Name</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-store-application--input ${ownerNameClasses}`}>
                        <i className='bi bi-person size-20px' />
                        <input
                            className='full-width gray margin-4px-H'
                            type={'text'}
                            placeholder={'Owenr full name'}
                            id={'name'}
                            value={enteredOwnerName}
                            onChange={ownerNameChangedHandler}
                            onBlur={ownerNameBlurHandler}
                            autoFocus
                        />
                    </div>
                    {ownerNameIsTouched && (<div className="error-message">{ownerNameError}</div>)}
                </div>
                <div className='full-width flex-col-left-start edit-store-application--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='ownerEmail'>Owner Email</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-store-application--input ${ownerEmailClasses}`}>
                        <i className='bi bi-envelope size-20px' />
                        <input className='full-width gray margin-4px-H'
                            type={'email'}
                            placeholder={'Owner email'}
                            id={'ownerEmail'}
                            value={enteredOwnerEmail}
                            onChange={ownerEmailChangedHandler}
                            onBlur={ownerEmailBlurHandler}
                        />
                    </div>
                    {ownerEmailIsTouched && (<div className="error-message">{ownerEmailError}</div>)}
                </div>
                <div className='full-width flex-col-left-start edit-store-application--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='phone'>Phone Number</label>
                    <PhoneInput
                        className={`full-width gray radius-10px white-bg flex-row-left-start edit-store-application--input ${ownerPhoneClasses}`}
                        id={'phoneNum'}
                        value={enteredOwnerPhone}
                        countryCallingCodeEditable={false}
                        limitMaxLength
                        countrySelectProps={{ unicodeFlags: true }}
                        defaultCountry={'EG'}
                        onChange={(phone) =>
                            ownerPhoneChangedHandler({ target: { id: "phone", value: phone } })
                        }
                        onBlur={ownerPhoneBlurHandler}
                    />
                    {ownerPhoneIsTouched && (<div className="error-message">{ownerPhoneError}</div>)}
                </div>
                <div className='full-width flex-col-left-start edit-store-application--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='store-name'>Store Name</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-store-application--input ${storeNameClasses}`}>
                        <i className='bi bi-shop-window size-20px' />
                        <input className='full-width gray margin-4px-H'
                            type={'text'}
                            placeholder={'Store name'}
                            id={'store-name'}
                            value={enteredStoreName}
                            onChange={storeNameChangedHandler}
                            onBlur={storeNameBlurHandler}
                        />
                    </div>
                    {storeNameIsTouched && (<div className="error-message">{storeNameError}</div>)}
                </div>
                <div className='full-width flex-col-left-start edit-store-application--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='slogan'>Slogan</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-store-application--input ${sloganClasses}`}>
                        <i className='bi bi-megaphone size-20px' />
                        <input className='full-width gray margin-4px-H'
                            type={'text'}
                            placeholder={'Write your slogan'}
                            id={'slogan'}
                            value={enteredSlogan}
                            onChange={sloganChangedHandler}
                            onBlur={sloganBlurHandler}
                        />
                    </div>
                    {sloganIsTouched && (<div className="error-message">{sloganError}</div>)}
                </div>
                {specialties && specialties.length > 0 && (
                    <div className='full-width flex-col-left-start edit-store-application--input-container'>
                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='speciality'>Speciality</label>
                        <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-store-application--input ${specialityClasses}`}>
                            <i className='bi bi-pin-map size-20px' />
                            <Select
                                className='edit-store-application--select full-width gray margin-4px-H'
                                styles={{
                                    option: (provided, state) => ({
                                        ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit'
                                    }),
                                    menu: (provided) => ({
                                        ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`
                                    }),
                                }}
                                value={enteredSpeciality}
                                placeholder={enteredSpeciality}
                                options={specialties.filter(speciality => speciality.status === "Active").map(speciality => ({ label: speciality.title, value: { label: speciality.title, title: speciality.title, id: speciality._id } }))}
                                onChange={(speciality) => {
                                    specialtyRef.current = speciality.value;
                                    specialityChangedHandler({ target: { id: "speciality", label: speciality.title, value: speciality.value } })
                                }}
                                onBlur={specialityBlurHandler}
                            />
                        </div>
                        {specialityIsTouched && (<div className="error-message">{specialityError}</div>)}
                    </div>
                )}
                <div className="edit-store-application--actions flex-row-between full-width">
                    <button
                        className={`edit-store-application--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                        type="submit"
                    >
                        Confirm
                    </button>
                    <button
                        className="edit-store-application--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                        onClick={() => {
                            popupToggle(false);
                            document.getElementById('dashboard-view').style.zIndex = 10;
                            window.onscroll = function () { };
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditStoreApplicationForm;