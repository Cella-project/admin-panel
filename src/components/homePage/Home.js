import React, { Component } from "react";
import '../../assets/styles/style.scss';
import Card from "../global/Card/Card";
import './Home.scss';


class Home extends Component {
  state = {
    cards: [
      { title: 'Total Sales', content: '2M', icon: <i className="bi bi-currency-dollar  mint-green"></i> },
      { title: '# of Customers', content: '2500', icon: <i className="bi bi-people  mint-green"></i> },
      { title: '# of Products', content: '1000', icon: <i className="bi bi-box-seam  mint-green"></i> },
      { title: '# of Orders', content: '100', icon: <i className="bi bi-receipt  mint-green"></i> },
    ]
  }

  render() {
    return (
      <div className="home" >
        <div className="braud-cramb inter size-16px font-bold">
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