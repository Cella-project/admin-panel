import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import StarBorder from '@material-ui/icons/StarBorder';
import { Link } from "react-router-dom";
import productDefault from "../../assets/images/productDefault.png";
import { useSelector } from "react-redux";

import "./ProductInfo.scss";

export const ProductInfo = ({ product }) => {
  // handle the current photo index
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((currentPhotoIndex - 1 + product.album.length) % product.album.length);
  };
  const handleNextPhoto = () => {
    setCurrentPhotoIndex((currentPhotoIndex + 1) % product.album.length);
  };
  const handleSelectPhoto = (index) => {
    setCurrentPhotoIndex(index);
  };

  const mode = useSelector((state) => state.theme.mode);

  // check if the product has discount
  const hasDiscount = product?.discount?.hasDiscount;

  // calculate the discounted price
  let newPrice = product.price;
  let oldPrice = '';
  if (hasDiscount) {
    const discountType = product.discount.discountType;
    const discountAmount = product.discount.discountAmount;
    if (discountType === 'Percentage') {
      newPrice = product.price * (100 - discountAmount) / 100;
    } else if (discountType === 'Value') {
      newPrice = product.price - discountAmount;
    }
    oldPrice = product.price;
  }
  // format the prices to display correctly
  const formattedNewPrice = newPrice.toFixed(2);
  const formattedOldPrice = oldPrice ? oldPrice.toFixed(2) : '';

  const album = product.album.length > 0 ? product.album : [{ URL: productDefault }];

  return (
    <div className="product-info full-width shadow-2px inter radius-15px white-bg flex-row-between2col gray">
      <div className="product-info--slide-show flex-col-center">
        <div className="product-info--img flex-row-between">
          <button
            className="product-info--gallary-left pointer gray"
            onClick={handlePreviousPhoto}
            disabled={product.album.length === 1 || product.album.length === 0}
          >
            <i className="bi bi-caret-left-fill flex-row-right-start"></i>
          </button>
          <img
            src={album[currentPhotoIndex].URL}
            alt={product.description}
            className="product-photo"
          />
          <button
            className="product-info--gallary-right pointer gray"
            onClick={handleNextPhoto}
            disabled={product.album.length === 1 || product.album.length === 0}
          >
            <i className="bi bi-caret-right-fill flex-row-right-start"></i>
          </button>
        </div>
        <div className="product-info--thumbnails flex-row-between">
          {product.album.length > 1 && product.album.map((_, index) => (
            <div
              key={index}
              className={`pointer product-info--thumbnail ${index === currentPhotoIndex ? "orange-bg" : ""}`}
              style={{ borderColor: "orange" }}
              
              onClick={() => handleSelectPhoto(index)}
            />
          ))}
        </div>
      </div>
      <div className="product-info--info full-width flex-col-left-start">
        <div className='margin-2px-V flex-row-between full-width'>
          <div className={`${product.status === 'Active' ? 'green' : 'red'}`}>{product.status}</div>
          <div className="product-info--rate flex-row-right-start margin-8px-V">
            <Rating
              name="rating"
              style={{ color: "#FDCC0D" }}
              emptyIcon={<StarBorder className="gray" fontSize='inherit' />}
              value={product.rating}
              precision={0.5}
              size={"medium"}
              readOnly
            />
            <div className="size-14px gray font-bold margin-4px-H">{product.rating}</div>
          </div>
        </div>
        <div className="flex-col-left-start gray size-24px margin-8px-V font-bold">
          {product.title}
        </div>
        <Link to={`/admin-panel/stores/${product.store._id}`} className={`pointer lists-card--link product-info--store size-20px margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'orange'}`}>
          Store : {product.store.storeName}
        </Link>
        <div className="product-info-details">{product.description}</div>

        <div className="product-info-details margin-4px-V size-12px gray ">Product material: {product.material}</div>

        <div className="full-width flex-row-between">
          <div className="flex-row-left-start lavender">{product.subCategory.title}</div>
          <div className="product-info--price flex-row-center orange margin-2px-V">
            {hasDiscount && (
              <div className='gray'>
                <s>
                  <span className='product-card--old-price size-16px font-bold'>{Math.trunc(formattedOldPrice)}</span>
                  <span className='size-8px'>.{formattedOldPrice.slice(-2)}</span>
                </s>
              </div>
            )}
            <div className={`${mode === 'dark-mode' ? 'gray' : 'orange'} margin-2px-V`}>
              <span className='product-card--new-price size-40px font-bold'>{Math.trunc(formattedNewPrice)}</span>
              <span className='size-14px'>.{formattedNewPrice.slice(-2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default ProductInfo;
