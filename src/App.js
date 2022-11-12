import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import background from './assets/images/background.svg';
import NavBar from "./components/global/navBar/NavBar";
import SideBar from "./components/global/sideBar/SideBar";
import MobMenu from './components/global/mobMenu/MobMenu';
import Tools from "./components/global/ToolsIcon/Tools";
import Routing from "./router/Routing";
import './assets/styles/bg.scss';
import './assets/styles/style.scss';

const App = () => {

  const [mobMenuShown, setMobMenuShown] = useState(false);

  return (
    <BrowserRouter>
      <div className="full-width full-screen-height app">
        <img src={background} alt="ProjectBackground" className="bg full-screen-height" />
        <SideBar />
        {mobMenuShown && <MobMenu menuToggle={setMobMenuShown} />}
        <NavBar menuToggle={setMobMenuShown} />
        <Tools />
        <Routing />
        
      </div>
    </BrowserRouter>
  );
}

export default App;