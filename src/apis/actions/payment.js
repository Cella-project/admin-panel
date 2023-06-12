import Axios from "../AxiosInstance";

import { paymentMutations, popupMutation, stickyMutations } from "../../redux/mutations";
import errorHandler from '../../services/errorHandler';

const paymentActions = {
    getPayments() {
        return async (dispatch) => {
            try {
                const response = await Axios.get('/api/payment-methods/payments');
                dispatch(paymentMutations.setPayments(response.data.data));
            } catch (error) {
                dispatch(paymentMutations.setPayments([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    addPayment(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/payment-methods/payment', payload);
                dispatch(paymentMutations.addPayment(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Payment added successfully.'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    editPayment(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/payment-methods/payment', payload);
                dispatch(paymentMutations.setPaymentData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Payment updated successfully.'
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    changePaymentState(paymentID) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to change this payment method state?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put(`/api/payment-methods/change-state/`, { _id: paymentID });
                        dispatch(paymentMutations.changePaymentState(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Payment state changed successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    deletePayment(paymentID) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to delete this payment method?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        await Axios.delete(`/api/payment-methods/payment/${paymentID}`);
                        dispatch(paymentMutations.deletePayment(paymentID));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Payment deleted successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    }
};

export default paymentActions;