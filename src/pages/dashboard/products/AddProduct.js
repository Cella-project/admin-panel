import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { mainCategoryActions, subCategoryActions, specialityControlActions, productActions, storeActions } from '../../../apis/actions';
import { mainCategoryMutations, subCategoryMutations, specialityControlMutations, storeMutations } from '../../../redux/mutations';

import useInput from '../../../hooks/useInput';

import './AddProduct.scss';

export const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mode = useSelector((state) => state.theme.mode);
    const stores = useSelector(state => state.store.stores);
    const mainCategories = useSelector((state) => state.mainCategory.mainCategories);
    const subCategories = useSelector((state) => state.subCategory.subCategories);
    const colors = useSelector(state => state.specialityControl.colors);
    const tags = useSelector(state => state.specialityControl.tags);
    const sizes = useSelector(state => state.specialityControl.sizes);
    const materials = useSelector(state => state.specialityControl.materials);
    const storeData = useSelector(state => state.store.storeData);
    const [currentPage, setCurrentPage] = useState(1);
    const [photos, setPhotos] = useState([]);
    const [model, setModel] = useState();

    const {
        value: enteredTitle,
        isValid: titleIsValid,
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
            error = 'Please enter a title with at least 3 characters and at most 80 characters.';
        }
        return { isValid, error };
    });

    const {
        value: enteredDescription,
        isValid: descriptionIsValid,
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
    });

    const {
        value: enterStore,
        isValid: storeIsValid,
        error: storeError,
        isTouched: storeIsTouched,
        valueChangeHandler: storeChangedHandler,
        inputBlurHandler: storeBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please enter a store.';
        }
        return { isValid, error };
    });

    const {
        value: enteredMainCategory,
        isValid: mainCategoryIsValid,
        error: mainCategoryError,
        isTouched: mainCategoryIsTouched,
        valueChangeHandler: mainCategoryChangedHandler,
        inputBlurHandler: mainCategoryBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please select a mainCategory.';
        }
        return { isValid, error };
    });

    const {
        value: enteredSubCategory,
        isValid: subCategoryIsValid,
        error: subCategoryError,
        isTouched: subCategoryIsTouched,
        valueChangeHandler: subCategoryChangedHandler,
        inputBlurHandler: subCategoryBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please select a subCategory.';
        }
        return { isValid, error };
    });

    const {
        value: enteredMaterial,
        isValid: materialIsValid,
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
    });

    const {
        value: enteredPrice,
        isValid: priceIsValid,
        error: priceError,
        isTouched: priceIsTouched,
        valueChangeHandler: priceChangedHandler,
        inputBlurHandler: priceBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '' && value > 0;
        let error = '';
        if (value === '') {
            error = 'Please enter a price.';
        }
        else if (value <= 0) {
            error = 'Please enter a price greater than 0.';
        }
        return { isValid, error };
    });

    const handlePhotoAdd = (event) => {
        const newPhotos = Array.from(event.target.files);
        setPhotos([...photos, ...newPhotos]);
    };

    const handlePhotoIndexChange = (oldIndex, newIndex) => {
        const newPhotos = [...photos];
        [newPhotos[oldIndex], newPhotos[newIndex]] = [newPhotos[newIndex], newPhotos[oldIndex]];
        setPhotos(newPhotos);
    };

    const handlePhotoRemove = (index) => {
        const newPhotos = [...photos];
        newPhotos.splice(index, 1);
        setPhotos(newPhotos);
    };

    const [album, setAlbum] = useState([]);
    const uploadPhotosToServer = async (files) => {
        const album = { photos: [] };
        for (const file of files) {
            const data = new FormData();
            data.append('path', 'products');
            data.append('file', file);
            dispatch(productActions.addProductPicture(data, (response) => {
                const url = 'http://www.actore.store/api/file-manager/file/' + response.data.data;
                album.photos.push({ 'URL': url });
            }));
        }
        setAlbum(album.photos);
    }

    const upload3DModelToServer = async (e) => {
        const data = new FormData();
        data.append('path', '3DModels');
        data.append('file', e.target.files[0]);
        dispatch(productActions.addProduct3DModel(data, (response) => {
            const url = 'http://www.actore.store/api/file-manager/file/' + response.data.data;
            setModel(url);
        }));
    }

    // Handle Color Select
    const [selectedColors, setSelectedColors] = useState([]);

    const handleColorDelete = (index) => {
        const newSelectedColors = [...selectedColors];
        newSelectedColors.splice(index, 1);
        setSelectedColors(newSelectedColors);
    };

    const handleColorSelect = (color) => {
        const selectedColor = color;
        const index = selectedColors.findIndex((c) => c._id === selectedColor.target.id);
        if (index === -1) {
            setSelectedColors([...selectedColors, { color: color.target.label, _id: color.target.id, hexCode: color.target.hexCode, quantity: 1 }]);
        } else {
            const newSelectedColors = [...selectedColors];
            newSelectedColors[index].quantity += 1;
            setSelectedColors(newSelectedColors);
        }
    };
    // Handle Size Select
    const [selectedSizes, setSelectedSizes] = useState([]);
    const handleSizeSelect = (size) => {
        const selectedSize = size;
        const index = selectedSizes.findIndex((s) => s._id === selectedSize.target.id);
        if (index === -1) {
            setSelectedSizes([...selectedSizes, { _id: size.target.id, size: size.target.label, quantity: 1 }]);
        } else {
            const newSelectedSizes = [...selectedSizes];
            newSelectedSizes[index].quantity++;
            setSelectedSizes(newSelectedSizes);
        }
    };

    const handleSizeDelete = (index) => {
        const newSelectedSizes = [...selectedSizes];
        newSelectedSizes.splice(index, 1);
        setSelectedSizes(newSelectedSizes);
    };

    // Handle Tag Select
    const [selectedTags, setSelectedTags] = useState([]);
    const handleTagSelect = (tag) => {
        const selectedTag = tag;
        const index = selectedTags.findIndex((t) => t._id === selectedTag.target.id);
        if (index === -1) {
            setSelectedTags([...selectedTags, { _id: tag.target.id, tag: tag.target.label }]);
        } else {
            const newSelectedTags = [...selectedTags];
            newSelectedTags.splice(index, 1);
            setSelectedTags(newSelectedTags);
        }
    };

    const handleTagDelete = (index) => {
        const newSelectedTags = [...selectedTags];
        newSelectedTags.splice(index, 1);
        setSelectedTags(newSelectedTags);
    };

    // Handle Price Change
    const [discountType, setDiscountType] = useState('None');
    const [discountValue, setDiscountValue] = useState();

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

    useEffect(() => {
        dispatch(storeMutations.setStores(null));
        dispatch(storeActions.getStores());
        dispatch(mainCategoryMutations.setMainCategories(null));
        dispatch(subCategoryMutations.setSubCategories(null));
    }, [dispatch]);

    useEffect(() => {
        if (enterStore !== '') {
            dispatch(storeMutations.setStoreData(null));
            dispatch(storeActions.getStoreData(enterStore.id));
        }
    }, [dispatch, enterStore]);

    useEffect(() => {
        if (storeData !== null) {
            dispatch(mainCategoryMutations.setMainCategories(null));
            dispatch(mainCategoryActions.getMainCategories(storeData?.speciality?._id));
        }
    }, [dispatch, storeData]);

    useEffect(() => {
        if (enteredMainCategory !== '') {
            dispatch(subCategoryMutations.setSubCategories(null));
            dispatch(subCategoryActions.getSubCategories(enteredMainCategory.id));
            dispatch(specialityControlMutations.setColors(null));
            dispatch(specialityControlMutations.setTags(null));
            dispatch(specialityControlMutations.setMaterials(null));
            dispatch(specialityControlMutations.setSizes(null));
            if (storeData !== null) {
                dispatch(specialityControlActions.getColors(storeData?.speciality?._id));
                dispatch(specialityControlActions.getTags(storeData?.speciality?._id));
                dispatch(specialityControlActions.getMaterials(storeData?.speciality?._id));
                dispatch(specialityControlActions.getSizes(storeData?.speciality?._id));
            }
        }
    }, [dispatch, enteredMainCategory, storeData]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const product = {
            title: enteredTitle,
            description: enteredDescription,
            price: +enteredPrice,
            store: {
                _id: enterStore.id,
                storeName: enterStore.storeName,
            },
            speciality: {
                _id: storeData.speciality._id,
                title: storeData.speciality.title,
            },
            mainCategory: {
                _id: enteredMainCategory.id,
                title: enteredMainCategory.title,
            },
            subCategory: {
                _id: enteredSubCategory.id,
                title: enteredSubCategory.title,
            },
            colors: selectedColors.map(item => ({
                title: item.color,
                hexCode: item.hexCode,
            })),
            sizes: selectedSizes.map(item => ({
                title: item.size,
            })),
            material: enteredMaterial.title,
            model3D: model,
        };
        if (selectedTags.length > 0) {
            product.tags = selectedTags.map(item => ({
                title: item.tag
            }));
        }
        if (album.length > 0) {
            product.album = album;
        }
        if (discountType !== 'None') {
            product.discount = {
                hasDiscount: true,
                discountType: discountType,
                discountAmount: discountValue
            };
        }
        dispatch(productActions.addProduct(product,
            () => {
                navigate(`/admin-panel/products/`);
            }));
    };

    return (
        <div className='add-product flex-row-center inter'>
            <form onSubmit={handleSubmit} noValidate className=' flex-col-center full-width'>
                <div className="full-width flex-row-center margin-12px-V">
                    <p style={{ margin: '30px' }} className="size-26px font-bold inter gray">
                        Add Product
                    </p>
                </div>

                <div className="add-product--body flex-col-center white-bg full-width radius-10px shadow-2px">
                    <div className="add-product--muiBox-root radius-10px shadow-2px">
                        <div className='add-product--muiBox-root--main orange-bg radius-10px flex-row-between'>
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
                                    3. Prodcut Variants
                                </div>
                            </div>
                            <div className='flex-col-center padding-10px-H'>
                                <div>
                                    <i className={`${mode === 'dark-mode' ? 'gray' : 'white'} bi bi-circle${currentPage >= 4 ? "-fill" : ""} white`}></i>
                                </div>
                                <div className={`${mode === 'dark-mode' ? 'gray' : 'white'} size-12px inter`}>
                                    4. Product Pricing
                                </div>
                            </div>
                        </div>
                    </div>
                    {currentPage === 1 &&
                        <div className='full-width'>
                            <div className='full-width flex-col-left-start add-product--header'>
                                <label className='pointer full-width text-shadow gray font-bold size-26px'>Product information</label>
                            </div>
                            <div className='full-width flex-col-left-start add-product--input-container'>
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>Product title <span className='red'>*</span></label>
                                <div className={`full-width light-gray radius-10px white-bg flex-row-left-start add-product--input `}>
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
                            <div className='full-width flex-col-left-start add-product--input-container'>
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>Product description <span className='red'>*</span></label>
                                <div className={`full-width light-gray radius-10px white-bg flex-row-left-start add-product--input`}>
                                    <textarea
                                        className='full-width gray margin-4px-H'
                                        type={'text'}
                                        placeholder={'Product description'}
                                        id={'description'}
                                        value={enteredDescription}
                                        onChange={descriptionChangedHandler}
                                        onBlur={descriptionBlurHandler}
                                        style={{ resize: 'none' }} // disable resizing
                                    />
                                </div>
                                {descriptionIsTouched && (<div className="error-message">{descriptionError}</div>)}
                            </div>
                            {stores && stores.length > 0 && (
                                <div className='full-width flex-col-left-start add-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='store'>Store <span className='red'>*</span></label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-top-start add-product--input`}>
                                        <i className='bi bi-pin-map size-20px gray' />
                                        <Select
                                            className='add-product--select full-width gray margin-4px-H'
                                            styles={{
                                                option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit' }),
                                                menu: (provided) => ({
                                                    ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`,
                                                    position: 'relative',
                                                }),
                                            }}
                                            value={enterStore}
                                            placeholder="Select Store"
                                            options={stores.filter(store => store.status === "Active").map(store => ({ label: store.storeName, value: { label: store.storeName, id: store._id, storeName: store.storeName } }))}
                                            onChange={(store) =>
                                                storeChangedHandler({ target: { id: "store", value: store.value } })
                                            }
                                            onBlur={storeBlurHandler}
                                        />
                                    </div>
                                    {storeIsTouched && (<div className="error-message">{storeError}</div>)}
                                </div>
                            )
                            }
                            {mainCategories && mainCategories.length > 0 && (
                                <div className='full-width flex-col-left-start add-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='MainCategory'>Main Category <span className='red'>*</span></label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-top-start add-product--input`}>
                                        <i className='bi bi-pin-map size-20px gray' />
                                        <Select
                                            className='add-product--select full-width gray margin-4px-H'
                                            styles={{
                                                option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit' }),
                                                menu: (provided) => ({
                                                    ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`,
                                                    position: 'relative',
                                                }),
                                            }}
                                            value={enteredMainCategory}
                                            disabled={mainCategories.length === 0}
                                            placeholder="Select Main Category"
                                            options={mainCategories.filter(mainCategory => mainCategory.status === "Active").map(mainCategory => ({ label: mainCategory.title, value: { label: mainCategory.title, title: mainCategory.title, id: mainCategory._id } }))}
                                            onChange={(mainCategory) =>
                                                mainCategoryChangedHandler({ target: { id: "mainCategory", label: mainCategory.title, value: mainCategory.value } })
                                            }
                                            onBlur={mainCategoryBlurHandler}
                                        />
                                    </div>
                                    {mainCategoryIsTouched && (<div className="error-message">{mainCategoryError}</div>)}
                                </div>
                            )}
                            {subCategories && subCategories.length > 0 && (
                                <div className='full-width flex-col-left-start add-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='SubCategory'>Sub Category <span className='red'>*</span></label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-top-start add-product--input `}>
                                        <i className='bi bi-pin-map size-20px gray' />
                                        <Select
                                            className='add-product--select full-width gray margin-4px-H'
                                            styles={{
                                                option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit' }),
                                                menu: (provided) => ({
                                                    ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`,
                                                    position: 'relative',
                                                }),
                                            }}
                                            value={enteredSubCategory}
                                            disabled={subCategories.length === 0}
                                            placeholder="Select Sub Category"
                                            options={subCategories.filter(subCategory => subCategory.status === "Active").map(subCategory => ({ label: subCategory.title, value: { label: subCategory.title, title: subCategory.title, id: subCategory._id } }))}
                                            onChange={(subCategory) =>
                                                subCategoryChangedHandler({ target: { id: "subCategory", label: subCategory.title, value: subCategory.value } })
                                            }
                                            onBlur={subCategoryBlurHandler}
                                        />
                                    </div>
                                    {subCategoryIsTouched && (<div className="error-message">{subCategoryError}</div>)}
                                </div>
                            )}

                            <div className="add-product--actions flex-row-between full-width">
                                <button
                                    className="add-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                    onClick={() => {
                                        navigate('/admin-panel/products');
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`add-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                                    disabled={!titleIsValid || !descriptionIsValid || !storeIsValid || !mainCategoryIsValid || (subCategories && subCategories.length > 0 && !subCategoryIsValid)}
                                    onClick={() => {
                                        setCurrentPage(2);
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    }
                    {currentPage === 2 &&
                        <div className='full-width'>
                            <div className='full-width flex-col-left-start add-product--header'>
                                <label className='pointer full-width text-shadow gray font-bold size-26px'>Product Album</label>
                            </div>
                            <div className='full-width flex-col-left-start add-product--input-container'>
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>Product Images: </label>
                            </div>
                            <div className="add-product--photo flex-col-center">
                                <div className="flex-row-center flex-wrap">
                                    {photos.map((photo, index) => (
                                        <div className="add-product--photo--item padding-10px-H flex-col-center " key={index}>
                                            <div className={`inter ${mode === 'dark-mode' ? 'gray' : 'orange'} margin-6px-V`}> Photo number: {index + 1}</div>
                                            <img src={URL.createObjectURL(photo)} alt={` ${index}`} />
                                            <div className="flex-row-between full-width margin-6px-V ">
                                                <button
                                                    type="button"
                                                    className={`add-product--gallary-left ${mode === 'dark-mode' ? 'gray-bg' : 'orange-bg'} radius-circular pointer white`}
                                                    onClick={() => handlePhotoIndexChange(index, index - 1)}
                                                    disabled={index === 0}
                                                >
                                                    <i className="bi bi-caret-left-fill flex-row-right-start"></i>
                                                </button>
                                                <button className='add-product--gallary' type="button" onClick={() => handlePhotoRemove(index)}>
                                                    <i className="bi bi-trash pointer size-20px gray"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`add-product--gallary-right ${mode === 'dark-mode' ? 'gray-bg' : 'orange-bg'} radius-circular pointer white`}
                                                    onClick={() => handlePhotoIndexChange(index, index + 1)}
                                                    disabled={index === photos.length - 1}
                                                >
                                                    <i className="bi bi-caret-right-fill flex-row-right-start"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-row-center full-width">
                                    <label htmlFor="photos" className={`add-product--actions--button radius-10px orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`}>
                                        Add photo
                                    </label>
                                    <input type="file" id="photos" onChange={handlePhotoAdd} multiple hidden />
                                </div>
                            </div>
                            <div className='full-width flex-col-left-start add-product--input-container'>
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>Product 3D Model: </label>
                            </div>
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
                            <div className="add-product--actions flex-row-between full-width">
                                <button
                                    className="add-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                    onClick={() => {
                                        setCurrentPage(1);
                                    }}
                                >
                                    Back
                                </button>
                                <button
                                    className={`add-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                                    onClick={() => {
                                        uploadPhotosToServer(photos);
                                        setCurrentPage(3);
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </div>}

                    {currentPage === 3 &&
                        <div className='full-width'>
                            <div className='full-width flex-col-left-start add-product--header'>
                                <label className='pointer full-width text-shadow gray font-bold size-26px'>Product Variants</label>
                            </div>
                            {materials && materials.length > 0 && (
                                <div className='full-width flex-col-left-start add-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='material'>
                                        Materials :<span className='red'>*</span>
                                    </label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-top-start add-product--input `}>
                                        <i className='bi bi-pin-map size-20px gray' />
                                        <Select
                                            className='add-product--select full-width gray margin-4px-H'
                                            styles={{
                                                option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit' }),
                                                menu: (provided) => ({
                                                    ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`,
                                                    position: 'relative',
                                                }),
                                            }}
                                            value={enteredMaterial}
                                            disabled={materials.length === 0}
                                            placeholder="Select Material"
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
                            {colors && colors.length > 0 && (
                                <div className='full-width flex-col-left-start add-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='color'>
                                        Colors :<span className='red'>*</span>
                                    </label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-top-start add-product--input `}>
                                        <i className='bi bi-pin-map size-20px gray' />
                                        <Select
                                            multiple
                                            className='add-product--select full-width gray margin-4px-H'
                                            styles={{
                                                option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit' }),
                                                menu: (provided) => ({
                                                    ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`,
                                                    position: 'relative',
                                                }),
                                            }}
                                            disabled={colors.length === 0}
                                            placeholder='Select Colors'
                                            options={colors.map((color) => ({
                                                label: color.title,
                                                value: { label: color.title, title: color.title, id: color._id, hexCode: color.hexCode },
                                            }))}
                                            onChange={(color) =>
                                                handleColorSelect({ target: { id: color.value.id, label: color.value.title, value: color.value.title, hexCode: color.value.hexCode } })
                                            }
                                        />
                                    </div>
                                    <div className="flex-row-between flex-wrap ">
                                        {selectedColors.map((color, index) => (
                                            <div key={index} style={{ background: color.hexCode }} className="add-product--selected-item shadow-2px radius-10px flex-row-between size-14px white">
                                                <span className={`margin-4px-H ${(mode === 'dark-mode') ? 'gray' : 'white'}`}>{color.color}</span>
                                                <button className={`add-product--input--number--button bi bi-trash pointer size-20px pointer ${mode === 'dark-mode' ? 'gray' : 'white'}`} type="button" onClick={() => handleColorDelete(index)}></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {sizes && sizes.length && (
                                <div className='full-width flex-col-left-start add-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='size'>
                                        Sizes :<span className='red'>*</span>
                                    </label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-top-start add-product--input `}>
                                        <i className='bi bi-pin-map size-20px gray' />
                                        <Select
                                            multiple
                                            className='add-product--select full-width gray margin-4px-H'
                                            styles={{
                                                option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit' }),
                                                menu: (provided) => ({
                                                    ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`,
                                                    position: 'relative',
                                                }),
                                            }}
                                            disabled={sizes.length === 0}
                                            placeholder='Select Sizes'
                                            options={sizes.map((size) => ({
                                                label: size.title,
                                                value: { label: size.title, title: size.title, id: size._id },
                                            }))}
                                            onChange={(size) =>
                                                handleSizeSelect({ target: { id: size.value.id, label: size.value.title, value: size.value.title } })
                                            }
                                        />
                                    </div>
                                    <div className="flex-row-between flex-wrap ">
                                        {selectedSizes.map((size, index) => (
                                            <div key={index} className="add-product--selected-item shadow-2px radius-10px flex-row-between size-14px white-bg gray">
                                                <span className='margin-4px-H '>{size.size}</span>
                                                <button className='add-product--input--number--button bi bi-trash pointer size-20px pointer gray' type="button" onClick={() => handleSizeDelete(index)}></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                            }
                            {tags && tags.length > 0 && (
                                <div className='full-width flex-col-left-start add-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='tags'>
                                        Tags :<span className='red'>*</span>
                                    </label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-top-start add-product--input `}>
                                        <i className='bi bi-pin-map size-20px gray' />
                                        <Select
                                            multiple
                                            className='add-product--select full-width gray margin-4px-H'
                                            styles={{
                                                option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit' }),
                                                menu: (provided) => ({
                                                    ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`,
                                                    position: 'relative',
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
                                        {selectedTags.map((tag, index) => (
                                            <div key={index} className="add-product--selected-item shadow-2px radius-15px flex-row-between size-14px lavender-bg text-shadow">
                                                <span className={`margin-4px-H ${mode === 'dark-mode' ? 'white' : 'gray'}`}>{tag.tag}</span>
                                                <button className={`add-product--input--number--button bi bi-trash pointer ${mode === 'dark-mode' ? 'white' : 'gray'} size-20px pointer `} type="button" onClick={() => handleTagDelete(tag._id)}></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                            }
                            <div className="add-product--actions flex-row-between full-width">
                                <button
                                    className="add-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                    onClick={() => {
                                        setCurrentPage(2);
                                    }}
                                >
                                    Back
                                </button>
                                <button
                                    className={`add-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                                    disabled={selectedSizes.length === 0 || selectedTags.length === 0 || selectedColors.length === 0 || !materialIsValid}
                                    onClick={() => {
                                        setCurrentPage(4);
                                    }}
                                >
                                    Next
                                </button>
                            </div>

                        </div>

                    }
                    {currentPage === 4 &&
                        <div className='full-width'>
                            <div className='full-width flex-col-left-start add-product--header'>
                                <label className='pointer full-width text-shadow gray font-bold size-26px'>Product Pricing</label>
                            </div>
                            <div className="add-product--price full-width flex-col-left-start add-product--input-container">
                                <div>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor="price">Price:<span className='red'>*</span></label>
                                    <input className="margin-12px-H gray add-product--input radius-10px" min='0' type="number" id="price" value={enteredPrice} onChange={priceChangedHandler} onBlur={priceBlurHandler} />
                                </div>
                                {priceIsTouched && (<div className="error-message">{priceError}</div>)}
                                <div className='full-width add-product--price--discount'>
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
                                                <input className='gray add-product--input radius-10px' min='0' type="number" id="discount-value" value={discountValue} onChange={handleDiscountValueChange} />
                                            </div>
                                            <div className='flex-row-center'>
                                                <label className='text-shadow gray font-bold margin-6px-H'>New price:</label>
                                                <div className={`${mode === 'dark-mode' ? 'gray' : 'orange'} font-bold size-26px`}>{calculateNewPrice()}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="add-product--actions flex-row-between full-width">
                                <button
                                    className="add-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                    onClick={() => {
                                        setCurrentPage(3);
                                    }}
                                >
                                    Back
                                </button>
                                <button
                                    className={`add-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                                    disabled={!priceIsValid}
                                    type="submit"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>}
                </div>

            </form>


        </div >
    );
}

export default AddProduct
