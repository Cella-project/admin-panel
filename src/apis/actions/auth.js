import Axios from '../AxiosInstance';

import AxiosFileManager from '../AxiosFileManager';

import errorHandler from '../../services/errorHandler';

import router from '../../router/router'

import {
    stickyMutations,
    popupMutation,
    authMutations
} from '../../redux/mutations';

const authActions = {
    login(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/admin-auth/login', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setAuthData({
                        token: response.data.token,
                        userData: response.data.data
                    }));
                    localStorage.setItem('Token', response.data.token);
                    localStorage.setItem('User', JSON.stringify(response.data.data));

                    router.navigate('/');

                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'Logged In successfully, Welcome Back.'
                    }));

                }
            } catch (error) {
                errorHandler(dispatch, error.response, 'Incorrect email or password.');
            }
        }
    },
    forgetPassword(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/admin-auth/forget-password', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setEmail(payload.email));
                    router.navigate('/login/verify-code');
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'Check your email, we send you an OTP to reset your password.'
                    }));
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    verifyOTP(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/admin-auth/validate-otp', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setOTP(payload.otp));
                    router.navigate('/login/reset-password');
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'Successfull, set your new password.'
                    }));
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    resetPassword(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/admin-auth/reset-password', payload);
                if (response.status === 200) {
                    dispatch(authMutations.clearForgetPasswordCycle());
                    router.navigate('/login');
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'Your password changed successfully.'
                    }));
                }
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    changeProfileImage(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await AxiosFileManager.post('/api/file-manager/file', payload);
                dispatch(popupMutation.clearPopPanel());
                afterSuccess(response);
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    editProfile(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/admin-profile/admin', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setUserData(response.data.data));
                    localStorage.setItem('User', JSON.stringify(response.data.data));
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'Your profile updated successfully.'
                    }));
                    afterSuccess();
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    changePassword(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/admin-profile/change-password', payload);
                if (response.status === 200) {
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'Your password changed successfully.'
                    }));
                    afterSuccess();
                }
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    logout() {
        return async (dispatch) => {
            dispatch(stickyMutations.popAllNotes());
            dispatch(stickyMutations.pushNote({
                type: 'success',
                msg: 'You logged out successfully.'
            }));
            localStorage.removeItem('Token');
            localStorage.removeItem('User');
            router.navigate('/login');
        }
    }
}

export default authActions;