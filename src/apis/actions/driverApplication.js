import Axios from '../AxiosInstance';
import AxiosFileManager from '../AxiosFileManager';
import { driverApplicationMutations, popupMutation, stickyMutations } from '../../redux/mutations';
import errorHandler from '../../services/errorHandler';

const driverApplicationActions = {
    getDriverApplications() {
        return async (dispatch) => {
            try {
                const response = await Axios.get('/api/driver-application/applications');
                dispatch(driverApplicationMutations.setDriverApplications(response.data.data));
            } catch (error) {
                dispatch(driverApplicationMutations.setDriverApplications([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    addDriverApplicationPicture(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await AxiosFileManager.post('/api/file-manager/file', payload);
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Driver picture added successfully.'
                }));
                afterSuccess(response);
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    approveDriverApplication(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to approve this driver application?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/driver-application/approve', { _id: payload });
                        dispatch(driverApplicationMutations.approveDriverApplication(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Driver application approved successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    rejectDriverApplication(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to reject this driver application?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/driver-application/reject', { _id: payload });
                        dispatch(driverApplicationMutations.rejectDriverApplication(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Driver application rejected successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    updateDriverApplication(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/driver-application/application', payload);
                dispatch(driverApplicationMutations.updateDriverApplication(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Driver application updated successfully.'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    deleteDriverApplication(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to delete this driver application?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        await Axios.delete(`/api/driver-application/application/${payload}`);
                        dispatch(driverApplicationMutations.deleteDriverApplication(payload));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Driver application deleted successfully.'
                        }));
                        afterSuccess();
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    getDriverApplicationData(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.get(`/api/driver-application/application/${payload}`);
                dispatch(driverApplicationMutations.setDriverApplicationData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
            } catch (error) {
                dispatch(driverApplicationMutations.setDriverApplicationData(null));
                errorHandler(dispatch, error.response);
            }
        }
    }
}

export default driverApplicationActions;