import Axios from '../AxiosInstance';
import errorHandler from '../../services/errorHandler';

import { reviewMutations,popupMutation, stickyMutations } from '../../redux/mutations';

const reviewActions = {
    getReviews() {
        return async (dispatch) => {
            try {
                const response = await Axios.get('/api/review-main/reviews');
                dispatch(reviewMutations.setReviews(response.data.data));
            } catch (error) {
                dispatch(reviewMutations.setReviews([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getReviewsForCustomer(customerId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/review-main/customer-reviews/${customerId}`);
                dispatch(reviewMutations.setReviews(response.data.data));
            } catch (error) {
                dispatch(reviewMutations.setReviews([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getReviewsForStore(storeId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/review-main/store-reviews/${storeId}`);
                dispatch(reviewMutations.setReviews(response.data.data));
            } catch (error) {
                dispatch(reviewMutations.setReviews([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getReviewsForDriver(driverId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/review-main/driver-reviews/${driverId}`);
                dispatch(reviewMutations.setReviews(response.data.data));
            } catch (error) {
                dispatch(reviewMutations.setReviews([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getReviewsForProduct(productId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/review-main/product-reviews/${productId}`);
                dispatch(reviewMutations.setReviews(response.data.data));
            }
            catch (error) {
                dispatch(reviewMutations.setReviews([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getReviewsData(orderId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.get(`/api/review-main/order/${orderId}`);
                dispatch(reviewMutations.setReviews(response.data.data));
                dispatch(popupMutation.clearPopPanel());
            } catch (error) {
                dispatch(reviewMutations.setReviews(null));
                errorHandler(dispatch, error.response);
            }
        }
    },
}

export default reviewActions;