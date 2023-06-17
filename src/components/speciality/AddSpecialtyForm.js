import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { specialityActions } from '../../apis/actions';

import useInput from "../../hooks/useInput";

import './AddSpecialtyForm.scss';

const AddSpecialtyForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.theme.mode);

    const {
        value: enteredTitle,
        isValid: enteredTitleIsValid,
        error: titleError,
        isTouched: titleIsTouched,
        valueChangeHandler: titleChangedHandler,
        inputBlurHandler: titleBlurHandler,
        reset: resetTitleInput,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter a title.';
        } else if (value.length < 3 || value.length > 50) {
            error = 'Please enter a title between 3 and 50 characters.';
        }
        return { isValid, error };
    });

    const titleClasses = titleIsTouched && !enteredTitleIsValid
        ? 'form-control-invalid'
        : '';

    const formSubmissionHandler = (e) => {
        e.preventDefault();
        dispatch(specialityActions.addSpeciality({ "title": enteredTitle },
        () => {
            resetTitleInput();
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { }
        }));
    }


    return (
        <form noValidate className="add-speciality" onSubmit={formSubmissionHandler}>
            <div className="full-width flex-col-left-start add-payment--input-container">
                <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="title" >
                    Title
                </label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start add-payment--input ${titleClasses}`}>
                    <i className="bi bi-person size-20px" />
                    <input
                        className="full-width gray margin-4px-H"
                        type={"text"}
                        placeholder={"Title of the specialty"}
                        id={"title"}
                        value={enteredTitle}
                        onChange={titleChangedHandler}
                        onBlur={titleBlurHandler}
                    />
                </div>
                {titleIsTouched && (
                    <div className="error-message">{titleError}</div>
                )}
            </div>
            <div className="add-payment--actions flex-row-between full-width">
                <button
                    className={`add-payment--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                    type="submit"
                >
                    Confirm
                </button>
                <button
                    className="add-payment--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                    onClick={() => {
                        resetTitleInput();
                        popupToggle(false);
                        document.getElementById("dashboard-view").style.zIndex = 10;
                        window.onscroll = function () { };
                    }} >
                    Cancel
                </button>
            </div>
        </form >
    )
}
export default AddSpecialtyForm
