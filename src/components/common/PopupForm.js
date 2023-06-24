import React, { useEffect, useRef } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import background from '../../assets/images/background.svg';
import backgroundDark from '../../assets/images/background-dark.svg';
import AddAdminForm from "../admins/AddAdminForm";
import AddStoreForm from "../stores/AddStoreForm";
import AddBranchForm from "../stores/AddBranchForm";
import AddSpecialtyForm from "../speciality/AddSpecialtyForm";
import AddSpecialtyColorForm from "../speciality/AddSpecialtyColor";
import EditSpecialtyColorForm from "../speciality/EditSpecialtyColor";
import AddSpecialtyTagForm from "../speciality/AddSpecialtyTag";
import AddSpecialtyMaterialForm from "../speciality/AddSpecialtyMaterial";
import AddSpecialtySizeForm from "../speciality/AddSpecialtySize";
import AddMainCategoryForm from "../category/AddMainCategoryForm";
import AddSubCategoryForm from "../category/AddSubCategoryForm";
import EditMainCategoryForm from "../category/EditMainCategoryForm";
import AddPaymentForm from "../payments/AddPaymentForm";
import EditStoreForm from "../stores/EditStoreForm";
import EditStoreApplicationForm from "../storeApplications/EditStoreApplicationForm";
import AddDriverForm from "../delivery/AddDriverForm";
import EditDriverApplicationForm from "../deliveryApplications/EditDriverApplicationForm";
import EditSubCategoryForm from "../category/EditSubCategoryForm";
import AddSocialAccountForm from "../stores/AddSocialAccountForm";
import AddProductTagForm from "../products/AddProductTagForm";
import AddProductColorForm from "../products/AddProductColorForm";
import AddProductSizeForm from "../products/AddProductSizeForm";
import RefillProductForm from "../products/RefillProductForm";
import { useSelector } from "react-redux";
import VerifyOTP from "../verifyEmail/VerifyOTP";

import './PopupForm.scss';

const Popup = ({ popupToggle, header, data }) => {
    let popupRef = useRef();
    const mode = useSelector(state => state.theme.mode);

    const dashboard = document.getElementById('dashboard-view');

    useEffect(() => {
        let mouseHandler = (e) => {
            if (!popupRef.current.contains(e.target)) {
                popupToggle(false);
                dashboard.style.zIndex = 10;
                window.onscroll = function () { };
            }
        };

        dashboard.addEventListener('mousedown', mouseHandler);

        return () => {
            dashboard.removeEventListener('mousedown', mouseHandler);
        }
    });

    return (
        <div className={`popup--overlay ${mode === 'dark-mode' ? 'dark' : ''} full-width flex-row-${header === 'Verify Email' ? 'top-start' : 'right-start'}`}>
            {header === 'Verify Email' ? (
                <div className='popup--verify flex-col-top-start inter white-bg' ref={popupRef}>
                    <img src={mode === 'dark-mode' ? backgroundDark : background} className={mode === 'dark-mode' ? 'dark' : ''} alt='bg' />

                    <div className={`popup--verify--header flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-20px orange-bg full-width`}>
                        {header}
                    </div>

                    <div className='popup--verify--cont flex-col-top-start'>
                        <VerifyOTP popupToggle={popupToggle} />
                    </div>
                </div>
            ) : (
                <div className='popup--content flex-col-top-start inter white-bg width-25-100' ref={popupRef}>
                    <img src={mode === 'dark-mode' ? backgroundDark : background} className={mode === 'dark-mode' ? 'dark' : ''} alt='bg' />

                    <div className={`popup--header flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-20px orange-bg full-width`}>
                        {header}
                    </div>

                    <PerfectScrollbar className='popup--form full-width flex-col-top-start'>
                        {
                            header === 'Add Admin' &&
                            <AddAdminForm popupToggle={popupToggle} />
                        }
                        {
                            header === 'Add Store' &&
                            <AddStoreForm popupToggle={popupToggle} />
                        }
                        {
                            header === 'Add Branch' &&
                            <AddBranchForm popupToggle={popupToggle} />
                        }
                        {
                            header === 'Add Specialty' &&
                            <AddSpecialtyForm popupToggle={popupToggle} />
                        }
                        {
                            header === 'Add Speciality Color' &&
                            <AddSpecialtyColorForm popupToggle={popupToggle} data={data} />
                        }
                        {
                            header === 'Edit Speciality Color' &&
                            <EditSpecialtyColorForm popupToggle={popupToggle} data={data} />
                        }
                        {
                            header === 'Add Speciality Tag' &&
                            <AddSpecialtyTagForm popupToggle={popupToggle} data={data} />
                        }
                        {
                            header === 'Add Speciality Material' &&
                            <AddSpecialtyMaterialForm popupToggle={popupToggle} data={data} />
                        }
                        {
                            header === 'Add Speciality Size' &&
                            <AddSpecialtySizeForm popupToggle={popupToggle} data={data} />
                        }
                        {
                            header === 'Add Main Category' &&
                            <AddMainCategoryForm popupToggle={popupToggle} data={data} />
                        }
                        {
                            header === 'Edit Main Category' &&
                            <EditMainCategoryForm popupToggle={popupToggle} data={data} />
                        }
                        {
                            header === 'Add Sub Category' &&
                            <AddSubCategoryForm popupToggle={popupToggle} data={data} />
                        }
                        {
                            header === 'Edit Sub Category' &&
                            <EditSubCategoryForm popupToggle={popupToggle} data={data} />
                        }
                        {
                            header === 'Add Payment Method' &&
                            <AddPaymentForm popupToggle={popupToggle} />
                        }
                        {
                            header === 'Edit Store' &&
                            <EditStoreForm popupToggle={popupToggle} />
                        }
                        {
                            header === 'Add Social Media Accounts' &&
                            <AddSocialAccountForm popupToggle={popupToggle} />
                        }
                        {
                            header === 'Edit Store Application' &&
                            <EditStoreApplicationForm popupToggle={popupToggle} />
                        }
                        {
                            header === 'Add Driver' &&
                            <AddDriverForm popupToggle={popupToggle} />
                        }
                        {
                            header === 'Edit Driver Application' &&
                            <EditDriverApplicationForm popupToggle={popupToggle} />
                        }
                        {
                            header === 'Add Product Tag' &&
                            <AddProductTagForm popupToggle={popupToggle} data={data} />
                        }
                        {
                            header === 'Add Product Color' &&
                            <AddProductColorForm popupToggle={popupToggle} data={data} />
                        }
                        {
                            header === 'Add Product Size' &&
                            <AddProductSizeForm popupToggle={popupToggle} data={data} />
                        }
                        {
                            header === 'Refill Product' &&
                            <RefillProductForm popupToggle={popupToggle} data={data} />
                        }
                    </PerfectScrollbar>
                </div>
            )
            }
        </div>
    );
};

export default Popup;