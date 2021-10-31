import React, { useState, useEffect, Component } from "react";
import Routing from "./Routing";
import Navbar from "./components/Navbar/Navbar";
// import BankingContract from "./contracts/Banking.json";
// import getWeb3 from "./getWeb3";
// import Counter from "./Counter";

import "./App.css";

const App = () => {

    return (
      
      <div className="App">
        <Navbar/>
        <Routing/>
      </div>
    );
  // else {
  //   return null;
  // }
};

export default App;
