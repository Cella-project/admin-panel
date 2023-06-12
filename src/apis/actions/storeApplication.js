import Axios from '../AxiosInstance';
import { storeApplicationMutations, popupMutation, stickyMutations } from '../../redux/mutations';
import errorHandler from '../../services/errorHandler';

const storeApplicationActions = {
    getStoreApplications() {
        return async (dispatch) => {
            try {
                const response = await Axios.get('/api/store-application/applications');
                dispatch(storeApplicationMutations.setStoreApplications(response.data.data));
            } catch (error) {
                dispatch(storeApplicationMutations.setStoreApplications([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    approveStoreApplication(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to approve this store application?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/store-application/approve', { _id: payload });
                        dispatch(storeApplicationMutations.approveStoreApplication(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Store Application approved successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    rejectStoreApplication(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to reject this store application?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/store-application/reject', { _id: payload });
                        dispatch(storeApplicationMutations.rejectStoreApplication(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Store Application rejected successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    updateStoreApplication(payload, aftersuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/store-application/application', payload);
                if (response.status === 200) {
                    dispatch(storeApplicationMutations.setStoreApplicationData(response.data.data));
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'Store Application updated successfully.'
                    }));
                    aftersuccess();
                }
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    getStoreApplicationData(storeApplicationId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.get(`/api/store-application/application/${storeApplicationId}`);
                dispatch(storeApplicationMutations.setStoreApplicationData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    deleteStoreApplication(storeApplicationId, aftersuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to delete this store application?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        await Axios.delete(`/api/store-application/application/${storeApplicationId}`);
                        dispatch(storeApplicationMutations.deleteStoreApplication(storeApplicationId));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Store Application deleted successfully.'
                        }));
                        aftersuccess();
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    }
}

export default storeApplicationActions;