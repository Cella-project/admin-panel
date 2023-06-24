import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { paymentActions } from '../../apis/actions';

import './PaymentCard.scss';

const PaymentCard = ({ payment }) => {
    const [editMode, setEditMode] = useState(false);
    const [paymentTitle, setPaymentTitle] = useState(payment.title);

    const dispatch = useDispatch();
    const mode = useSelector(state => state.theme.mode);

    const handleEditPayment = (e) => {
        e.preventDefault();
        dispatch(paymentActions.editPayment({ _id: payment._id, title: paymentTitle },))

    }

    const handleChangeState = () => {
        dispatch(paymentActions.changePaymentState(payment._id));
    }

    const handleDeletePayment = () => {
        dispatch(paymentActions.deletePayment(payment._id));
    }

    return (
        <form noValidate onSubmit={handleEditPayment} className='payments-card lists-card--info gray shadow-5px size-16px margin-10px-V inter radius-15px white-bg full-width flex-row-left-start2col'>
            <i className={`bi bi-wallet2 margin-12px-H size-34px ${mode === 'dark-mode' ? 'gray' : 'orange'} width-10-100`} />
            <div className='width-30-100 margin-2px-V flex-row-left-start'>
                <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Title: </span>
                <input
                    className={`payments-card--input${editMode ? '--editing' : ''} gray`}
                    value={paymentTitle}
                    onChange={(e) => setPaymentTitle(e.target.value)}
                    disabled={!editMode}
                />
            </div>
            <div className='width-30-100 margin-2px-V'>
                <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Status: </span>
                <div className={`${payment.status === 'Active' ? 'green' : 'red'}`}>{payment.status}</div>
            </div>
            {editMode ?
                <>
                    <input
                        className={`width-15-100 pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg payments-card--button margin-6px-H`}
                        onClick={() => {
                            setEditMode(false);
                            setPaymentTitle(payment.title);
                        }}
                        value='Cancel'
                        type='button'
                    />
                    <input
                        className={`width-15-100 pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg payments-card--button margin-6px-H`}
                        onClick={handleChangeState}
                        value='Change State'
                        type='button'
                    />
                    <button
                        className={`width-15-100 pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg payments-card--button margin-6px-H`}
                        type='submit'
                    >
                        Save
                    </button>
                </>
                :
                <>
                    <input
                        className={`width-15-100 pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg payments-card--button margin-6px-H`}
                        onClick={() => setEditMode(true)}
                        value='Edit'
                        type='button'
                    />
                    <input
                        className={`width-15-100 pointer ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px orange-bg payments-card--button margin-6px-H`}
                        onClick={handleDeletePayment}
                        value='Delete'
                        type='button'
                    />
                </>
            }
        </form>
    )
}

export default PaymentCard