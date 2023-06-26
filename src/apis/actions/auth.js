import Axios from '../AxiosInstance';

import errorHandler from '../../services/errorHandler';

import router from '../../router/router';

import socket from '../../Socket';

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
                        access: response.data.token.access,
                        refresh: response.data.token.refresh,
                        userData: response.data.data
                    }));
                    localStorage.setItem('Access Token', response.data.token.access);
                    localStorage.setItem('Refresh Token', response.data.token.refresh);

                    router.navigate('/admin-panel');

                    socket.auth = { token: response.data.token.access };
                    socket.connect();

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
    getProfile() {
        return async (dispatch) => {
            try {
                const response = await Axios.get('/api/admin-profile/profile');
                if (response.status === 200) {
                    dispatch(authMutations.setUserData(response.data.data));
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    refreshToken(payload) {
        return async (dispatch) => {
            try {
                const response = await Axios.post('/api/admin-auth/refresh-token', {
                    refreshToken: payload
                });
                if (response.status === 200) {
                    dispatch(authMutations.setToken(response.data.token));
                    localStorage.setItem('Access Token', response.data.token.access);
                    localStorage.setItem('Refresh Token', response.data.token.refresh);
                    localStorage.setItem('Refresh Token Time', new Date().getTime());
                }
            }
            catch (error) {
                if (error.response.status === 401 && error.response.message === 'jwt expired') {
                    localStorage.removeItem('Access Token');
                    localStorage.removeItem('Refresh Token');
                    router.navigate('/admin-panel/login');
                }
                errorHandler(dispatch, error.response);
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
                    router.navigate('/admin-panel/login/verify-code');
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
                    router.navigate('/admin-panel/login/reset-password');
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
                    router.navigate('/admin-panel/login');
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
                const response = await Axios.post('/api/file-manager/file', payload);
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
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'Your profile updated successfully.'
                    }));
                    this.getProfile();
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
            localStorage.removeItem('Access Token');
            localStorage.removeItem('Refresh Token');

            socket.disconnect();

            router.navigate('/admin-panel/login');
        }
    }
}

export default authActions;