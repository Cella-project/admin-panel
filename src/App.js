import React from "react";

import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

import StickyBoard from './components/sticky/StickyBoard';
import Popup from './components/popups/Popup';

import { authMutations } from "./redux/mutations";
import router from "./router/router";
import { authActions } from "./apis/actions";

let isloaded = false;

const App = () => {
  const dispatch = useDispatch();

  const mode = useSelector(state => state.theme.mode);
  const accessToken = localStorage.getItem('Access Token');
  const refreshToken = localStorage.getItem('Refresh Token');
  const user = JSON.parse(localStorage.getItem('User'));

  const checkAuth = () => {
    if (user && accessToken && refreshToken) {
      dispatch(authMutations.setAuthData({
        userData: user,
        access: accessToken,
        refresh: refreshToken
      }));
    } else {
      localStorage.removeItem('User');
      localStorage.removeItem('Access Token');
      localStorage.removeItem('Refresh Token');
      router.navigate('/login');
    }
  };

  const refreshTokenHandler = (token) => {
    if (token) {
      dispatch(authActions.refreshToken(token));
    }
  };

  if (!isloaded) {
    checkAuth();
    refreshTokenHandler(refreshToken);
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