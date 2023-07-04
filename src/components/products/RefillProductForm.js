import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productActions } from '../../apis/actions';
import Select from 'react-select';

import useInput from '../../hooks/useInput';
import './RefillProductForm.scss';

export const RefillProductForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);
    const productData = useSelector((state) => state.product.productData);
    const sizes = productData.sizes;
    const colors = productData.colors;

    const {
        value: enteredQuantity,
        error: quantityError,
        isTouched: quantityIsTouched,
        valueChangeHandler: quantityChangedHandler,
        inputBlurHandler: quantityBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please enter a quantity.';
        } else if (value <= 0) {
            error = 'Please enter a quantity greater than 0.';
        }
        return { isValid, error };
    }, 0);

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [pieces, setPieces] = useState([]);

    const handleAddPiece = () => {
        // Check if size and color are not null
        if (selectedSize && selectedColor) {
            // Check if a piece with the same color and size already exists
            const existingPiece = pieces.find(
                (piece) =>
                    piece.color?.title === selectedColor.label &&
                    piece.size?.title === selectedSize.title
            );

            if (existingPiece) {
                // If a piece with the same color and size exists, update its quantity
                existingPiece.quantity += parseInt(enteredQuantity);
                setPieces([...pieces]); // Update the state with the modified array
            } else {
                // Otherwise, add a new piece to the array
                const newPiece = {
                    quantity: parseInt(enteredQuantity),
                    color: { title: selectedColor.label, hexCode: selectedColor.hexCode },
                    size: selectedSize,
                };
                setPieces((prevPieces) => [...prevPieces, newPiece]);
            }
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const product = {
            _id: productData._id,
            pieces: pieces,
        };
        dispatch(productActions.refillProductQuantity(product, () => {
            popupToggle(false);
            document.getElementById('dashboard-view').style.zIndex = 10;
            window.onscroll = function () { };
        }));
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="refill-product">
            {productData && (
                <div className="flex-col-center inter">
                    <div className="full-width flex-col-left-start refill-product--header">
                        <label className="pointer full-width text-shadow gray font-bold size-26px">
                            Refill Product
                        </label>
                    </div>
                    <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="quantity">
                        Quantity : <span className="red">*</span>
                    </label>
                    <div className='refill-product--input white-bg radius-10px'>
                        <input
                            className="margin-12px-H gray refill-product--input radius-10px"
                            min="0"
                            type="number"
                            id="Quantity"
                            value={enteredQuantity}
                            onChange={quantityChangedHandler}
                            onBlur={quantityBlurHandler}
                        />
                    </div>
                    {quantityIsTouched && <div className="error-message">{quantityError}</div>}
                    {colors && colors.length > 0 && (
                        <div className="full-width flex-col-left-start refill-product--input-container">
                            <label className="pointer full-width flex-row-between text-shadow gray font-bold margin-6px-H" htmlFor="color">
                                Colors :
                            </label>
                            <Select
                                className="add-product--select full-width gray margin-4px-H"
                                styles={{
                                    option: (provided, state) => ({
                                        ...provided,
                                        cursor: 'pointer',
                                        ':hover': { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` },
                                        backgroundColor: state.isFocused || state.isSelected ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit',
                                    }),
                                    menu: (provided) => ({ ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}` }),
                                }}
                                isDisabled={colors.length === 0}
                                placeholder="Select Color"
                                options={colors.map((color) => ({
                                    label: color.title,
                                    value: color.title,
                                    hexCode: color.hexCode,
                                }))}
                                onChange={(color) => setSelectedColor(color)}
                            />
                        </div>
                    )}

                    {sizes && sizes.length > 0 && (
                        <div className="full-width flex-col-left-start refill-product--input-container">
                            <label className="pointer full-width flex-row-between text-shadow gray font-bold margin-6px-V" htmlFor="size">
                                Sizes :
                            </label>
                            <Select
                                className="add-product--select full-width gray margin-4px-H"
                                styles={{
                                    option: (provided, state) => ({
                                        ...provided,
                                        cursor: 'pointer',
                                        ':hover': { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` },
                                        backgroundColor: state.isFocused || state.isSelected ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit',
                                    }),
                                    menu: (provided) => ({ ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}` }),
                                }}
                                isDisabled={sizes.length === 0}
                                placeholder="Select Size"
                                options={sizes.map((size) => ({
                                    label: size.title,
                                    value: size.title,
                                }))}
                                onChange={(size) => setSelectedSize(size.value)}
                            />
                        </div>
                    )}
                    <input type='button' className={`profile--input--container margin-6px-V full-width shadow-5px font-bold ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg size-20px pointer`}
                        onClick={() => handleAddPiece()}
                        value="Add" />
                    {pieces.map((piece, index) => (
                        <div key={index} className="product-details--piece white-bg flex-row-between radius-10px gray shadow-2px flex-wrap margin-6px-V">
                            <div className="flex-col-center">
                                <div className="full-width size-18px">
                                    Size: {piece.size}
                                </div>
                                <div className="full-width size-18px">
                                    Color: {piece.color.title}
                                </div>
                            </div>
                            <div className={`product-details--piece--quantity margin-12px-H`}>
                                <i className={`bi bi-bookmark-fill orange flex-col-top-start size-38px`}>
                                    <span style={{ position: 'absolute', fontStyle: 'normal' }} className={`size-22px pt-sans ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{piece.quantity > 0 ? piece.quantity : 0}</span>
                                </i>
                            </div>
                        </div>
                    ))}

                    <div className="refill-product--actions flex-row-between full-width">
                        <button
                            className={`refill-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'
                                } text-shadow size-18px font-bold orange-bg`}
                            type="submit"
                        >
                            Confirm
                        </button>
                        <button
                            className="refill-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                            onClick={() => {
                                popupToggle(false);
                                document.getElementById('dashboard-view').style.zIndex = 10;
                                window.onscroll = function () { };
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default RefillProductForm;
