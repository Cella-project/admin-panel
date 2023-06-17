import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { specialityControlActions } from '../../apis/actions';
import { ChromePicker } from 'react-color'
import useInput from "../../hooks/useInput";

import './EditSpecialtyColor.scss';

const EditSpecialtyColorForm = ({ popupToggle, data }) => {
    const dispatch = useDispatch();
    const [color, setColor] = useState(data.hexCode);
    const [hexColor, setHexColor] = useState(data.hexCode);

    const mode = useSelector(state => state.theme.mode);

    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
        setHexColor(newColor.hex);
    };

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
    }, data.title);

    const titleClasses = titleIsTouched && !enteredTitleIsValid
        ? 'form-control-invalid'
        : '';

    const formSubmissionHandler = (e) => {
        e.preventDefault();
        
        const updatedData = {};
        if (enteredTitle !== data.title) {
            updatedData.title = enteredTitle;
        }
        if (color !== data.hexCode) {
            updatedData.hexCode = color;
        }
        dispatch(specialityControlActions.updateColor({ ...updatedData, "_id": data._id },
            () => {
                resetTitleInput();
                popupToggle(false);
                document.getElementById("dashboard-view").style.zIndex = 10;
                window.onscroll = function () { }
            }));
    }

    return (
        <form noValidate className="edit-speciality-color" onSubmit={formSubmissionHandler}>
            <div className="full-width flex-col-left-start edit-speciality-color--input-container">
                <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="title" >
                    Title
                </label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-speciality-color--input ${titleClasses}`}>
                    <i className="bi bi-person size-20px" />
                    <input
                        className="full-width gray margin-4px-H"
                        type={"text"}
                        placeholder={"Title of the color"}
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
            <div className="full-width flex-col-left-start edit-speciality-color--input-container">
                <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="color" >
                    Color
                </label>
                <div className="full-width flex-col-center edit-speciality-color--input-container">
                    <ChromePicker color={hexColor} onChange={handleColorChange} />
                </div>
            </div>
            <div className="edit-speciality-color--actions flex-row-between full-width">
                <button
                    className={`edit-speciality-color--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                    type="submit"
                >
                    Confirm
                </button>
                <button
                    className="edit-speciality-color--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
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
export default EditSpecialtyColorForm
