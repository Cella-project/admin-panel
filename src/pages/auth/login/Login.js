import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useInput from '../../../hooks/useInput';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../../apis/actions'

import './Login.scss';

const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const mode = useSelector((state) => state.theme.mode);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Login • Admin Panel';

        if (localStorage.getItem('Token')) {
            // Redirect to the dashboard
            navigate('/');
        }
    }, [navigate]);

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
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        error: passwordError,
        isTouched: passwordIsTouched,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => {
        let error = '';
        let isValid = true;
        if (!value) {
            error = 'Password number is required';
            isValid = false;
        } else if (value.length < 8) {
            error = 'Password must be at least 8 digits'
            isValid = false;
        }
        return { error, isValid };
    });
    const emailClasses = emailIsTouched && !enteredEmailIsValid
        ? 'form-control-invalid'
        : '';

    const passwordClasses = passwordIsTouched && !enteredPasswordIsValid
        ? 'form-control-invalid'
        : '';

    let formIsValid = false;

    if (enteredPasswordIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }
        const formData = {
            email: enteredEmail.trim().toLowerCase(),
            password: enteredPassword
        };

        dispatch(authActions.login(formData));
    };

    return (
        <form noValidate className='login flex-col-left-start white-bg radius-5px shadow-2px' onSubmit={handleLogin}>
            <div className={`login--slot full-width flex-col-left-start margin-12px-V `}>
                <i className={`login--slot--icon bi bi-envelope size-20px ${mode === 'dark-mode' ? 'gray' : 'orange'}`} />
                <p style={{ marginLeft: '5px' }} className="no-padding margin-6px-V size-16px inter gray">Email Address</p>
                <input
                    className={`login--slot--input login--slot--input--error inter gray size-14px radius-10px shadow-2px ${emailClasses}`}
                    placeholder="Email Address"
                    type="text"
                    value={enteredEmail}
                    onChange={emailChangedHandler}
                    onBlur={emailBlurHandler}
                    autoFocus
                />
            </div>
            {emailIsTouched && (
                <p style={{ marginLeft: '5px' }} className="no-padding margin-6px-V size-12px inter error-message">
                    {emailError}
                </p>
            )}
            <div className={`login--slot full-width flex-col-left-start margin-12px-V `}>
                <i className={`login--slot--icon bi bi-key gray size-18px ${mode === 'dark-mode' ? 'gray' : 'orange'}`} />
                <p style={{ marginLeft: '5px' }} className="no-padding margin-6px-V size-16px inter gray">Password</p>
                <input
                    className={`login--slot--input inter gray size-14px radius-10px shadow-2px ${passwordClasses}`}
                    placeholder="Password"
                    type={passwordShown ? "text" : "password"}
                    value={enteredPassword}
                    onChange={passwordChangedHandler}
                    onBlur={passwordBlurHandler}
                    autoComplete="off"
                />
                <i className={`login--slot--icon-Right bi bi-eye${!passwordShown ? "-slash" : ""} size-20px pointer ${mode === 'dark-mode' ? 'gray' : 'orange'}`} onClick={() => setPasswordShown(!passwordShown)} />

            </div>
            {passwordIsTouched && (
                <p style={{ marginLeft: '5px' }} className="no-padding margin-6px-V size-12px inter error-message">
                    {passwordError}
                </p>
            )}
            <button type="submit" className={`login--btn full-width orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}>
                LOG IN
            </button>
            <div className="full-width flex-row-left-start">
                <NavLink to={'/login/forget-password'} style={{ textDecoration: 'none' }} className={`space-none inter ${mode === 'dark-mode' ? 'gray' : 'orange'} size-14px margin-12px-H pointer`}>Forget password</NavLink>
            </div>
        </form>
    );
};

export default Login;
