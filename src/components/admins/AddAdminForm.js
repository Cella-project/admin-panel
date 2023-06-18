import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../apis/actions";

import "./AddAdminForm.scss";

const AddAdminForm = ({ popupToggle }) => {
  const [photoFile, setPhotoFile] = useState('NO IMAGE');
  const [adminIMG, setAdminIMG] = useState('NO IMAGE');
  const dispatch = useDispatch();
  const mode = useSelector(state => state.theme.mode);

  const {
    value: enteredFullName,
    isValid: enteredFullNameIsValid,
    error: fullNameError,
    isTouched: fullNameIsTouched,
    valueChangeHandler: fullNameChangedHandler,
    inputBlurHandler: fullNameBlurHandler,
  } = useInput((value) => {
    const regex = /^[\p{L}\s]*$/u;
    const isValid = value.trim() !== '' && value.trim().length >= 3 && value.trim().length <= 50;
    let error = '';
    if (value.trim() === '') {
      error = 'Please enter a full name.';
    } else if (value.trim().length < 3 || value.trim().length > 50) {
      error = 'Please enter a full name between 3 and 50 characters.';
    }
    if (!regex.test(value.trim())) {
      error = 'Please enter only letters and spaces.';
    }
    return { isValid, error };
  });

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    error: emailError,
    isTouched: emailIsTouched,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(value);
    let error = '';
    if (value.trim() === '') {
      error = 'Please enter an email address.';
    } else if (!isValid) {
      error = 'Please enter a valid email address.';
    }
    return { isValid, error };
  });

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    error: phoneError,
    isTouched: phoneIsTouched,
    valueChangeHandler: phoneChangedHandler,
    inputBlurHandler: phoneBlurHandler,
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

  const fullNameClasses = fullNameIsTouched && !enteredFullNameIsValid
    ? 'form-control-invalid'
    : '';

  const emailClasses = emailIsTouched && !enteredEmailIsValid
    ? 'form-control-invalid'
    : '';

  const phoneClasses = phoneIsTouched && !enteredPhoneIsValid
    ? 'form-control-invalid'
    : '';


  let formIsValid = false;

  if (enteredFullNameIsValid && enteredEmailIsValid & enteredPhoneIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const formData = {
      name: enteredFullName.trim(),
      email: enteredEmail.trim(),
      phoneNum: enteredPhone.replace("+2", ""),
      img: adminIMG
    };

    dispatch(adminActions.addAdmin(formData, () => {
      popupToggle(false);
      document.getElementById("dashboard-view").style.zIndex = 10;
      window.onscroll = function () { };
    }));

  };

  const uploadImg = async (e) => {
    setPhotoFile(URL.createObjectURL(e.target.files[0]))
    const data = new FormData();
    data.append('path', 'admin/profile');
    data.append('file', e.target.files[0]);
    dispatch(adminActions.addAdminPicture(data, (response) => {
      setAdminIMG('http://www.actore.store/api/file-manager/file/' + response.data.data);
    }))
  }

  const clearIMG = () => {
    setAdminIMG('NO IMAGE');
    setPhotoFile('NO IMAGE');
  }

  return (
    <form noValidate className="add-admin" onSubmit={formSubmissionHandler}>
      <div className="full-width flex-col-left-start add-admin--input-container">
        <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="fullName" >
          Full Name
        </label>
        <div className={`full-width gray radius-10px white-bg flex-row-left-start add-admin--input ${fullNameClasses}`}>
          <i className="bi bi-person size-20px" />
          <input
            className="full-width gray margin-4px-H"
            type={"text"}
            placeholder={"Full Name"}
            id={"fullName"}
            value={enteredFullName}
            onChange={fullNameChangedHandler}
            onBlur={fullNameBlurHandler}
          />
        </div>
        {fullNameIsTouched && (
          <div className="error-message">{fullNameError}</div>
        )}
      </div>
      <div className="full-width flex-col-left-start add-admin--input-container">
        <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="email" >
          Email Address
        </label>
        <div className={`full-width gray radius-10px white-bg flex-row-left-start add-admin--input ${emailClasses}`}>
          <i className="bi bi-envelope size-20px" />
          <input
            className="full-width gray margin-4px-H"
            type={"email"}
            placeholder={"Email Address"}
            id={"email"}
            value={enteredEmail}
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
          />
        </div>
        {emailIsTouched && (
          <div className="error-message">{emailError}</div>
        )}
      </div>

      <div className="full-width flex-col-left-start add-admin--input-container">
        <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="phone" >
          Phone Number
        </label>
        <PhoneInput
          id={'phone'}
          className={`full-width gray radius-10px white-bg flex-row-left-start add-admin--input ${phoneClasses}`}
          international
          countryCallingCodeEditable={false}
          countrySelectProps={{ unicodeFlags: true }}
          defaultCountry={"EG"}
          limitMaxLength
          value={enteredPhone}
          onChange={(phone) =>
            phoneChangedHandler({ target: { id: "phone", value: phone } })}

          onBlur={phoneBlurHandler}

        />
        {phoneIsTouched && (
          <div className="error-message">{phoneError}</div>
        )}
      </div>
      <div className="full-width flex-col-left-start add-admin--input-container">
        <div className="full-width flex-col-left-start add-admin--input-container">
          <div className='add-admin--change-img full-width flex-col-top-start'>
            <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="photo">
              Photo
            </label>
            <label className={`add-admin--change-img--tag full-width flex-row-center gray open-sans pointer ${photoFile !== 'NO IMAGE' ? 'hide' : ''}`} htmlFor='photo'>
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
          <label className={`add-admin--img flex-col-center ${photoFile === 'NO IMAGE' ? 'hide' : ''} full-width pointer`} htmlFor='photo'>
            <img src={photoFile} alt='' />
          </label>
          <button
            type="button"
            className={`add-admin--actions--button${photoFile === 'NO IMAGE' ? '-hide' : ''} margin-4px-V full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
            onClick={clearIMG}
          >
            Clear
          </button>

        </div>
      </div>
      <div className="add-admin--actions flex-row-between full-width">
        <button
          className={`add-admin--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px orange-bg`}
          type="submit"
        >
          Confirm
        </button>
        <button
          className="add-admin--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
          onClick={() => {
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { };
          }} >
          Cancel
        </button>
      </div>
    </form >
  );
};

export default AddAdminForm;