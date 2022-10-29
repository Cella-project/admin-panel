import React, { Component } from "react";
import '../../assets/styles/mainStyles.css';
import Card from "../Card/Card";
import './Home.css';


class Home extends Component {
  state = {
    cards: [
      { title: 'Total Sales', content: '2M', icon: <i className="bi bi-currency-dollar  mint-green-color"></i> },
      { title: '# of Customers', content: '2500', icon: <i className="bi bi-people  mint-green-color"></i> },
      { title: '# of Products', content: '1000', icon: <i className="bi bi-box-seam  mint-green-color"></i> },
      { title: '# of Orders', content: '100', icon: <i className="bi bi-receipt  mint-green-color"></i> },
    ]
  }

  render() {
    return (
      <div className="home absolute" >
        <div className="braud-cramb inter font15 weight600">
          Home
        </div>
        <div className="header-cards full-width">
          <Card cards={this.state.cards} />
        </div>
      </div>
    );
  }
}
export default Home;

//  <div className="card shadow inline-block white-bg">
//     <p className="card-header inter weight600 mint-green-bg white-color flex align-items-center justify-content-center font15">Total Sales</p>
//     <span className="card-content flex align-items-center justify-content-center font30 open-sans weight700">
//       <i className="bi bi-currency-dollar  mint-green-color"></i>
//       <p className="card-header">2M</p>
//     </span>
//   </div>
//   <div className="card shadow inline-block white-bg">
//     <p className="card-header inter weight600 mint-green-bg white-color flex align-items-center justify-content-center font15"># of Customers</p>
//     <span className="card-content flex align-items-center justify-content-center font30 open-sans weight700">
//       <i className="bi bi-people mint-green-color"></i>
//       <p className="card-header">2500</p>
//     </span>
//   </div>
//   <div className="card shadow inline-block white-bg">
//     <p className="card-header inter weight600 mint-green-bg white-color flex align-items-center justify-content-center font15"># of Products</p>
//     <span className="card-content flex align-items-center justify-content-center font30 open-sans weight700">
//       <i className="bi bi-box-seam mint-green-color"></i>
//       <p className="card-header">1000</p>
//     </span>
//   </div>
//   <div className="card shadow inline-block white-bg">
//     <p className="card-header inter weight600 mint-green-bg white-color flex align-items-center justify-content-center font15"># of Orders</p>
//     <span className="card-content flex align-items-center justify-content-center font30 open-sans weight700">
//       <i className="bi bi-receipt mint-green-color"></i>
//       <p className="card-header">100</p>
//     </span>
//   </div> 
