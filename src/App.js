import React from "react";

import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

import StickyBoard from './components/sticky/StickyBoard';
import Popup from './components/popups/Popup';

import { authMutations } from "./redux/mutations";
import router from "./router/router";

let isloaded = false;

const App = () => {
  const dispatch = useDispatch();

  const mode = useSelector(state => state.theme.mode);

  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem('User'));
    const token = localStorage.getItem('Token');

    if (user && token) {
      dispatch(authMutations.setAuthData({
        userData: user,
        token: token
      }));
    } else {
      localStorage.removeItem('User');
      localStorage.removeItem('Token');
      router.navigate('/login');
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