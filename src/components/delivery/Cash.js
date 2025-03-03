import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { driverActions } from '../../apis/actions';

import './Cash.scss';

const Cash = ({ popupToggle, header }) => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.theme.mode);
  const driverData = useSelector(state => state.driver.driverData);

  const {
    value: enteredAmount,
    isValid: enteredAmountIsValid,
    error: amountError,
    isTouched: amountIsTouched,
    valueChangeHandler: amountChangedHandler,
    inputBlurHandler: amountBlurHandler,
    reset: resetAmountInput,
  } = useInput((value) => {
    const isValid = value.trim() !== '' && value > 0;
    let error = '';
    if (value.trim() === '') {
      error = 'Please enter an amount.';
    } else if (value < 0) {
      error = 'Please enter a valid amount.';
    }
    return { isValid, error };
  });

  const amountClasses = amountIsTouched && !enteredAmountIsValid
    ? 'form-control-invalid'
    : '';

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (header === 'Cash in') {
      dispatch(driverActions.cashIn({
        _id: driverData._id,
        amount: +enteredAmount
      }, () => {
        resetAmountInput();
        popupToggle(false);
        document.getElementById("dashboard-view").style.zIndex = 10;
        window.onscroll = function () { }
      }));
    } else if (header === 'Cash out') {
      dispatch(driverActions.cashOut({
        _id: driverData._id,
        amount: +enteredAmount
      }, () => {
        resetAmountInput();
        popupToggle(false);
        document.getElementById("dashboard-view").style.zIndex = 10;
        window.onscroll = function () { }
      }));
    }
  }

  return (
    <form noValidate className="cash" onSubmit={formSubmissionHandler}>
      <div className="full-width flex-col-left-start cash--input-container">
        <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="amount" >
          Amount
        </label>
        <div className={`full-width gray radius-10px white-bg flex-row-left-start cash--input ${amountClasses}`}>
          <i className="bi bi-cash size-20px" />
          <input
            className="full-width gray margin-4px-H"
            type={"number"}
            placeholder={"Amount"}
            id={"amount"}
            value={enteredAmount}
            onChange={amountChangedHandler}
            onBlur={amountBlurHandler}
            autoFocus
          />
        </div>
        {amountIsTouched && (
          <div className='error-message'>{amountError}</div>
        )}
      </div>
      <div className="cash--actions flex-row-between full-width">
        <button
          className={`cash--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
          type='submit'
        >
          Confirm
        </button>
        <button
          className="cash--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
          onClick={() => {
            resetAmountInput();
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { }
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default Cash;