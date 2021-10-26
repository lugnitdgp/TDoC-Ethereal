import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  f1 = () => {
    this.setstate({ count: this.state.count + 1 });
  };

  f2 = () => {
    this.setstate({ count: this.state.count - 1 });
  };
  render() {
    return (
      <div>
        <button type="button" onClick="function1()">
          click to increment
        </button>
        <button type="button" onClick="function2()">
          click to Decrement
        </button>
        <h1>{this.state.count}</h1>
      </div>
    );
  }
}

export default App;
