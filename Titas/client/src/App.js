import React from "react";
import Routing from "./Routing"
import Navbar from "./components/Navbar/Navbar"
import "./App.css";

const App = () => {

  //if (web3)
    return (
      <div className="App">
        <Navbar/>
        <Routing/>
      </div>
    );
};

export default App;
