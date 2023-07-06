import Axios from '../AxiosInstance';

import { adminMutations, authMutations, popupMutation, stickyMutations } from '../../redux/mutations';
import errorHandler from '../../services/errorHandler';

import store from '../../redux/index';
import authActions from './auth';

const adminActions = {
    getAdmins() {
        return async (dispatch) => {
            try {
                const connectedUsers = store.getState().connectedUsers.connectedUsers;
                const response = await Axios.get('/api/admin-main/admins');
                dispatch(adminMutations.setAdmins(response.data.data.map(admin => {
                    return {
                        ...admin,
                        connected: connectedUsers.find(el => el.userId === admin._id) ? true : false
                    }
                })));
            } catch (error) {
                dispatch(adminMutations.setAdmins([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    addAdmin(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/admin-main/admin', payload);
                dispatch(adminMutations.addAdmin(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Admin added successfully.'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    verifyEmail(adminID) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.get(`/api/admin-profile/verify-email/${adminID}`);
                if (response.status === 200) {
                    dispatch(popupMutation.clearPopPanel());
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    validateOTP(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/admin-profile/validate-otp', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setUserData(response.data.data));
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'OTP verified successfully.'
                    }));
                    dispatch(authActions.getProfile());
                    afterSuccess();
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    addAdminPicture(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/file-manager/file', payload);
                dispatch(popupMutation.clearPopPanel());
                afterSuccess(response);
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
}

export default adminActions;