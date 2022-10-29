import React, { Component, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import background from './assets/images/background.svg';
import NavBar from "./components/navBar/NavBar";
import SideBar from "./components/sideBar/SideBar";
import MobMenu from './components/global/mobMenu/MobMenu';
import Home from "./components/homePage/Home";
import './assets/styles/bg.scss';
import './assets/styles/style.scss';
import Tools from "./components/ToolsIcon/Tools";

const App = () => {

  const [mobMenuShown, setMobMenuShown] = useState(false);

  return (
    <BrowserRouter>
      <div className="full-width full-screen-height">
        <img src={background} alt="ProjectBackground" className="bg full-screen-height" />
        <SideBar />
        {mobMenuShown && <MobMenu menuToggle={setMobMenuShown} />}
        <NavBar menuToggle={setMobMenuShown} />
        <Tools />
        <Routes>
          <Route path="/" element={<Home />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;