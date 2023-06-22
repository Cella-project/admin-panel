import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mainCategoryActions } from '../../apis/actions';
import Canvas from '../../components/common/Canvas';
import Popup from '../common/PopupForm';

import useInput from '../../hooks/useInput';

import './MainCategoryCard.scss';

const MainCategoryCard = ({ category }) => {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);

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
    }, category.title);

    const handleChangeState = async () => {
        dispatch(mainCategoryActions.changeMainCategoryState(category._id));
    };

    const handleDelete = () => {
        dispatch(mainCategoryActions.deleteMainCategory(category._id));
    };

    let formIsValid = false;
    if (enteredTitleIsValid) {
        formIsValid = true;
    }
    const titleClasses = titleIsTouched && !enteredTitleIsValid
        ? 'form-control-invalid'
        : '';

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!formIsValid && enteredTitle !== category.title) {
            return;
        }
        dispatch(mainCategoryActions.updateMainCategory({ _id: category._id, title: enteredTitle }, () => {
            setEditMode(false);
        }));
    }

    const [popupShown, setPopupShown] = useState(false);

    const handleClick = () => {
        setPopupShown(true);
        document.getElementById('dashboard-view').style.zIndex = 60;
        const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
        window.onscroll = () => {
            window.scrollTo(LeftScroll, TopScroll);
        };
    }

    return (
        <div className='category-card lists-card--info gray shadow-5px size-16px margin-10px-V inter radius-15px white-bg full-width flex-row-left-start2col'>
            {popupShown &&
                <Popup popupToggle={setPopupShown} header={'Edit Main Category'} data={category} />
            }
            <div className='category-card--img flex-row-center'>
                {category.img === 'No Image' ?
                    <Canvas name={category.title} borderRadius='50%' width={55} height={55} fontSize={'42px'} />
                    :
                    <img src={category.img} className='white-bg' alt="" />
                }
                {editMode && <div className={`category-card--img--edit bi bi-pencil ${mode === 'dark-mode' ? 'gray-bg' : 'orange-bg'} size-12px pointer radius-circular white`} onClick={handleClick} />}
            </div>
            <div className='flex-col-center category-card--info padding-10px-H'>
                <div className='flex-row-between2col full-width '>
                    <div className='margin-2px-V category-card--info--child'>
                        <div className={`lists-card--info--disc--hide margin-6px-H font-bold ${titleClasses}`}>Title: </div>
                        <input
                            className={`category-card--input${editMode ? '--editing' : ''} ${mode === 'dark-mode' ? 'gray' : 'gray'}`}
                            value={enteredTitle}
                            onChange={titleChangedHandler}
                            onBlur={titleBlurHandler}
                            disabled={!editMode}
                        />
                    </div>
                    {titleIsTouched && (
                        <div className="error-message">{titleError}</div>
                    )}
                    <div className='flex-row-left-start margin-2px-V category-card--info--child'>
                        <div className='lists-card--info--disc--hide margin-6px-H font-bold'>Status: </div>
                        <div className={`${category.status === 'Active' ? 'green' : 'red'}`}>{category.status}</div>
                    </div>
                    {editMode ?
                        <div className='flex-row-between2col category-card--actions'>
                            <button
                                className={`pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg category-card--button margin-6px-H`}
                                onClick={() => {
                                    setEditMode(false);
                                    resetTitleInput(); // Add this line to reset the input data
                                }}
                                type='button'
                            >
                                Cancel
                            </button>
                            <input
                                className={`pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg category-card--button margin-6px-H`}
                                onClick={handleChangeState}
                                value='Change State'
                                type='button'
                            />
                            <button
                                className={`pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg category-card--button margin-6px-H`}
                                disabled={!enteredTitleIsValid}
                                type='submit'
                                onClick={handleEdit}
                            >
                                Save
                            </button>
                        </div>
                        :
                        <div className='flex-row-center2col category-card--actions'>
                            <input
                                className={`pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg category-card--button margin-6px-H`}
                                onClick={() => setEditMode(true)}
                                value='Edit'
                                type='button'
                            />
                            <input
                                className={`pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg category-card--button margin-6px-H`}
                                onClick={handleDelete}
                                value='Delete'
                                type='button'
                            />
                        </div>
                    }
                </div>
                {!editMode && <div className='flex-row-right-start full-width' >
                    <Link to={`/specialty/mainCategory/${category._id}`} className="flex-row-right-start margin-6px-V size-12px pointer lists-card--link category-card--info--child">
                        Sub Categories
                        <i className="bi bi-arrow-right margin-4px-H" style={{ width: 'fit-content' }} />
                    </Link>
                </div>

                }

            </div>

        </div>
    )
}

export default MainCategoryCard;
