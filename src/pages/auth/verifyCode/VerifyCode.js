import React, { useState, useEffect, useRef } from "react";

import Timer from '../../../components/UI/Timer';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../apis/actions";
import { popupMutation } from "../../../redux/mutations";
import OtpInput from 'react-otp-input';

import router from '../../../router/router';

import "./VerifyCode.scss";

const VerifyCode = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.forgetPasswordCycle.email);

  const mode = useSelector((state) => state.theme.mode);

  const [value, setValue] = useState('');

  const codeRef = useRef('');

  const handleCodeChange = (event) => {
    codeRef.current = event;
    setValue(event);
  };

  useEffect(() => {
    document.title = 'Reset Password • Admin Panel';

    // Set the timer for 5 minutes
    const timer = setTimeout(() => {
      router.navigate('/login/forget-password');
      dispatch(popupMutation.popFeedBack({
        type: 'info',
        msg: 'Your verification code has expired. Please request a new one.',
      }))
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  });

  const handleVerifyOTP = (event) => {
    if (event) {
      event.preventDefault();
    }

    const formData = {
      email: email,
      otp: codeRef.current,
    };

    dispatch(authActions.verifyOTP(formData));
  };

  useEffect(() => {
    if (codeRef.current.length === 6) {
      handleVerifyOTP();
    }
  });

  return (
    <form noValidate onSubmit={handleVerifyOTP} className="verify flex-col-center white-bg radius-5px shadow-2px">
      <Timer className={'gold margin-12px-V'} sec={5 * 60} />
      <div className="verify--info full-width flex-col-left-start gray-bg radius-5px">
        <p className={`space-none inter ${mode === 'dark-mode' ? 'white' : 'gray'} margin-4px-V size-12px`}>
          A Reset code has been sent to your email address. Please enter the code below.
        </p>
      </div>
      <div className="verify--slot full-width flex-col-left-start margin-12px-V">
        <p
          style={{ marginLeft: "5px" }}
          className="no-padding margin-6px-V size-16px inter gray"
        >
          Verify Code
        </p>
        <OtpInput
          value={value}
          onChange={handleCodeChange}
          numInputs={6}
          containerStyle='verify--slot--input full-width flex-row-between inter gray size-14px radius-10px'
          inputStyle={{ width: '30px', height: '30px', borderRadius: '5px', border: '1px solid #ccc' }}
          focusStyle={{ outline: '2px solid #70c8b0' }}
          isInputNum={true}
          shouldAutoFocus={true}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <button
        type="submit"
        className={`verify--btn full-width orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}
      >
        VERIFY
      </button>
      <div className="full-width flex-row-left-start">
        <NavLink to={'/login/forget-password'}
          style={{ textDecoration: 'none' }}
          className={`space-none inter ${mode === 'dark-mode' ? 'gray' : 'orange'} size-14px margin-12px-H pointer`}>
          didn't receive a code?, Try again.
        </NavLink>
      </div>
    </form>
  );
};

export default VerifyCode;
