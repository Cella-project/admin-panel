import React, { Component } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import background from './assets/images/background.svg'
import NavBar from "./components/navBar/NavBar";
import SideBar from "./components/sideBar/SideBar";
import Home from "./components/homePage/Home";
import './assets/styles/bg.css';
import './assets/styles/mainStyles.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="fullWidth fullHeight">
          <img src={background} alt="ProjectBackground" className="bg absolute fullHeight" />
          <SideBar />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
