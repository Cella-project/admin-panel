import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { productActions, specialityActions, specialityControlActions } from '../../apis/actions';
import { specialityMutations } from '../../redux/mutations';
import Loading from '../global/Loading';

import './AddProductTagForm.scss';

const AddProductTagForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.theme.mode);
    const tags = useSelector(state => state.specialityControl.tags);
    const category = useSelector(state => state.speciality.categoryData);
    const product = useSelector(state => state.product.productData);

    // Handle Tag Select
    const handleTagSelect = (tag) => {
        const selectedTag = tag;
        const index = product.tags.findIndex((t) => t.tag === selectedTag.target.label);
        if (index === -1) {
            dispatch(productActions.addProductTag({
                _id: product._id,
                tag: selectedTag.target.label
            }));
        } else {
            dispatch(productActions.deleteProductTag({
                _id: product._id,
                tagId: product.tags[index]._id
            }));
        }
    };

    const handleTagDelete = (tagId) => {
        dispatch(productActions.deleteProductTag({
            _id: product._id,
            tagId: tagId
        }));
    };
    useEffect(() => {
        if (category === null) {
            dispatch(specialityActions.getCategoryData(product.category._id));
            dispatch(specialityMutations.setCategoryData(product.category._id));
        }
        else if (category.type === 'Sub') {
            dispatch(specialityActions.getCategoryData(category.parent._id));
            dispatch(specialityMutations.setCategoryData(category.parent._id));
        }
        else if (category.type === 'Main') {
            dispatch(specialityActions.getSpecialityData(category.parent._id));
            dispatch(specialityMutations.setSpecialityData(category.parent._id));
            dispatch(specialityControlActions.getTags(category.parent._id));
        }

    }, [dispatch, category, product.category._id]);




    const formSubmissionHandler = (e) => {
        e.preventDefault();
        popupToggle(false);
        document.getElementById("dashboard-view").style.zIndex = 10;
        window.onscroll = function () { }
    };


    return (
        <form noValidate className="add-product-tag" onSubmit={formSubmissionHandler}>
            {
                tags && tags.length > 0 ? (
                    <div className='full-width flex-col-left-start add-product-tag--input-container'>
                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='tags'>
                            Tags :<span className='red'>*</span>
                        </label>
                        <div className={`full-width light-gray radius-10px white-bg flex-row-left-start add-product-tag--input `}>
                            <i className='bi bi-pin-map size-20px gray' />
                            <Select
                                multiple
                                className='add-product--select full-width gray margin-4px-H'
                                styles={{
                                    option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` : 'inherit' }),
                                    menu: (provided) => ({
                                        ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`
                                    }),
                                }}
                                disabled={tags.length === 0}
                                placeholder='Select Tags'
                                options={tags.map((tag) => ({
                                    label: tag.title,
                                    value: { label: tag.title, title: tag.title, id: tag._id },
                                }))}
                                onChange={(tag) =>
                                    handleTagSelect({ target: { id: tag.value.id, label: tag.value.title, value: tag.value.title } })
                                }
                            />
                        </div>
                        <div className="flex-row-between flex-wrap ">
                            {product.tags.map((tag, index) => (
                                <div key={index} className="add-product-tag--selected-item shadow-2px radius-15px flex-row-between size-14px lavender-bg text-shadow">
                                    <span className={`margin-4px-H ${mode === 'dark-mode' ? 'white' : 'gray'}`}>{tag.tag}</span>
                                    <button className={`add-product-tag--input--number--button bi bi-trash pointer ${mode === 'dark-mode' ? 'white' : 'gray'} size-20px pointer `} type="button" onClick={() => handleTagDelete(tag._id)}></button>
                                </div>
                            ))}
                        </div>
                    </div>
                ): <Loading />
            }
            <div className="add-product-tag--actions flex-row-between full-width">
                <button
                    className={`add-product-tag--actions--button full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                    type="submit"
                >
                    Confirm
                </button>
            </div>
        </form >
    )
}

export default AddProductTagForm;