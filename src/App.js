import React, { Component } from "react";

// main style lib, ( global to all the components ).

class App extends Component {
  render() {
    return (
      <div className="full-width flex-col-center gray-bg shadow-5px">
        <p className="open-sans yellow">Hello World</p>
        <p className="inter yellow">Hello World</p>
        <p className="pt-sans yellow">Hello World</p>
      </div>
    );
  }
}

export default App;
