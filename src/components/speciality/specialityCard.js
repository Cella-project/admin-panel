import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { specialityActions } from '../../apis/actions';
import useInput from '../../hooks/useInput';

import './SpecialityCard.scss';

const SpecialityCard = ({ speciality }) => {
    const [editMode, setEditMode] = useState(false);
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
    }, speciality.title);


    const handleChangeState = async () => {
        dispatch(specialityActions.changeSpecialityState(speciality._id,()=>setEditMode(false) ));
    };

    const handleDelete = () => {
        dispatch(specialityActions.deleteSpeciality(speciality._id));
    };

    const handleUpdateName = async (e) => {
        e.preventDefault();
        dispatch(specialityActions.updateSpeciality({ _id: speciality._id, title: enteredTitle },()=>setEditMode(false)));
    }

    return (
        <form noValidate onSubmit={handleUpdateName} className='speciality-card lists-card--info gray shadow-5px size-16px margin-10px-V inter radius-15px white-bg full-width flex-row-between2col'>
            <i className={`bi bi-bookmarks margin-12px-H size-34px ${mode === 'dark-mode' ? 'gray' : 'orange'}`} />
            <div className='flex-col-center speciality-card--info padding-10px-H'>
                <div className='flex-row-between2col full-width '>
                    <div className='margin-2px-V speciality-card--info--child'>
                        <div className='lists-card--info--disc--hide margin-6px-H font-bold'>Title: </div>
                        <input
                            className={`speciality-card--input${editMode ? '--editing' : ''} ${mode === 'dark-mode' ? 'gray' : 'gray'}`}
                            value={enteredTitle}
                            onChange={titleChangedHandler}
                            onBlur={titleBlurHandler}
                            disabled={!editMode}
                        />
                    </div>
                    {titleIsTouched && (
                        <div className="error-message">{titleError}</div>
                    )}
                    <div className='flex-row-left-start margin-2px-V speciality-card--info--child'>
                        <div className='lists-card--info--disc--hide margin-6px-H font-bold'>Status: </div>
                        <div className={`${speciality.status === 'Active' ? 'green' : 'red'}`}>{speciality.status}</div>
                    </div>
                    {editMode ?
                        <div className='flex-row-center2col speciality-card--actions'>
                            <button
                                className={`pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg speciality-card--button margin-6px-H`}
                                onClick={() => {
                                    setEditMode(false);
                                    resetTitleInput(); // Add this line to reset the input data
                                }}
                                type='button'
                            >
                                Cancel
                            </button>
                            <input
                                className={`pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg speciality-card--button margin-6px-H`}
                                onClick={handleChangeState}
                                value='Change State'
                                type='button'
                            />
                            <button
                                className={`pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg speciality-card--button margin-6px-H`}
                                disabled={!enteredTitleIsValid}
                                type='submit'
                            >
                                Save
                            </button>
                        </div>
                        :
                        <div className='flex-row-right-start2col speciality-card--actions'>
                            <input
                                className={`pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg speciality-card--button margin-6px-H`}
                                onClick={() => setEditMode(true)}
                                value='Edit'
                                type='button'
                            />
                            <input
                                className={`pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg speciality-card--button margin-6px-H`}
                                onClick={handleDelete}
                                value='Delete'
                                type='button'
                            />
                        </div>
                    }
                </div>
                {!editMode && <div className='flex-row-right-start full-width' >
                    <Link to={`/specialty/${speciality._id}`} className="flex-row-right-start margin-6px-V size-12px pointer lists-card--link speciality-card--info--child">
                        Main Categories
                        <i className="bi bi-arrow-right margin-4px-H" style={{ width: 'fit-content' }} />
                    </Link>
                </div>

                }

            </div>
        </form>
    )
}

export default SpecialityCard;