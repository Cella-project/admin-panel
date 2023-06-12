import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payments: null,
    },
    reducers: {
        setPayments(state, action) {
            state.payments = action.payload;
        },
        setPaymentData(state, action) {
            const updatedPayment = action.payload;
            const existingPaymentIndex = state.payments.findIndex(
                (payment) => payment._id === updatedPayment._id
            );
            if (existingPaymentIndex !== -1) {
                state.payments[existingPaymentIndex] = updatedPayment;
            }
        },
        addPayment(state, action) {
            if (state.payments === null) {
                state.payments = [];
            }
            state.payments.push(action.payload);
        },
        changePaymentState(state, action) {
            const updatedPayment = action.payload;
            const existingPaymentIndex = state.payments.findIndex(
                (payment) => payment._id === updatedPayment._id
            );
            if (existingPaymentIndex !== -1) {
                state.payments[existingPaymentIndex] = updatedPayment;
            }
        },
        deletePayment(state, action) {
            const deletedPaymentId = action.payload || action;
            return {
                ...state,
                payments: state.payments.filter(payment => payment._id !== deletedPaymentId)
            };
        }
    }
});

export default paymentSlice;