import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { productActions, specialityControlActions } from '../../../apis/actions';
import { subCategoryMutations } from '../../../redux/mutations';

import useInput from '../../../hooks/useInput';

import './EditProduct.scss';

export const EditProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const mode = useSelector((state) => state.theme.mode);
    const productData = useSelector((state) => state.product.productData);
    const materials = useSelector(state => state.specialityControl.materials);
    const [currentPage, setCurrentPage] = useState(1);
    const [model, setModel] = useState(null);

    useEffect(() => {
        document.title = 'Edit product • Admin Panel';
        dispatch(productActions.getProductData(params.id));
        dispatch(subCategoryMutations.setSubCategoryData(null));
        dispatch(specialityControlActions.getMaterials(productData.speciality._id));
    }, [dispatch, params.id, productData.speciality._id]);

    const {
        value: enteredTitle,
        error: titleError,
        isTouched: titleIsTouched,
        valueChangeHandler: titleChangedHandler,
        inputBlurHandler: titleBlurHandler,
    } = useInput((value) => {
        const isValid = value.trim() !== '';
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter a title.';
        }
        else if (value.length < 3 || value.length > 80) {
            error = 'Please enter a title with at least 3 characters and at most 50 characters.';
        }
        return { isValid, error };
    }, productData.title);

    const {
        value: enteredDescription,
        error: descriptionError,
        isTouched: descriptionIsTouched,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
    } = useInput((value) => {
        const isValid = value.trim() !== '';
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter a description.';
        }
        return { isValid, error };
    }, productData.description);


    const {
        value: enteredMaterial,
        error: materialError,
        isTouched: materialIsTouched,
        valueChangeHandler: materialChangedHandler,
        inputBlurHandler: materialBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please select a material.';
        }
        return { isValid, error };
    }, productData.material);

    const {
        value: enteredPrice,
        error: priceError,
        isTouched: priceIsTouched,
        valueChangeHandler: priceChangedHandler,
        inputBlurHandler: priceBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please enter a price.';
        }
        else if (value <= 0) {
            error = 'Please enter a price greater than 0.';
        }
        return { isValid, error };
    }, productData.price);

    const handlePhotoAdd = (event) => {
        const album = {}
        const data = new FormData();
        data.append('path', 'products');
        data.append('file', event.target.files[0]);
        dispatch(productActions.addProductPicture(data, (response) => {
            const url = 'http://www.actore.store/api/file-manager/file/' + response.data.data;
            album.imgURL = url;
            dispatch(productActions.addProductImage({ _id: productData._id, imgURL: album.imgURL }));
        }));
    };

    const handlePhotoRemove = (_id) => {
        dispatch(productActions.deleteProductImage({ _id: productData._id, imgId: _id }));
    };

    const upload3DModelToServer = async (e) => {
        const data = new FormData();
        data.append('path', '3DModels');
        data.append('file', e.target.files[0]);
        dispatch(productActions.addProduct3DModel(data, (response) => {
            const url = 'http://www.actore.store/api/file-manager/file/' + response.data.data;
            setModel(url);
        }));
    };

    // Handle Price Change
    const [discountType, setDiscountType] = useState(productData.discount.discountType);
    const [discountValue, setDiscountValue] = useState(productData.discount.discountAmount);

    const handleDiscountTypeChange = (event) => {
        setDiscountType(event.target.value);
    };

    const handleDiscountValueChange = (event) => {
        setDiscountValue(+event.target.value);
    };

    const calculateNewPrice = () => {
        if (discountType === 'Percentage') {
            return enteredPrice - (enteredPrice * (discountValue / 100));
        } else if (discountType === 'Value') {
            return enteredPrice - discountValue;
        } else {
            return enteredPrice;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedProduct = {
            _id: productData._id,
        }

        if (enteredTitle !== productData.title) {
            updatedProduct.title = enteredTitle;
        }

        if (enteredDescription !== productData.description) {
            updatedProduct.description = enteredDescription;
        }

        if (+enteredPrice !== productData.price) {
            updatedProduct.price = +enteredPrice;
        }

        if (enteredMaterial.title !== productData.material && enteredMaterial.title !== '') {
            updatedProduct.material = enteredMaterial.title;
        }

        if (model) {
            updatedProduct.model3D = model;
        }

        const editedProduct = { ...updatedProduct };

        if (discountType !== 'None') {
            editedProduct.discount = {
                hasDiscount: true,
                discountType: discountType,
                discountAmount: discountValue
            };
        }

        dispatch(productActions.updateProduct(editedProduct,
            () => {
                navigate(`/admin-panel/products/${productData._id}`);
            }));
    };



    return (
        <div className='edit-product flex-row-center inter'>
            {
                productData &&
                <form onSubmit={handleSubmit} noValidate className=' flex-col-center full-width'>
                    <div className="full-width flex-row-center margin-12px-V">
                        <p
                            style={{ margin: '30px' }}
                            className="size-26px font-bold inter gray">Edit Product
                        </p>
                    </div>

                    <div className="edit-product--body white-bg full-width radius-10px shadow-2px">
                        <div className="edit-product--muiBox-root radius-10px shadow-2px">
                            <div className='edit-product--muiBox-root--main orange-bg radius-10px flex-row-between'>
                                <div className='flex-col-center padding-10px-H'>
                                    <div>
                                        <i className={`${mode === 'dark-mode' ? 'gray' : 'white'} bi bi-circle${currentPage >= 1 ? "-fill" : ""} white`}></i>
                                    </div>
                                    <div className={`${mode === 'dark-mode' ? 'gray' : 'white'} size-12px inter`}>
                                        1. Product information
                                    </div>
                                </div>
                                <div className='flex-col-center padding-10px-H'>
                                    <div>
                                        <i className={`${mode === 'dark-mode' ? 'gray' : 'white'} bi bi-circle${currentPage >= 2 ? "-fill" : ""} white`}></i>
                                    </div>
                                    <div className={`${mode === 'dark-mode' ? 'gray' : 'white'} size-12px inter`}>
                                        2. Product Album
                                    </div>
                                </div>
                                <div className='flex-col-center padding-10px-H'>
                                    <div>
                                        <i className={`${mode === 'dark-mode' ? 'gray' : 'white'} bi bi-circle${currentPage >= 3 ? "-fill" : ""} white`}></i>
                                    </div>
                                    <div className={`${mode === 'dark-mode' ? 'gray' : 'white'} size-12px inter`}>
                                        3. Product Pricing
                                    </div>
                                </div>
                            </div>
                        </div>
                        {currentPage === 1 &&
                            <div>
                                <div className='full-width flex-col-left-start edit-product--header'>
                                    <label className='pointer full-width text-shadow gray font-bold size-26px'>Product information</label>
                                </div>
                                <div className='full-width flex-col-left-start edit-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>Product title <span className='red'>*</span></label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-left-start edit-product--input `}>
                                        <i className='bi bi-person size-20px gray' />
                                        <input
                                            className='full-width gray margin-4px-H'
                                            type={'text'}
                                            placeholder={'Product Title'}
                                            id={'title'}
                                            value={enteredTitle}
                                            onChange={titleChangedHandler}
                                            onBlur={titleBlurHandler}
                                            autoFocus
                                        />
                                    </div>
                                    {titleIsTouched && (<div className="error-message">{titleError}</div>)}
                                </div>
                                <div className='full-width flex-col-left-start edit-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>Product description <span className='red'>*</span></label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-left-start edit-product--input`}>
                                        <textarea
                                            className='full-width gray margin-4px-H'
                                            type={'text'}
                                            placeholder={'Product description'}
                                            id={'description'}
                                            value={enteredDescription}
                                            onChange={descriptionChangedHandler}
                                            onBlur={descriptionBlurHandler}
                                            style={{ resize: 'none' }}
                                        />
                                    </div>
                                    {descriptionIsTouched && (<div className="error-message">{descriptionError}</div>)}
                                </div>
                                {materials && materials.length > 0 && (
                                    <div className='full-width flex-col-left-start edit-product--input-container'>
                                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='material'>
                                            Materials :<span className='red'>*</span>
                                        </label>
                                        <div className={`full-width light-gray radius-10px white-bg flex-row-top-start edit-product--input `}>
                                            <i className='bi bi-pin-map size-20px gray' />
                                            <Select
                                                className='edit-product--select full-width gray margin-4px-H'
                                                styles={{
                                                    option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit' }),
                                                    menu: (provided) => ({
                                                        ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`,
                                                        position: 'relative',
                                                    }),
                                                }}
                                                value={enteredMaterial}
                                                defaultInputValue={enteredMaterial}
                                                disabled={materials.length === 0}
                                                placeholder={'Select Material'}
                                                options={materials.map(m => ({ label: m.title, value: { label: m.title, title: m.title, id: m._id } }))}
                                                onChange={(subCategory) =>
                                                    materialChangedHandler({ target: { id: "subCategory", label: subCategory.title, value: subCategory.value } })
                                                }
                                                onBlur={materialBlurHandler}
                                            />
                                        </div>
                                        {materialIsTouched && (<div className="error-message">{materialError}</div>)}
                                    </div>
                                )
                                }
                                <div className="edit-product--actions flex-row-between full-width">
                                    <button
                                        className="edit-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                        onClick={() => {
                                            navigate(`/admin-panel/products/${productData._id}`);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={`edit-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                                        onClick={() => {
                                            setCurrentPage(2);
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        }
                        {currentPage === 2 && <div>
                            <div className='full-width flex-col-left-start edit-product--header'>
                                <label className='pointer full-width text-shadow gray font-bold size-26px'>Product Album</label>
                            </div>
                            <div className='full-width flex-col-left-start edit-product--input-container'>
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>Product images : <span className='red'>*</span></label>
                            </div>
                            <div className="edit-product--photo flex-col-center">
                                <div className="flex-row-center flex-wrap">
                                    {productData.album.map((photo, index) => (
                                        <div className="edit-product--photo--item padding-10px-H flex-col-center " key={index}>
                                            <div className={`inter ${mode === 'dark-mode' ? 'gray' : 'orange'} margin-6px-V`}> Photo number : {index + 1}</div>
                                            <img src={photo.URL} alt={` ${index}`} />
                                            <div className="flex-row-center full-width margin-6px-V ">
                                                <button className='edit-product--gallary ' type="button" onClick={() => handlePhotoRemove(photo._id)}>
                                                    <i className="bi bi-trash pointer size-20px gray"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-row-center full-width">
                                    <label htmlFor="photos" className={`edit-product--actions--button radius-10px orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`}>
                                        Add photo
                                    </label>
                                    <input type="file" id="photos" onChange={handlePhotoAdd} hidden />
                                </div>
                            </div>
                            <div className='full-width flex-col-left-start add-product--input-container'>
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>Product 3D Model: </label>
                            </div>
                            {productData.model3D === 'No Model' ?
                                <>
                                    <div className="flex-row-center full-width">
                                        <label htmlFor="3D" className={`add-product--actions--button radius-10px orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`}>
                                            Add 3D Model
                                        </label>
                                        <input type="file" id="3D" onChange={upload3DModelToServer} hidden />
                                    </div>
                                    {model &&
                                        <div className="flex-row-center full-width">
                                            <p className="no-space green size-16px">Model added</p>
                                        </div>
                                    }
                                </>
                                :
                                <>
                                    <div className="flex-row-center full-width">
                                        <label htmlFor="3D" className={`add-product--actions--button radius-10px orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`}>
                                            Edit 3D Model
                                        </label>
                                        <input type="file" id="3D" onChange={upload3DModelToServer} hidden />
                                    </div>
                                    {model &&
                                        <div className="flex-row-center full-width">
                                            <p className="no-space green size-16px">Model edited</p>
                                        </div>
                                    }
                                </>
                            }
                            <div className="edit-product--actions flex-row-between full-width">
                                <button
                                    className="edit-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                    onClick={() => {
                                        setCurrentPage(1);
                                    }}
                                >
                                    Back
                                </button>
                                <button
                                    className={`edit-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                                    onClick={() => {
                                        setCurrentPage(3);
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </div>}

                        {currentPage === 3 &&
                            <div>
                                <div className='full-width flex-col-left-start edit-product--header'>
                                    <label className='pointer full-width text-shadow gray font-bold size-26px'>Product Pricing</label>
                                </div>
                                <div className="edit-product--price full-width flex-col-center edit-product--input-container">
                                    <div>
                                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor="price">Price:<span className='red'>*</span></label>
                                        <input className="margin-12px-H gray edit-product--input radius-10px" min='0' type="number" id="price" value={enteredPrice} onChange={priceChangedHandler} onBlur={priceBlurHandler} />
                                    </div>
                                    {priceIsTouched && (<div className="error-message">{priceError}</div>)}
                                    <div className='full-width edit-product--price--discount'>
                                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>Discount:<span className='red'>*</span></label>
                                        <div className='margin-6px-V'>
                                            <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>
                                                <input className="pointer margin-12px-H" type="radio" name="discount-type" value="None" checked={discountType === 'None'} onChange={handleDiscountTypeChange} />
                                                No discount
                                            </label>
                                            <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>
                                                <input className="pointer margin-12px-H" type="radio" name="discount-type" value="Percentage" checked={discountType === 'Percentage'} onChange={handleDiscountTypeChange} />
                                                Percentage
                                            </label>
                                            <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>
                                                <input className="pointer margin-12px-H" type="radio" name="discount-type" value="Value" checked={discountType === 'Value'} onChange={handleDiscountTypeChange} />
                                                Value
                                            </label>
                                        </div>
                                        {discountType !== 'None' && (
                                            <div className='full-width'>
                                                <div className='margin-6px-V flex-row-center  full-width'>
                                                    <label className='pointer text-shadow gray font-bold margin-6px-H' htmlFor="discount-value">{discountType === 'Percentage' ? 'Percentage' : 'Value'}:</label>
                                                    <input className='gray edit-product--input radius-10px' min='0' type="number" id="discount-value" value={discountValue} onChange={handleDiscountValueChange} />
                                                </div>
                                                <div className='flex-row-center'>
                                                    <label className='text-shadow gray font-bold margin-6px-H'>New price:</label>
                                                    <div className={`${mode === 'dark-mode' ? 'gray' : 'orange'} font-bold size-26px`}>{calculateNewPrice()}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="edit-product--actions flex-row-between full-width">
                                    <button
                                        className="edit-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                        onClick={() => {
                                            setCurrentPage(2);
                                        }}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className={`edit-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                                        type="submit"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>}
                    </div>

                </form>
            }



        </div >
    );
}

export default EditProduct
