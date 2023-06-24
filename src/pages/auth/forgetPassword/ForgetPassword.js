import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useInput from "../../../hooks/useInput";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../apis/actions";

import './ForgetPassword.scss';

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);

    useEffect(() => {
        document.title = 'Reset Password • Admin Panel';
    }, []);

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

    const emailClasses = emailIsTouched && !enteredEmailIsValid
        ? 'form-control-invalid'
        : '';

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        const formData = {
            email: enteredEmail.trim().toLowerCase(),
        };
        dispatch(authActions.forgetPassword(formData));
    };

    return (
        <form noValidate onSubmit={handleForgetPassword} className='forget flex-col-center white-bg radius-5px shadow-2px'>
            <div className="forget--slot full-width flex-col-left-start margin-12px-V">
                <p
                    style={{ marginLeft: '5px' }}
                    className="no-padding margin-6px-V size-16px inter gray">Email Address
                </p>
                <i className={`forget--slot--icon ${mode === 'dark-mode' ? 'gray' : 'orange'} size-20px bi bi-envelope`}></i>
                <input
                    className={`forget--slot--input forget--slot--input inter gray size-14px radius-10px shadow-2px ${emailClasses}`}
                    placeholder="Email Address"
                    type="email"
                    value={enteredEmail}
                    onChange={emailChangedHandler}
                    onBlur={emailBlurHandler}
                    autoFocus
                />
                {emailIsTouched && (
                    <p style={{ marginLeft: '5px' }} className="no-padding margin-6px-V size-12px inter error-message">
                        {emailError}
                    </p>
                )}
            </div>
            <button type="submit" className={`forget--btn full-width orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}>
                REQUEST PASSWORD RESET
            </button>
            <div className="full-width flex-row-left-start">
                <NavLink to={'/admin-panel/login'} style={{ textDecoration: 'none' }} className={`space-none inter ${mode === 'dark-mode' ? 'gray' : 'orange'} size-14px margin-12px-H pointer`}>Login</NavLink>
            </div>
        </form>
    );
};

export default ForgetPassword;