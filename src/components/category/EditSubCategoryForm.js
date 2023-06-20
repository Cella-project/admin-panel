import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { subCategoryActions } from '../../apis/actions';

import './EditSubCategoryForm.scss'
const EditSubCategoryForm = ({ popupToggle, data }) => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.theme.mode);

    const [photoFile, setPhotoFile] = useState(data.img);
    const [subCategory, setSubCategory] = useState(data.img);

    const uploadSubCategory = async (e) => {
        setPhotoFile(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append('path', 'category/profile');
        data.append('file', e.target.files[0]);
        dispatch(subCategoryActions.addSubCategoryPicture(data, (response) => {
            setSubCategory('http://www.actore.store/api/file-manager/file/' + response.data.data);
        }))
    }

    const formSubmissionHandler = (e) => {
        e.preventDefault();
        dispatch(subCategoryActions.updateSubCategory({ _id: data._id, img: subCategory }, () => {
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { };
        }));
    }

    return (
        <form noValidate className="edit-category" onSubmit={formSubmissionHandler}>
            <div className="full-width flex-col-left-start edit-category--input-container">
                <div className="full-width flex-col-left-start edit-category--input-container">
                    <div className='edit-category--change-img full-width flex-col-top-start'>
                        <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="photo">
                            Photo
                        </label>
                        <label className={`edit-category--change-img--tag full-width flex-row-center gray open-sans pointer ${photoFile !== 'No Image' ? 'hide' : ''}`} htmlFor='photo'>
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
                    <label className={`edit-category--img flex-col-center ${subCategory === 'No Image' ? 'hide' : ''} full-width pointer`} htmlFor='photo'>
                        <img src={subCategory} alt='' />
                    </label>
                    <button
                        type="button"
                        className={`edit-category--actions--button${subCategory === 'No Image' ? '-hide' : ''} margin-4px-V full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                        onClick={() => { setSubCategory('No Image'); }}
                    >
                        Clear
                    </button>
                </div>
            </div>
            <div className="edit-category--actions flex-row-between full-width">
                <button
                    className={`edit-category--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                    type="submit"
                >
                    Confirm
                </button>
                <button
                    className="edit-category--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                    onClick={() => {
                        popupToggle(false);
                        setSubCategory('No Image');
                        document.getElementById("dashboard-view").style.zIndex = 10;
                        window.onscroll = function () { };
                    }} >
                    Cancel
                </button>
            </div>
        </form >
    )
}
export default EditSubCategoryForm;
