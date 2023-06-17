import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import OrangeCard from "../../../components/common/OrangeCard";
import ProductInfo from "../../../components/products/ProductInfo";
import ProductControl from "../../../components/products/ProductControl";

import "./ProductDetails.scss";
import Popup from "../../../components/common/PopupForm";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../../apis/actions";
import { productMutations } from "../../../redux/mutations";


const ProductDetails = () => {
  const params = useParams();
  const product = useSelector((state) => state.product.productData);
  const mode = useSelector((state) => state.theme.mode);
  const [popupShown, setPopupShown] = useState(false);
  const [header, setHeader] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productMutations.setProductData(null));
    dispatch(productActions.getProductData(params.id));
  }, [dispatch, params.id]);
  let editmode = false;

  product && (document.title = `${product.title} • Admin Panel`);

  let cards = [
    { title: 'Quantitiy', content: 0, icon: "bi bi-box-seam" },
    { title: '# of orders', content: 0, icon: "bi bi-box-seam" },
    { title: 'Success Orders', content: 0, icon: "bi bi-box-seam" },
    { title: 'returned orders', content: 0, icon: "bi bi-box-seam" },
  ];
  if (product && product !== null) {
    cards = [
      { title: 'Quantity', content: product.avilableQuantity, icon: "bi bi-box-seam" },
      { title: '# of Orders', content: 0, icon: "bi bi-box-seam" },
      { title: 'Success Orders', content: 0, icon: "bi bi-box-seam" },
      { title: 'Returned Orders', content: 0, icon: "bi bi-box-seam" },
      // { title: '# of orders', content: product.orders.length, icon: "bi bi-box-seam" },
      // { title: 'Success Orders', content: product.orders.filter((order) => order.status === 'Delivered').length, icon: "bi bi-box-seam" },
      // { title: 'returned orders', content: product.orders.filter((order) => order.status === 'Returned').length, icon: "bi bi-box-seam" },
    ];
  }
  const hasDiscount = product?.discount?.hasDiscount;

  const handleTagDelete = (tagId) => {
    dispatch(productActions.deleteProductTag({
      _id: params.id,
      tagId: tagId
    }));
  };
  const handleColorDelete = (colorId) => {
    dispatch(productActions.deleteProductColor({
      _id: params.id,
      colorId: colorId
    }));
  };

  const handleSizeDelete = (sizeId) => {
    dispatch(productActions.deleteProductSize({
      _id: product._id,
      sizeId: sizeId
    }));
  };

  const addProductTag = () => {
    setPopupShown(true);
    setHeader('Add Product Tag');
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  const addProductColor = () => {
    setPopupShown(true);
    setHeader('Add Product Color');
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  const addProductSize = () => {
    setPopupShown(true);
    setHeader('Add Product Size');
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  return (
    <div className="product-details--container full-width flex-col-left-start2col">
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={header} data={product} />
      }
      {product && (
        <>
          <div className="flex-row-left-start2col product-details full-width">
            <div className="width-90-100 product-details">
              <ProductInfo
                product={product} editmode={editmode}
              />
            </div>
            <div className="flex-row-between product-details width-10-100">
              <ProductControl id={product._id} />
            </div>
          </div>
          <PerfectScrollbar options={{ axis: 'x' }} className="product-details--scroll--cont shadow-2px inter radius-15px white-bg full-width">
            {product.tags.length > 0 ? (
              <div className="product-details--tags flex-row-between full-width" >
                {product.tags.map((tag, index) => (
                  <div key={index} className="add-product--selected-item shadow-2px radius-15px flex-row-between size-14px lavender-bg text-shadow">
                    <span className={`margin-4px-H ${mode === 'dark-mode' ? 'white' : 'gray'}`}>{tag.tag}</span>
                    <button className={`add-product--input--number--button bi bi-trash pointer ${mode === 'dark-mode' ? 'white' : 'gray'} size-20px pointer `} type="button" onClick={() => handleTagDelete(tag._id)}></button>
                  </div>
                ))}
                <button className={`bi bi-plus-circle product-details--scroll--cont--add radius-circular orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`} onClick={addProductTag} >
                </button>
              </div>
            ) : (
              <div className="product-details--tags flex-row-center full-width">
                <button className={`add-product--actions--button radius-10px orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`} onClick={addProductTag}>
                  Add Tag
                </button>
              </div>
            )}

          </PerfectScrollbar>



          <div className="full-width">
            <div className="full-width flex-row-between2col">
              {
                cards.map((card, index) => {
                  return (
                    <OrangeCard title={card.title} key={index}>
                      <div className="full-width flex-row-center">
                        <i className={`${card.icon} orange size-30px`}></i>
                        <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                      </div>
                    </OrangeCard>
                  );
                })
              }
              {
                hasDiscount &&
                <div className="flex-col-center width-20-100">
                  <OrangeCard title="Discount">
                    <div className="product-details--discount flex-row-center">
                      <div className="product-details--discount--content flex-col-center">
                        <p className="gray inter size-28px margin-12px-H text-shadow">{product.discount.discountAmount}{product.discount.discountType === 'Percentage' && <i className="bi bi-percent"></i>}</p>
                        <p className="gray inter margin-12px-H text-shadow">{product.discount.discountType}</p>
                      </div>
                    </div>
                  </OrangeCard>
                </div>
              }
            </div>
          </div>
          <div className="full-width">
            <div className="full-width flex-row-top-start2col">
              <OrangeCard title="Sizes" icon={'bi bi-plus-circle'} iconClickHandle={addProductSize}>
                <div className="product-details--sizes flex-row-center flex-wrap">
                  {product.sizes.map((size, index) => (
                    <div key={index} className="product-details--sizes flex-row-center flex-wrap">
                      <div className="orange-bg shadow-2px margin-6px-V radius-15px white flex-row-between">
                        <div className="product-details--sizes--quantity white-bg gray radius-15px">{size.quantity} Available</div>
                        <div className="product-details--sizes--size font-bold size-20px ">{size.size}</div>
                        <i
                          className="product-details--sizes--delete shadow-2px bi bi-trash pointer size-12px orange white-bg radius-circular flex-row-center"
                          onClick={() => handleSizeDelete(size._id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </OrangeCard>
              <OrangeCard title="Colors" icon={'bi bi-plus-circle'} iconClickHandle={addProductColor}>
                <div className="product-details--colors flex-row-center flex-wrap">
                  {product.colors.map((color, index) => (
                    <div key={index} className="product-details--colors flex-row-center">
                      <div style={{ backgroundColor: color.hexCode }} className=" shadow-2px margin-6px-V full-width radius-15px white flex-row-between">
                        <div className="product-details--colors--quantity white-bg gray radius-15px">{color.quantity} Available from {color.color}</div>
                        <div className="gray size-14px margin-10px-H text-shadow"> </div>
                        <i
                          className="product-details--colors--delete shadow-2px bi bi-trash pointer size-12px orange white-bg radius-circular flex-row-center"
                          onClick={() => handleColorDelete(color._id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </OrangeCard>


            </div>
          </div>

          <div className="full-width flex-row-center">
            <OrangeCard title="Reviews">
              <Link to={`/Reviews`} className="pointer lists-card--link">
                <i className="bi bi-arrow-right flex-row-right-start"></i>
              </Link>
            </OrangeCard>
          </div>
        </>)
      }
    </div>
  );
};
export default ProductDetails;
