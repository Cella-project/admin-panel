import React, { Component } from "react";
import '../../assets/styles/style.scss';
import Card from "../global/Card/Card";
import './Home.scss';


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