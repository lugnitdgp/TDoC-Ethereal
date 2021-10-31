import React from 'react';
import { useState,useEffect } from 'react';
import BankingContract from "../../contracts/Banking.json";
// import BankingContract from "./contracts/Banking.json";
import getWeb3 from "../../getWeb3";
import { Link } from 'react-router-dom'
import logo from '../../eth.png';
import "./MainSection.css";
const MainSection = () => {
          const [contract, setContract] = useState(undefined);
      const [account, setAccount] = useState(undefined);
      const [web3, setWeb3] = useState(undefined);

        useEffect(() => {
    const getBasicDetails = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = BankingContract.networks[networkId];

        const instance = new web3.eth.Contract(
         BankingContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        // this.setState({ web3, accounts, contract: instance }, this.runExample);
        setWeb3(web3);
        setAccount(accounts[0]);
        setContract(instance);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    getBasicDetails();
  }, []);
    return (
        <div>
            <img src={logo}/>
            <br/>
            <Link to="/create">
                <button className="btn-submit" >
                    Register here!
                </button>
                </Link>
        </div>
    )
}

export default MainSection
