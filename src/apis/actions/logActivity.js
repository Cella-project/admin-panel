import Axios from '../AxiosInstance';
import errorHandler from '../../services/errorHandler';

import store from '../../redux/index';

import { logActivityMutations } from '../../redux/mutations';

const logActivityActions = {
    getAllLogs(offset) {
        return async (dispatch) => {
            try {
                let logs = store.getState().log.logs;
                if (logs === null) {
                    logs = [];
                }

                const response = await Axios.get(`/api/log-archive/logs?skip=${offset}&limit=10`);

                
                const newLogs = [...logs, ...response.data.data];

                if (response.data.data.length > 0) {
                    dispatch(logActivityMutations.setLogs(newLogs));
                }
            } catch (error) {
                dispatch(logActivityMutations.setLogs([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getAdminLogs(adminId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/log-archive/admin-logs/${adminId}`);
                dispatch(logActivityMutations.setLogs(response.data.data));
            } catch (error) {
                dispatch(logActivityMutations.setLogs([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getStoreLogs(storeId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/log-archive/store-logs/${storeId}`);
                dispatch(logActivityMutations.setLogs(response.data.data));
            } catch (error) {
                dispatch(logActivityMutations.setLogs([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getDriverLogs(driverId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/log-archive/driver-logs/${driverId}`);
                dispatch(logActivityMutations.setLogs(response.data.data));
            } catch (error) {
                dispatch(logActivityMutations.setLogs([]));
                errorHandler(dispatch, error.response);
            }
        }
    }
}

export default logActivityActions;