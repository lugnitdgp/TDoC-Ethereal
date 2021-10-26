import React, { useState, useEffect } from "react";
import BankingContract from "../../contracts/Banking.json";
import getWeb3 from "../../getWeb3";

import "./MainSection.css";

const MainSection = () => {
  const [contract, setContract] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);

  const [accountHolder, setAccountHolder] = useState("");
  const [accountLocation, setAccountLocation] = useState("");

  useEffect(() => {
    const getBasicDetails = async () => {
      try {
        // Get network provider and web3 instance.*
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.*
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.*
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = BankingContract.networks[networkId];

        console.log(deployedNetwork.address);

        const instance = new web3.eth.Contract(
          BankingContract.abi,
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
    };
    getBasicDetails();
  }, []);

  useEffect(() => {
    const getContractDetails = async () => {};
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      localStorage.setItem("logged", true);
      getContractDetails();
    }
  }, [web3, account, contract]);

  if (!web3) {
    return <div>Loading web3, accounts, and contracts...</div>;
  }
  return (
    <div className="main-section">
      <div className="heading-ethereal">
        <h1>ETHEREAL</h1>
      </div>
      <div className="sub-heading">
        <h2>The most secure banking platform</h2>
      </div>
      <div className="main-section-text">
        <p>
          Now don't worry about money wandering off away from your accout as
          this application is secured using blockchain
        </p>
      </div>
      <div className="button-get-started">
        <button className="get-started">
          <a href="/create">GET STARTED</a>
        </button>
      </div>
      <div className="image-wrapper">
        <img src="C:\Users\91704\Desktop\Ethereal\client\src\assets\2.svg"></img>
      </div>
    </div>
  );
};

export default MainSection;
