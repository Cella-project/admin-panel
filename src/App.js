import React from "react";

import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

import StickyBoard from './components/sticky/StickyBoard';
import Popup from './components/popups/Popup';
import { authActions } from "./apis/actions";
import { authMutations } from "./redux/mutations";

import router from "./router/router";
import socket from "./Socket";

let isloaded = false;

const App = () => {
  const dispatch = useDispatch();
  
  const lastRefreshTime = localStorage.getItem('Refresh Token Time');
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - lastRefreshTime;
  
  const mode = useSelector(state => state.theme.mode);
  const accessToken = localStorage.getItem('Access Token');
  const refreshToken = localStorage.getItem('Refresh Token');
  // const user = JSON.parse(localStorage.getItem('User'));
  const user = useSelector(state => state.auth.userData);
  
  const checkAuth = () => {
    if (accessToken && refreshToken) {
      dispatch(authActions.getProfile());
      dispatch(authMutations.setAuthData({
        userData: user,
        access: accessToken,
        refresh: refreshToken
      }));
      socket.auth = { token: accessToken };
      socket.connect();
    } else {
      // localStorage.removeItem('User');
      localStorage.removeItem('Access Token');
      localStorage.removeItem('Refresh Token');
      router.navigate('/login');
    }
  };

  const refreshTokenHandler = (token) => {
    if (token) {
      dispatch(authActions.refreshToken(token));
      localStorage.setItem('Refresh Token Time', new Date().getTime());
    }
  };

  if (!isloaded) {
    checkAuth();
    if (timeDifference >= 14 * 60 * 1000) {
      refreshTokenHandler(refreshToken);
    }
    setInterval(() => {
      refreshTokenHandler(refreshToken);
    }, 14 * 60 * 1000);
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