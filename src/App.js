import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

import StickyBoard from './components/sticky/StickyBoard';
import Popup from './components/popups/Popup';
import { adminActions, authActions } from "./apis/actions";
import { authMutations, connectedUsersMutations, adminMutations, driverMutations } from "./redux/mutations";

import router from "./router/router";
import socket from "./Socket";

let isloaded = false;

const App = () => {
  const dispatch = useDispatch();

  const mode = useSelector(state => state.theme.mode);
  const accessToken = localStorage.getItem('Access Token');
  const refreshToken = localStorage.getItem('Refresh Token');
  const user = useSelector(state => state.auth.userData);


  useEffect(() => {
    const refreshTokenHandler = async (token) => {
      if (token) {
        await dispatch(authActions.refreshToken(token));
      }
    };
    const lastRefreshTime = localStorage.getItem('Refresh Token Time');
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastRefreshTime;

    if (timeDifference >= 14 * 60 * 1000) {
      refreshTokenHandler(refreshToken);
    }

    setInterval(() => {
      refreshTokenHandler(refreshToken);
    }, 14 * 60 * 1000);
  }, [refreshToken, dispatch]);

  const checkAuth = () => {
    if (accessToken && refreshToken) {
      dispatch(authMutations.setUserData(null));
      dispatch(authActions.getProfile());
      dispatch(authMutations.setAuthData({
        userData: user,
        access: accessToken,
        refresh: refreshToken
      }));
      socket.auth = { token: accessToken };
      socket.connect();

      socket.on('user:allUsers', users => {
        dispatch(connectedUsersMutations.setUsers(users));
        dispatch(adminActions.getAdmins());
      });

      socket.on('user:connected', user => {
        dispatch(connectedUsersMutations.addUser(user));
        if (user.role === 'admin') {
          dispatch(adminMutations.userConnected(user))
        } else if (user.role === 'driver') {
          dispatch(driverMutations.driverConnected(user))
        }
      });

      socket.on('user:disconnected', user => {
        dispatch(connectedUsersMutations.removeUser(user));
        if (user.role === 'admin') {
          dispatch(adminMutations.userDisconnected(user))
        } else if (user.role === 'driver') {
          dispatch(driverMutations.driverDisconnected(user))
        }
      });
    } else {
      localStorage.removeItem('Access Token');
      localStorage.removeItem('Refresh Token');
      localStorage.removeItem('fcmToken');
      router.navigate('/admin-panel/login');
    }
  };

  if (!isloaded) {
    checkAuth();
    isloaded = true;
  }

  const notes = useSelector(state => state.sticky.notes);
  const isPopupShown = useSelector(state => state.popup.popPanelShown);

  return (
    <div className={`u-disable-touch ${mode}`}>
      {notes.length > 0 && <StickyBoard />}
      {isPopupShown && <Popup />}

      <Outlet />
    </div>
  );
}

export default App;