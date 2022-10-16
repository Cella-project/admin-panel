import React, { Component } from "react";
import '../../assets/styles/mainStyles.css';
import './Home.css';


const Home = () => {
  return (
    <div className="home absolute">
      <div className="braud-cramb inter font15 weight600">
        Home
      </div>
      <div className="header-cards">
        <div className="card shadow inline-block white-bg">
          <p className="card-header inter weight600 mint-green-bg white-color flex align-items-center justify-content-center font15">Total Sales</p>
          <span className="card-content flex align-items-center space-between font30 open-sans weight700">
            <i className="bi bi-currency-dollar  mint-green-color"></i>
            2 M
          </span>
        </div>
        <div className="card shadow inline-block white-bg">
          <p className="card-header inter weight600 mint-green-bg white-color flex align-items-center justify-content-center font15"># of Customers</p>
          <span className="card-content flex align-items-center space-between font30 open-sans weight700">
            <i className="bi bi-people mint-green-color"></i>
            2500
          </span>
        </div>
        <div className="card shadow inline-block white-bg">
          <p className="card-header inter weight600 mint-green-bg white-color flex align-items-center justify-content-center font15"># of Products</p>
          <span className="card-content flex align-items-center space-between font30 open-sans weight700">
            <i className="bi bi-box-seam  mint-green-color"></i>
            1000
          </span>
        </div>
        <div className="card shadow inline-block white-bg">
          <p className="card-header inter weight600 mint-green-bg white-color flex align-items-center justify-content-center font15"># of Orders</p>
          <span className="card-content flex align-items-center space-between font30 open-sans weight700">
            <i className="bi bi-receipt  mint-green-color"></i>
            100
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
