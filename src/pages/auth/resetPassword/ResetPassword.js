import React, { useState, useEffect } from "react";
import useInput from "../../../hooks/useInput";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../apis/actions";

import './ResetPassword.scss';


const ResetPassword = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmedPasswordShown, setConfirmedPasswordShown] = useState(false);
    const [newPasswordChanged, setNewPasswordChanged] = useState(false);

    const email = useSelector((state) => state.auth.forgetPasswordCycle.email);
    const OTP = useSelector((state) => state.auth.forgetPasswordCycle.OTP);

    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);

    useEffect(() => {
        document.title = 'Reset Password • Admin Panel';
    }, []);

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        error: passwordError,
        isTouched: passwordIsTouched,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&./_=+^])[A-Za-z\d@$!%*#?&./_=+^]{8,}$/;
        const isValid = regex.test(value);
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter a password.';
        } else if (!isValid) {
            error = 'Please enter a password with at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character.';
        }
        return { isValid, error };
    });

    const {
        value: confirmedPassword,
        isValid: confirmedPasswordIsValid,
        error: confirmedPasswordError,
        isTouched: confirmedPasswordIsTouched,
        valueChangeHandler: confirmedPasswordChangedHandler,
        inputBlurHandler: confirmedPasswordBlurHandler,
    } = useInput((value) => {
        let error = "";
        if (value !== enteredPassword) {
            error = "Passwords do not match.";
        }
        return { isValid: !error, error };
    });

    const passwordClasses =
        passwordIsTouched && !enteredPasswordIsValid
            ? "form-control-invalid"
            : "";
    const confirmedPasswordClasses =
        (confirmedPasswordIsTouched && !confirmedPasswordIsValid) ||
            (newPasswordChanged && confirmedPassword !== enteredPassword)
            ? "form-control-invalid"
            : "";

    let formIsValid = false;
    if (!enteredPasswordIsValid || !confirmedPasswordIsValid || confirmedPassword !== enteredPassword) {
        formIsValid = true;

    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (formIsValid) {
            return;
        }
        const formData = {
            email: email,
            otp: OTP,
            newPassword: enteredPassword,
        };

        dispatch(authActions.resetPassword(formData));
    };
    return (
        <form noValidate onSubmit={handleResetPassword} className='reset flex-col-left-start white-bg radius-5px shadow-2px'>
            <div className="reset--slot full-width flex-col-left-start margin-12px-V">
                <p
                    style={{ marginLeft: '5px' }}
                    className="no-padding margin-6px-V size-16px inter gray">New Password
                </p>
                <i className={`reset--slot--icon ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px bi bi-key`}></i>
                <input
                    className={`reset--slot--input inter gray size-14px radius-10px shadow-2px ${passwordClasses}`}
                    placeholder="New password"
                    type={passwordShown ? "text" : "password"}
                    value={enteredPassword}
                    onChange={passwordChangedHandler}
                    onBlur={passwordBlurHandler}
                    autoFocus
                    autoComplete="off"
                />
                <i
                    className={`reset--slot--icon-Right ${mode === 'dark-mode' ? 'gray' : 'mint-green'} bi bi-eye${!passwordShown ? "-slash" : ""} size-20px pointer`}
                    onClick={() => setPasswordShown(!passwordShown)}
                />
            </div>
            {passwordError && (
                <p className="error-message inter">{passwordError}</p>
            )}
            <div className="reset--slot full-width flex-col-left-start margin-12px-V">
                <p
                    style={{ marginLeft: '5px' }}
                    className="no-padding margin-6px-V size-16px inter gray">Confirm New Password
                </p>
                <i className={`reset--slot--icon ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px bi bi-key`}></i>
                <input
                    className={`reset--slot--input inter gray size-14px radius-10px shadow-2px ${confirmedPasswordClasses}`}
                    placeholder="Confirm New Password"
                    type={confirmedPasswordShown ? "text" : "password"}
                    value={confirmedPassword}
                    onChange={(event) => {
                        confirmedPasswordChangedHandler(event);
                        setNewPasswordChanged(true);
                    }}
                    onBlur={confirmedPasswordBlurHandler}
                    autoComplete="off"
                />
                <i
                    className={`reset--slot--icon-Right ${mode === 'dark-mode' ? 'gray' : 'mint-green'} bi bi-eye${!confirmedPasswordShown ? "-slash" : ""} size-20px pointer`}
                    onClick={() => setConfirmedPasswordShown(!confirmedPasswordShown)}
                />
            </div>
            {confirmedPasswordError && (
                <p className="error-message inter">{confirmedPasswordError}</p>
            )}
            <button type='submit' className={`reset--btn full-width mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}>
                RESET PASSWORD
            </button>
            <div className="full-width flex-row-left-start">
                <NavLink to={'/login/forget-password'} style={{ textDecoration: 'none' }} className={`space-none inter ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-14px margin-12px-H pointer`}>Back</NavLink>
            </div>
        </form>

    );
};

export default ResetPassword;