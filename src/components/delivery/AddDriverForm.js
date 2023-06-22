import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { driverActions } from "../../apis/actions";
import useInput from '../../hooks/useInput';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import './AddDriverForm.scss';

const AddDriverForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const [currentSection, setCurrentSection] = useState(1);
    const [photoFile, setPhotoFile] = useState('No Image');
    const [driverImg, setdriverImg] = useState('No Image');
    const [nationalIdImgFront, setNationalIdImgFront] = useState('No Image');
    const [nationalIdImgBack, setNationalIdImgBack] = useState('No Image');
    const [driverLicenseImgFront, setDriverLicenseImgFront] = useState('No Image');
    const [driverLicenseImgBack, setDriverLicenseImgBack] = useState('No Image');
    const [vehicleLicenseImgFront, setVehicleLicenseImgFront] = useState('No Image');
    const [vehicleLicenseImgBack, setVehicleLicenseImgBack] = useState('No Image');

    const mode = useSelector((state) => state.theme.mode);

    const {
        value: enteredDriverName,
        isValid: enteredDriverNameIsValid,
        error: driverNameError,
        isTouched: driverNameIsTouched,
        valueChangeHandler: driverNameChangedHandler,
        inputBlurHandler: driverNameBlurHandler,
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
        value: enteredDriverEmail,
        isValid: enteredDriverEmailIsValid,
        error: driverEmailError,
        isTouched: driverEmailIsTouched,
        valueChangeHandler: driverEmailChangedHandler,
        inputBlurHandler: driverEmailBlurHandler,
    } = useInput((value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = regex.test(value);
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter an Driver Email address.';
        } else if (!isValid) {
            error = 'Please enter a valid Driver Email address.';
        }
        return { isValid, error };
    });

    const {
        value: enteredDriverPhone,
        isValid: enteredDriverPhoneIsValid,
        error: driverPhoneError,
        isTouched: driverPhoneIsTouched,
        valueChangeHandler: driverPhoneChangedHandler,
        inputBlurHandler: driverPhoneBlurHandler,
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
        value: country,
        isValid: countryIsValid,
        error: countryError,
        isTouched: countryIsTouched,
        valueChangeHandler: handleCountryChange,
        inputBlurHandler: handleCountryBlur,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please select a Country.';
        }
        return { isValid, error };
    }, 'Egypt');
    const {
        value: city,
        isValid: cityIsValid,
        error: cityError,
        isTouched: cityIsTouched,
        valueChangeHandler: handleCityChange,
        inputBlurHandler: handleCityBlur,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please select a City.';
        }
        return { isValid, error };
    }, 'Port Said');

    const {
        value: gender,
        isValid: genderIsValid,
        error: genderError,
        isTouched: genderIsTouched,
        valueChangeHandler: handleGenderChange,
        inputBlurHandler: handleGenderBlur,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please select a Gender.';
        }
        return { isValid, error };
    });

    const {
        value: dateOfBirth,
        isValid: dateOfBirthisValid,
        error: dateOfBirthError,
        isTouched: dateOfBirthIsTouched,
        valueChangeHandler: handleDateOfBirthChange,
        inputBlurHandler: handleDateOfBirthBlur,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please select a Birth Date.';
        }
        return { isValid, error };
    }, '1990-01-01');

    const {
        value: enteredVehicle,
        isValid: enteredVehicleIsValid,
        error: vehicleError,
        isTouched: vehicleIsTouched,
        valueChangeHandler: vehicleChangedHandler,
        inputBlurHandler: vehicleBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === 'Select Vehicle Type') {
            error = 'Please select a Vehicle.';
        }
        return { isValid, error };
    });

    const driverNameClasses = driverNameIsTouched && !enteredDriverNameIsValid
        ? 'form-control-invalid'
        : '';

    const driverEmailClasses = driverEmailIsTouched && !enteredDriverEmailIsValid
        ? 'form-control-invalid'
        : '';

    const driverPhoneClasses = driverPhoneIsTouched && !enteredDriverPhoneIsValid
        ? 'form-control-invalid'
        : '';

    const countryClasses = countryIsTouched && !countryIsValid
        ? 'form-control-invalid'
        : '';

    const cityClasses = cityIsTouched && !cityIsValid
        ? 'form-control-invalid'
        : '';

    const dateOfBirthClasses = dateOfBirthIsTouched && !dateOfBirthisValid
        ? 'form-control-invalid'
        : '';

    const genderClasses = genderIsTouched && !genderIsValid
        ? 'form-control-invalid'
        : '';

    const vehicleClasses = vehicleIsTouched && !enteredVehicleIsValid
        ? 'form-control-invalid'
        : '';


    let sectionOne = false;
    if (enteredDriverNameIsValid && enteredDriverEmailIsValid && enteredDriverPhoneIsValid && countryIsValid && cityIsValid && dateOfBirthisValid && genderIsValid && driverImg !== 'No Image') {
        sectionOne = true;
    }

    let sectionTwo = false;
    if (enteredDriverNameIsValid && enteredVehicle !== 'Bike' && nationalIdImgFront !== 'No Image' && nationalIdImgBack !== 'No Image' && vehicleLicenseImgFront !== 'No Image' && vehicleLicenseImgBack !== 'No Image' && driverLicenseImgFront !== 'No Image' && driverLicenseImgBack !== 'No Image') {
        sectionTwo = true;
    }

    if (enteredDriverNameIsValid && nationalIdImgFront !== 'No Image' && nationalIdImgBack !== 'No Image' && (enteredVehicle === 'Bike' || enteredVehicle === '')) {
        sectionTwo = true;
    }

    const formSubmissionHandler = async (event) => {
        event.preventDefault();

        if (!sectionOne && !sectionTwo) {
            return;
        }

        let vehicleData;
        if (enteredVehicle === "Bike") {
            vehicleData = {
                vehicleType: enteredVehicle,
            };
        } else {
            vehicleData = {
                vehicleType: enteredVehicle,
                vehicleLicenseImgFront: vehicleLicenseImgFront,
                vehicleLicenseImgBack: vehicleLicenseImgBack,
                driverLicenseImgFront: driverLicenseImgFront,
                driverLicenseImgBack: driverLicenseImgBack,
            };
        }

        const formData = {
            name: enteredDriverName.trim(),
            email: enteredDriverEmail.trim(),
            phoneNum: enteredDriverPhone.replace("+2", ""),
            country: country,
            city: city,
            img: driverImg,
            gender: gender,
            dateOfBirth: new Date(dateOfBirth).toLocaleDateString('en-GB'),
            nationalIdImgFront: nationalIdImgFront,
            nationalIdImgBack: nationalIdImgBack,
            vehicle: vehicleData,
        };

        dispatch(driverActions.addDriver(formData, () => {
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { };
        }));
    };


    const uploadDriverImg = async (e) => {
        setPhotoFile(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append('path', 'driver/profile');
        data.append('file', e.target.files[0]);
        dispatch(driverActions.addDriverPicture(data, (response) => {
            setdriverImg('http://www.actore.store/api/file-manager/file/' + response.data.data);
        }))
    }

    const uploadNationalIdImgFront = async (e) => {
        setPhotoFile(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append('path', 'driver/nationalId');
        data.append('file', e.target.files[0]);
        dispatch(driverActions.addDriverPicture(data, (response) => {
            setNationalIdImgFront('http://www.actore.store/api/file-manager/file/' + response.data.data);
        }))
    }

    const uploadVehicleLicenseImgFront = async (e) => {
        setPhotoFile(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append('path', 'driver/vehicleLicense');
        data.append('file', e.target.files[0]);
        dispatch(driverActions.addDriverPicture(data, (response) => {
            setVehicleLicenseImgFront('http://www.actore.store/api/file-manager/file/' + response.data.data);
        }))
    }

    const uploadVehicleLicenseImgBack = async (e) => {
        setPhotoFile(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append('path', 'driver/vehicleLicense');
        data.append('file', e.target.files[0]);
        dispatch(driverActions.addDriverPicture(data, (response) => {
            setVehicleLicenseImgBack('http://www.actore.store/api/file-manager/file/' + response.data.data);
        }))
    }

    const uploadDriverLicenseImgFront = async (e) => {
        setPhotoFile(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append('path', 'driver/driverLicense');
        data.append('file', e.target.files[0]);
        dispatch(driverActions.addDriverPicture(data, (response) => {
            setDriverLicenseImgFront('http://www.actore.store/api/file-manager/file/' + response.data.data);
        }))
    }

    const uploadDriverLicenseImgBack = async (e) => {
        setPhotoFile(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append('path', 'driver/driverLicense');
        data.append('file', e.target.files[0]);
        dispatch(driverActions.addDriverPicture(data, (response) => {
            setDriverLicenseImgBack('http://www.actore.store/api/file-manager/file/' + response.data.data);
        }))
    }

    const uploadNationalIdImgBack = async (e) => {
        setPhotoFile(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append('path', 'driver/nationalId');
        data.append('file', e.target.files[0]);
        dispatch(driverActions.addDriverPicture(data, (response) => {
            setNationalIdImgBack('http://www.actore.store/api/file-manager/file/' + response.data.data);
        }))
    }

    return (
        <form noValidate className='add-driver' onSubmit={formSubmissionHandler}>
            {popupToggle && currentSection === 1 && <div className='full-width flex-col-center add-driver--input-container'>
                <div className={`add-driver--header ${mode === 'dark-mode' ? 'gray' : 'orange'} full-width size-18px font-bold margin-6px-V`}>Driver Section</div>
                <div className='full-width flex-col-left-start add-driver--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='DriverName'>Driver Name</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start add-driver--input ${driverNameClasses}`}>
                        <i className='bi bi-person size-20px' />
                        <input
                            className='full-width gray margin-4px-H'
                            type={'text'}
                            placeholder={'Driver full name'}
                            id={'name'}
                            value={enteredDriverName}
                            onChange={driverNameChangedHandler}
                            onBlur={driverNameBlurHandler}
                            autoFocus
                        />
                    </div>
                    {driverNameIsTouched && (<div className="error-message">{driverNameError}</div>)}
                </div>
                <div className='full-width flex-col-left-start add-driver--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='Gender'>Gender</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start add-driver--input ${genderClasses}`}>
                        <i className="bi bi-gender-ambiguous gray size-20px" />
                        <div className='flex-row-left-start margin-12px-H'>
                            <input
                                className="pointer margin-12px-H"
                                type='radio'
                                id='male'
                                name='Gender'
                                value='male'
                                checked={gender === 'male'}
                                onChange={(event) => handleGenderChange(event)}
                                onBlur={handleGenderBlur} />
                            <label htmlFor='male'>Male</label>
                        </div>
                        <div className='flex-row-left-start margin-12px-H'>
                            <input className="pointer margin-12px-H" type='radio' id='female' name='Gender' value='female' checked={gender === 'female'} onChange={(event) => handleGenderChange(event)} onBlur={handleGenderBlur} />
                            <label htmlFor='female'>Female</label>
                        </div>
                    </div>
                    {genderIsTouched && !genderIsValid && (<div className="error-message">{genderError}</div>)}
                </div>
                <div className='full-width flex-col-left-start add-driver--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='DriverEmail'>Email Address</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start add-driver--input ${driverEmailClasses}`}>
                        <i className='bi bi-envelope size-20px' />
                        <input className='full-width gray margin-4px-H'
                            type={'email'}
                            placeholder={'Driver email'}
                            id={'DriverEmail'}
                            value={enteredDriverEmail}
                            onChange={driverEmailChangedHandler}
                            onBlur={driverEmailBlurHandler}
                        />
                    </div>
                    {driverEmailIsTouched && (<div className="error-message">{driverEmailError}</div>)}
                </div>
                <div className='full-width flex-col-left-start add-driver--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='phone'>Phone Number</label>
                    <PhoneInput
                        className={`full-width gray radius-10px white-bg flex-row-left-start add-driver--input ${driverPhoneClasses}`}
                        id={'phoneNum'}
                        placeholder="Driver phone number"
                        international
                        countryCallingCodeEditable={false}
                        limitMaxLength
                        countrySelectProps={{ unicodeFlags: true }}
                        defaultCountry={'EG'}
                        value={enteredDriverPhone}
                        onChange={(phone) =>
                            driverPhoneChangedHandler({ target: { id: "phone", value: phone } })
                        }
                        onBlur={driverPhoneBlurHandler}
                    />
                    {driverPhoneIsTouched && (<div className="error-message">{driverPhoneError}</div>)}
                </div>
                <div className='full-width flex-col-left-start add-driver--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='Country'>Country</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start add-driver--input ${countryClasses}`}>
                        <i className='bi bi-pin-map size-20px' />
                        <CountryDropdown
                            className='full-width gray margin-4px-H radius-10px white-bg flex-row-left-start add-driver--select'
                            value={country}
                            id="country"
                            name="country"
                            onChange={(country) => handleCountryChange({ target: { id: "country", value: country } })}
                            onBlur={handleCountryBlur}
                        />
                    </div>
                    {countryIsTouched && (<div className="error-message">{countryError}</div>)}
                </div>
                <div className='full-width flex-col-left-start add-driver--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='City'>City</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start add-driver--input ${cityClasses}`}>
                        <i className='bi bi-pin-map size-20px' />
                        <RegionDropdown className='full-width gray margin-4px-H radius-10px white-bg flex-row-left-start add-driver--select'
                            disableWhenEmpty={true}
                            country={country}
                            value={city}
                            id="city"
                            name="city"
                            onChange={
                                (city) =>
                                    handleCityChange({ target: { id: "city", value: city } })
                            }
                            onBlur={handleCityBlur} />
                    </div>
                    {cityIsTouched && (<div className="error-message">{cityError}</div>)}
                </div>
                <div className='full-width flex-col-left-start add-driver--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='DateOfBirth'>Date of Birth</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start add-driver--input ${dateOfBirthClasses}`}>
                        <i className='bi bi-calendar2 size-20px' />
                        <input className='driver--input full-width margin-8px-H gray radius-10px' type="date" id={'dateOfBirth'} value={dateOfBirth} onChange={handleDateOfBirthChange} onBlur={handleDateOfBirthBlur} />
                    </div>
                    {dateOfBirthIsTouched && (<div className="error-message">{dateOfBirthError}</div>)}
                </div>
                <div className="full-width flex-col-left-start add-driver--input-container">
                    <div className="full-width flex-col-left-start add-driver--input-container">
                        <div className='add-driver--change-img full-width flex-col-top-start'>
                            <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="photo">
                                Photo
                            </label>
                            <label className={`add-driver--change-img--tag full-width flex-row-center gray open-sans pointer ${photoFile !== 'No Image' ? 'hide' : ''}`} htmlFor='photo'>
                                <label className={`bi bi-image size-40px full-width flex-row-center white-bg pointer`} htmlFor="photo" />
                                <input
                                    className="full-width gray margin-4px-H"
                                    type="file"
                                    id="photo"
                                    accept="image/*"
                                    onChange={uploadDriverImg}
                                />
                            </label>
                        </div>
                        <label className={`add-driver--img flex-col-center ${driverImg === 'No Image' ? 'hide' : ''} full-width pointer`} htmlFor='photo'>
                            <img src={driverImg} alt='driverImg' />
                        </label>
                        <button
                            type="button"
                            className={`add-admin--actions--button${driverImg === 'No Image' ? '-hide' : ''} margin-4px-V full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                            onClick={() => { setdriverImg('No Image'); }}
                        >
                            Clear
                        </button>
                    </div>
                </div>
                <div className="add-driver--actions flex-row-between full-width">
                    <button
                        className={`add-driver--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                        onClick={() => {
                            setCurrentSection(2);
                        }}
                    >
                        Next
                    </button>
                    <button
                        className="add-driver--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
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

            {popupToggle && currentSection === 2 && <div className='full-width flex-col-center add-driver--input-container'>
                <div className={`add-driver--header ${mode === 'dark-mode' ? 'gray' : 'orange'} full-width size-18px font-bold margin-6px-V`}>Documentaiton Section</div>
                <div className='full-width flex-col-left-start add-driver--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='vehicle'>Vehicle Type</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start add-driver--input ${vehicleClasses}`}>
                        <i className='bi bi-truck size-20px' />
                        <select className='full-width gray margin-4px-H radius-10px white-bg flex-row-left-start add-driver--select' id='vehicle' value={enteredVehicle} onChange={vehicleChangedHandler} onBlur={vehicleBlurHandler}>
                            <option value='' disabled>Select Vehicle Type</option>
                            <option value='Car'>Car</option>
                            <option value='Motorcycle'>Motorcycle</option>
                            <option value='Bike'>Bike</option>
                        </select>

                    </div>
                    {vehicleIsTouched && (<div className="error-message">{vehicleError}</div>)}
                </div>
                <div className='full-width flex-col-left-start add-driver--input-container'>
                    <div className={`add-driver--header ${mode === 'dark-mode' ? 'gray' : 'orange'} full-width size-18px font-bold margin-6px-V`}>National ID Section</div>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='nationalIdImgFront'>National Id Img Front</label>
                    <label className={`add-driver--change-img--tag full-width flex-row-center gray open-sans pointer ${nationalIdImgFront !== 'No Image' ? 'hide' : ''}`} htmlFor='nationalIdImgFront'>
                        <label className={`bi bi-image size-40px full-width flex-row-center white-bg pointer`} htmlFor="nationalIdImgFront" />
                        <input
                            className="full-width gray margin-4px-H"
                            type="file"
                            id="nationalIdImgFront"
                            accept="image/*"
                            onChange={uploadNationalIdImgFront}
                        />
                    </label>
                    <label className={`add-driver--img flex-col-center ${nationalIdImgFront === 'No Image' ? 'hide' : ''} full-width pointer`} htmlFor='nationalIdImgFront'>
                        <img src={nationalIdImgFront} alt='nationalIdImgFront' />
                    </label>
                    <button
                        type="button"
                        className={`add-admin--actions--button${nationalIdImgFront === 'No Image' ? '-hide' : ''} margin-4px-V full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                        onClick={() => { setNationalIdImgFront('No Image') }}
                    >
                        Clear
                    </button>
                </div>
                <div className='full-width flex-col-left-start add-driver--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='nationalIdImgBack'>National Id Img Back</label>
                    <label className={`add-driver--change-img--tag full-width flex-row-center gray open-sans pointer ${nationalIdImgBack !== 'No Image' ? 'hide' : ''}`} htmlFor='nationalIdImgBack'>
                        <label className={`bi bi-image size-40px full-width flex-row-center white-bg pointer`} htmlFor="nationalIdImgBack" />
                        <input
                            className="full-width gray margin-4px-H"
                            type="file"
                            id="nationalIdImgBack"
                            accept="image/*"
                            onChange={uploadNationalIdImgBack}
                        />
                    </label>
                    <label className={`add-driver--img flex-col-center ${nationalIdImgBack === 'No Image' ? 'hide' : ''} full-width pointer`} htmlFor='nationalIdImgBack'>
                        <img src={nationalIdImgBack} alt='nationalIdImgBack' />
                    </label>
                    <button
                        type="button"
                        className={`add-admin--actions--button${nationalIdImgBack === 'No Image' ? '-hide' : ''} margin-4px-V full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                        onClick={() => { setNationalIdImgBack('No Image') }}
                    >
                        Clear
                    </button>
                </div>
                {(enteredVehicle !== 'Bike' && enteredVehicle !== '') &&
                    <>
                        <div className='full-width flex-col-left-start add-driver--input-container'>
                            <div className={`add-driver--header ${mode === 'dark-mode' ? 'gray' : 'orange'} full-width size-18px font-bold margin-6px-V`}>Vehicle License Section</div>
                            <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='vehicleLicenseImgFront'>Vehicle License Img Front</label>
                            <label className={`add-driver--change-img--tag full-width flex-row-center gray open-sans pointer ${vehicleLicenseImgFront !== 'No Image' ? 'hide' : ''}`} htmlFor='vehicleLicenseImgFront'>
                                <label className={`bi bi-image size-40px full-width flex-row-center white-bg pointer`} htmlFor="vehicleLicenseImgFront" />
                                <input
                                    className="full-width gray margin-4px-H"
                                    type="file"
                                    id="vehicleLicenseImgFront"
                                    accept="image/*"
                                    onChange={uploadVehicleLicenseImgFront}
                                />
                            </label>
                            <label className={`add-driver--img flex-col-center ${vehicleLicenseImgFront === 'No Image' ? 'hide' : ''} full-width pointer`} htmlFor='vehicleLicenseImgFront'>
                                <img src={vehicleLicenseImgFront} alt='vehicleLicenseImgFront' />
                            </label>
                            <button
                                type="button"
                                className={`add-admin--actions--button${vehicleLicenseImgFront === 'No Image' ? '-hide' : ''} margin-4px-V full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                                onClick={() => { setVehicleLicenseImgFront('No Image') }}
                            >
                                Clear
                            </button>
                        </div>
                        <div className='full-width flex-col-left-start add-driver--input-container'>
                            <div className="full-width flex-col-left-start add-store--input-container">
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='vehicleLicenseImgBack'>Vehicle License Img Back</label>
                                <label className={`add-driver--change-img--tag full-width flex-row-center gray open-sans pointer ${vehicleLicenseImgBack !== 'No Image' ? 'hide' : ''}`} htmlFor='vehicleLicenseImgBack'>
                                    <label className={`bi bi-image size-40px full-width flex-row-center white-bg pointer`} htmlFor="vehicleLicenseImgBack" />
                                    <input
                                        className="full-width gray margin-4px-H"
                                        type="file"
                                        id="vehicleLicenseImgBack"
                                        accept="image/*"
                                        onChange={uploadVehicleLicenseImgBack}
                                    />
                                </label>
                                <label className={`add-driver--img flex-col-center ${vehicleLicenseImgBack === 'No Image' ? 'hide' : ''} full-width pointer`} htmlFor='vehicleLicenseImgBack'>
                                    <img src={vehicleLicenseImgBack} alt='vehicleLicenseImgBack' />
                                </label>
                                <button
                                    type="button"
                                    className={`add-admin--actions--button${vehicleLicenseImgBack === 'No Image' ? '-hide' : ''} margin-4px-V full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                                    onClick={() => { setVehicleLicenseImgBack('No Image') }}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                        <div className='full-width flex-col-left-start add-driver--input-container'>
                            <div className="full-width flex-col-left-start add-store--input-container">
                                <div className={`add-driver--header ${mode === 'dark-mode' ? 'gray' : 'orange'} full-width size-18px font-bold margin-6px-V`}>Driver License Section</div>
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='driverLicenseImgFront'>Driver License Img Front</label>
                                <label className={`add-driver--change-img--tag full-width flex-row-center gray open-sans pointer ${driverLicenseImgFront !== 'No Image' ? 'hide' : ''}`} htmlFor='driverLicenseImgFront'>
                                    <label className={`bi bi-image size-40px full-width flex-row-center white-bg pointer`} htmlFor="driverLicenseImgFront" />
                                    <input
                                        className="full-width gray margin-4px-H"
                                        type="file"
                                        id="driverLicenseImgFront"
                                        accept="image/*"
                                        onChange={uploadDriverLicenseImgFront}
                                    />
                                </label>
                                <label className={`add-driver--img flex-col-center ${driverLicenseImgFront === 'No Image' ? 'hide' : ''} full-width pointer`} htmlFor='driverLicenseImgFront'>
                                    <img src={driverLicenseImgFront} alt='driverLicenseImgFront' />
                                </label>
                                <button
                                    type="button"
                                    className={`add-admin--actions--button${driverLicenseImgFront === 'No Image' ? '-hide' : ''} margin-4px-V full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                                    onClick={() => { setDriverLicenseImgFront('No Image') }}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                        <div className='full-width flex-col-left-start add-driver--input-container'>
                            <div className="full-width flex-col-left-start add-store--input-container">
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='driverLicenseImgBack'>Driver License Img Back</label>
                                <label className={`add-driver--change-img--tag full-width flex-row-center gray open-sans pointer ${driverLicenseImgBack !== 'No Image' ? 'hide' : ''}`} htmlFor='driverLicenseImgBack'>
                                    <label className={`bi bi-image size-40px full-width flex-row-center white-bg pointer`} htmlFor="driverLicenseImgBack" />
                                    <input
                                        className="full-width gray margin-4px-H"
                                        type="file"
                                        id="driverLicenseImgBack"
                                        accept="image/*"
                                        onChange={uploadDriverLicenseImgBack}
                                    />
                                </label>
                                <label className={`add-driver--img flex-col-center ${driverLicenseImgBack === 'No Image' ? 'hide' : ''} full-width pointer`} htmlFor='driverLicenseImgBack'>
                                    <img src={driverLicenseImgBack} alt='driverLicenseImgBack' />
                                </label>
                                <button
                                    type="button"
                                    className={`add-admin--actions--button${driverLicenseImgBack === 'No Image' ? '-hide' : ''} margin-4px-V full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                                    onClick={() => { setDriverLicenseImgBack('No Image') }}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </>

                }

                <div className="add-driver--actions flex-row-between full-width">
                    <button
                        className={`add-driver--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                        type="submit"
                    >
                        Confirm
                    </button>
                    <button
                        className="add-driver--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
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

export default AddDriverForm