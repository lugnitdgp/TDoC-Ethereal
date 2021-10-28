import React, {useState, useEffect } from "react";


import TodoList from "./contracts/TodoList.json";

import getWeb3 from "./getWeb3";

import "./App.css";

const App = () => {
  const[contract, setContract] = useState(undefined)
  const[account, setAccount] = useState(undefined)
  const[web3, setWeb3] = useState(undefined)


  //const[storageValue, setStorageValue] = useState(undefined)

  useEffect(() => {
    const getBasicDetails = async () => {
    try {
    // Get network provider and web3 instance.*
    const web3 = await getWeb3();
    // Use web3 to get the user's accounts.*
    const accounts = await web3.eth.getAccounts();
    // Get the contract instance.*
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TodoList.networks[networkId];
    const instance = new web3.eth.Contract(
      TodoList.abi,
      deployedNetwork && deployedNetwork.address
    );
    setWeb3(web3);
    setAccount(accounts[0]);
    setContract(instance);
    } catch (error) {
    // Catch any errors for any of the above operations.*
    alert(
    `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
    }
    }
    getBasicDetails();
    }, []);


    useEffect(() => {
      const getContractDetails = async () => {};
      if(
        typeof contract !== "undefined" &&
        typeof account !== "undefined" &&
        typeof web3 !== "undefined"
      ){

        console.log(contract)
        console.log(account)
        console.log(web3)
        getContractDetails();
      }
    }, [web3, account, contract])
  
  if (web3)  
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        
      </div>

    )
    else return null;
  //}
}

export default App;
