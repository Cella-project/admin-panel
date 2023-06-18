import React, { useState, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useSelector, useDispatch } from 'react-redux';
import { specialityActions } from '../../apis/actions';
import { specialityMutations } from '../../redux/mutations';
import { storeActions } from "../../apis/actions";
import useInput from '../../hooks/useInput';
import Select from 'react-select';

import './AddStoreForm.scss';

const AddStoreForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const specialities = useSelector((state) => state.speciality.specialties);
    const [photoFile, setPhotoFile] = useState('No Image');
    const [currentSection, setCurrentSection] = useState(1);
    const [storeIMG, setStoreIMG] = useState('No Image');

    const mode = useSelector((state) => state.theme.mode);

    const Facebook = useRef('');
    const Whatsapp = useRef('');
    const Instagram = useRef('');

    const [socialMediaAccounts, setSocialMediaAccounts] = useState({
        Facebook: '',
        Whatsapp: '',
        Instagram: '',
    });

    const {
        value: enteredOwnerName,
        isValid: enteredOwnerNameIsValid,
        error: ownerNameError,
        isTouched: ownerNameIsTouched,
        valueChangeHandler: ownerNameChangedHandler,
        inputBlurHandler: ownerNameBlurHandler,
    } = useInput((value) => {
        const regex = /^[\p{L}\s]*$/u;
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter a full name.';
        } else if (value.length < 3 || value.length > 50) {
            error = 'Please enter a full name between 3 and 50 characters.';
        }
        if (!regex.test(value.trim())) {
            error = 'Please enter only letters and spaces.';
        }
        return { isValid, error };
    });

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
    });

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
    });

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
    });

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
    });


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
    });

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

    useEffect(() => {
        dispatch(specialityMutations.setSpecialties(null));
        dispatch(specialityActions.getSpecialties());
    }, [dispatch]);


    const formSubmissionHandler = async (event) => {
        event.preventDefault();

        const formData = {
            owner: {
                name: enteredOwnerName.trim(),
                email: enteredOwnerEmail.trim(),
                phoneNum: enteredOwnerPhone.replace("+2", ""),
            },
            logo: storeIMG,
            storeName: enteredStoreName.trim(),
            slogan: enteredSlogan.trim(),
            speciality: {
                _id: enteredSpeciality.id,
                title: enteredSpeciality.title
            }
        };
        dispatch(storeActions.addStore(formData, (storeID) => {
            if (Facebook.current.length > 0) {
                dispatch(storeActions.addStoreSocialMediaAccount({
                    _id: storeID,
                    accountType: 'Facebook',
                    link: Facebook.current
                }));
            }
        }, () => {
            setCurrentSection(0);
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { };
        }));
    };


    const uploadImg = async (e) => {
        setPhotoFile(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append('path', 'store/profile');
        data.append('file', e.target.files[0]);
        dispatch(storeActions.addStorePicture(data, (response) => {
            setStoreIMG('http://www.actore.store/api/file-manager/file/' + response.data.data);
        }))
    }

    const clearIMG = () => {
        setStoreIMG('No Image');
        setPhotoFile('No Image');
    }

    return (
        <form noValidate className='add-store' onSubmit={formSubmissionHandler}>
            {popupToggle && currentSection === 1 && <div className='full-width flex-col-center add-store--input-container'>
                <div className={`add-store--header ${mode === 'dark-mode' ? 'gray' : 'orange'} full-width size-18px font-bold margin-6px-V`}>Owner Section</div>
                <div className='full-width flex-col-left-start add-store--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='ownerName'>Owner Name <span className='red'>*</span></label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start add-store--input ${ownerNameClasses}`}>
                        <i className='bi bi-person size-20px' />
                        <input
                            className='full-width gray margin-4px-H'
                            type={'text'}
                            placeholder={'Owner full name'}
                            id={'name'}
                            value={enteredOwnerName}
                            onChange={ownerNameChangedHandler}
                            onBlur={ownerNameBlurHandler}
                            autoFocus
                        />
                    </div>
                    {ownerNameIsTouched && (<div className="error-message">{ownerNameError}</div>)}
                </div>
                <div className='full-width flex-col-left-start add-store--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='ownerEmail'>Email Address <span className='red'>*</span></label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start add-store--input ${ownerEmailClasses}`}>
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
                <div className='full-width flex-col-left-start add-store--input-container'>
                    <label className='pointer full-width white-bg text-shadow gray font-bold margin-6px-V' htmlFor='phone'>Phone Number <span className='red'>*</span></label>
                    <PhoneInput
                        className={`full-width gray white-bg radius-10px flex-row-left-start add-store--input ${ownerPhoneClasses}`}
                        id={'phoneNum'}
                        placeholder="Owner phone number"
                        international
                        countryCallingCodeEditable={false}
                        limitMaxLength
                        countrySelectProps={{ unicodeFlags: true }}
                        defaultCountry={'EG'}
                        value={enteredOwnerPhone}
                        onChange={(phone) =>
                            ownerPhoneChangedHandler({ target: { id: "phone", value: phone } })
                        }
                        onBlur={ownerPhoneBlurHandler}
                    />
                    {ownerPhoneIsTouched && (<div className="error-message">{ownerPhoneError}</div>)}
                </div>
                <div className="add-store--actions flex-row-between full-width">
                    <button
                        className={`add-store--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                        onClick={() => {
                            setCurrentSection(2);
                        }}
                    >
                        Next
                    </button>
                    <button
                        className="add-store--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                        onClick={() => {
                            popupToggle(false);
                            document.getElementById('dashboard-view').style.zIndex = 10;
                            window.onscroll = function () { };
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>}

            {popupToggle && currentSection === 2 && <div className='full-width flex-col-center add-store--input-container'>
                <div className={`add-store--header ${mode === 'dark-mode' ? 'gray' : 'orange'} full-width size-18px font-bold margin-6px-V`}>Store Section</div>
                <div className='full-width flex-col-left-start add-store--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='store-name'>Store Name <span className='red'>*</span></label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start add-store--input ${storeNameClasses}`}>
                        <i className='bi bi-shop-window size-20px' />
                        <input className='full-width gray margin-4px-H'
                            type={'text'}
                            placeholder={'Store name'}
                            id={'store-name'}
                            value={enteredStoreName}
                            onChange={storeNameChangedHandler}
                            onBlur={storeNameBlurHandler}
                            autoFocus
                        />
                    </div>
                    {storeNameIsTouched && (<div className="error-message">{storeNameError}</div>)}
                </div>

                <div className="full-width flex-col-left-start add-store--input-container">
                    <div className='add-store--change-img full-width flex-col-top-start'>
                        <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="photo">
                            Logo
                        </label>
                        <label className={`add-store--change-img--tag full-width flex-row-center gray open-sans pointer ${photoFile !== 'No Image' ? 'hide' : ''}`} htmlFor='photo'>
                            <label className={`bi bi-image size-40px full-width flex-row-center white-bg pointer`} htmlFor="photo" />
                            <input
                                className="full-width gray margin-4px-H"
                                type="file"
                                id="photo"
                                accept="image/*"
                                onChange={uploadImg}
                            />
                        </label>
                    </div>
                    <label className={`add-store--img flex-col-center ${photoFile === 'No Image' ? 'hide' : ''} full-width pointer`} htmlFor='photo'>
                        <img src={photoFile} alt='' />
                    </label>
                    <button
                        type="button"
                        className={`add-admin--actions--button${photoFile === 'No Image' ? '-hide' : ''} margin-4px-V full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                        onClick={clearIMG}
                    >
                        Clear
                    </button>
                </div>

                <div className='full-width flex-col-left-start add-store--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='slogan'>Slogan <span className='red'>*</span></label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start add-store--input ${sloganClasses}`}>
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
                <div className='full-width flex-col-left-start add-store--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>Social Media Accounts</label>
                    <div className='full-width gray radius-10px white-bg flex-row-left-start add-store--input'>
                        <i className='bi bi-facebook size-20px' />
                        <input className='full-width gray margin-6px-H'
                            type={'text'}
                            placeholder={'Facebook account link'}
                            value={socialMediaAccounts.Facebook}
                            onChange={(e) => {
                                Facebook.current = e.target.value;
                                setSocialMediaAccounts({ ...socialMediaAccounts, Facebook: e.target.value })
                            }}
                        />
                    </div>
                    <div className='full-width gray radius-10px margin-8px-V white-bg flex-row-left-start add-store--input'>
                        <i className='bi bi-whatsapp size-20px' />
                        <input className='full-width gray margin-6px-H'
                            type={'text'}
                            placeholder={'Whatsapp account link'}
                            value={socialMediaAccounts.Whatsapp}
                            onChange={(e) => {
                                Whatsapp.current = e.target.value;
                                setSocialMediaAccounts({ ...socialMediaAccounts, Whatsapp: e.target.value })
                            }}
                        />
                    </div>
                    <div className='full-width gray radius-10px white-bg flex-row-left-start add-store--input'>
                        <i className='bi bi-instagram size-20px' />
                        <input className='full-width gray margin-6px-H'
                            type={'text'}
                            placeholder={'Instagram account link'}
                            value={socialMediaAccounts.Instagram}
                            onChange={(e) => {
                                Instagram.current = e.target.value;
                                setSocialMediaAccounts({ ...socialMediaAccounts, Instagram: e.target.value })
                            }}
                        />
                    </div>
                </div>

                {specialities && specialities.length > 0 && (
                    <div className='full-width flex-col-left-start add-store--input-container'>
                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='speciality'>Speciality <span className='red'>*</span></label>
                        <div className={`full-width gray radius-10px white-bg flex-row-left-start add-store--input ${specialityClasses}`}>
                            <i className='bi bi-pin-map size-20px' />
                            <Select
                                className={`add-store--select full-width margin-4px-H`}
                                styles={{
                                    option: (provided, state) => ({
                                        ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` : 'inherit'
                                    }),
                                    menu: (provided) => ({
                                        ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`
                                    }),
                                }}
                                value={enteredSpeciality}
                                placeholder="Select Speciality"
                                options={specialities.filter(speciality => speciality.status === "Active").map(speciality => ({ label: speciality.title, value: { label: speciality.title, title: speciality.title, id: speciality._id } }))}
                                onChange={(speciality) =>
                                    specialityChangedHandler({ target: { id: "speciality", label: speciality.title, value: speciality.value } })
                                }
                                onBlur={specialityBlurHandler}
                            />
                        </div>
                        {specialityIsTouched && (<div className="error-message">{specialityError}</div>)}
                    </div>
                )}
                <div className="add-store--actions flex-row-between full-width">
                    <button
                        className={`add-store--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                        type="submit"
                    >
                        Confirm
                    </button>
                    <button
                        className="add-store--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                        onClick={() => {
                            setCurrentSection(1);
                        }}
                    >
                        Back
                    </button>
                </div>
            </div>}
        </form>
    )
}

export default AddStoreForm