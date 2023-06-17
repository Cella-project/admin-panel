import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { subCategoryActions } from '../../apis/actions';

import useInput from "../../hooks/useInput";

import './AddSubCategoryForm.scss'
const AddSubCategoryForm = ({ popupToggle,data }) => {
    const [photoFile, setPhotoFile] = useState('No Image');
    const [subCategory, setSubCategory] = useState('No Image');
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

    const uploadSubCategory = async (e) => {
        setPhotoFile(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append('path', 'category/profile');
        data.append('file', e.target.files[0]);
        dispatch(subCategoryActions.addSubCategoryPicture(data, (response) => {
            setSubCategory('http://143.244.196.79:4012/api/file-manager/' + response.data.data);
        }))
    }

    const titleClasses = titleIsTouched && !enteredTitleIsValid
        ? 'form-control-invalid'
        : '';

    const formSubmissionHandler = (e) => {
        e.preventDefault();
        dispatch(subCategoryActions.addSubCategory({ "title": enteredTitle ,"img":subCategory,"type":"Sub","parent":data }, () => {
            resetTitleInput();
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { }
        }));

    }


    return (
        <form noValidate className="add-category" onSubmit={formSubmissionHandler}>
            <div className="full-width flex-col-left-start add-category--input-container">
                <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="title" >
                    Title
                </label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start add-category--input ${titleClasses}`}>
                    <i className="bi bi-person size-20px" />
                    <input
                        className="full-width gray margin-4px-H"
                        type={"text"}
                        placeholder={"Title of the SubCategory"}
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
            <div className="full-width flex-col-left-start add-category--input-container">
                <div className="full-width flex-col-left-start add-category--input-container">
                    <div className='add-category--change-img full-width flex-col-top-start'>
                        <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="photo">
                            Photo
                        </label>
                        <label className={`add-category--change-img--tag full-width flex-row-center gray open-sans pointer ${photoFile !== 'No Image' ? 'hide' : ''}`} htmlFor='photo'>
                            <label className={`bi bi-image size-40px full-width flex-row-center white-bg pointer`} htmlFor="photo" />
                            <input
                                className="full-width gray margin-4px-H"
                                type="file"
                                id="photo"
                                accept="image/*"
                                onChange={uploadSubCategory}
                            />
                        </label>
                    </div>
                    <label className={`add-category--img flex-col-center ${subCategory === 'No Image' ? 'hide' : ''} full-width pointer`} htmlFor='photo'>
                        <img src={subCategory} alt='SubCategory' />
                    </label>
                    <button
                        type="button"
                        className={`add-admin--actions--button${subCategory === 'No Image' ? '-hide' : ''} margin-4px-V full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                        onClick={() => { setSubCategory('No Image'); }}
                    >
                        Clear
                    </button>
                </div>
            </div>
            <div className="add-category--actions flex-row-between full-width">
                <button
                    className={`add-category--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                    type="submit"
                >
                    Confirm
                </button>
                <button
                    className="add-category--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
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
export default AddSubCategoryForm
