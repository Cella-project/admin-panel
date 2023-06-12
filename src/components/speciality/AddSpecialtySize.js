import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { specialityControlActions } from '../../apis/actions';

import useInput from "../../hooks/useInput";

import './AddSpecialtySize.scss'
const AddSpecialtySizeForm = ({ popupToggle,data }) => {
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
        }
        return { isValid, error };
    });

    const titleClasses = titleIsTouched && !enteredTitleIsValid
        ? 'form-control-invalid'
        : '';

    const formSubmissionHandler = (e) => {
        e.preventDefault();
        dispatch(specialityControlActions.addSize({ "title": enteredTitle ,'speciality':data}, () => {
            resetTitleInput();
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { }}));
    }


    return (
        <form noValidate className="add-speciality-size" onSubmit={formSubmissionHandler}>
            <div className="full-width flex-col-left-start add-speciality-size--input-container">
                <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="title" >
                    Title
                </label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start add-speciality-size--input ${titleClasses}`}>
                    <i className="bi bi-person size-20px" />
                    <input
                        className="full-width gray margin-4px-H"
                        type={"text"}
                        placeholder={"Title of the Size"}
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
            <div className="add-speciality-size--actions flex-row-between full-width">
                <button
                    className={`add-speciality-size--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                    type="submit"
                >
                    Confirm
                </button>
                <button
                    className="add-speciality-size--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
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
export default AddSpecialtySizeForm
