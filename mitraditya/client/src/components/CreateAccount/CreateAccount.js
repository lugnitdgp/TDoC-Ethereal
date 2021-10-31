import React from 'react';
import { useState,useEffect } from 'react';
import BankingContract from "../../contracts/Banking.json";
// import BankingContract from "./contracts/Banking.json";
import getWeb3 from "../../getWeb3";
import "./CreateAccount.css";
import Navigate from '../Navbar/Navbar';

const CreateAccount = () => {
      const [contract, setContract] = useState(undefined);
      const [account, setAccount] = useState(undefined);
      const [web3, setWeb3] = useState(undefined);
      const [accountHolder, setAccountHolder] = useState("");
      const [location, setLocation] = useState("");

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

  useEffect(() => {
    const getContractDetails = async () => {}
      // await contract.methods.createAccount().call()
    //     .then((result) => {
    //       console.log(result);
    //     })

    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      console.log(contract);
      console.log(account);
      console.log(web3);
      web3.eth.defaultAccount=account;
      getContractDetails();
    }
  }, [web3, account, contract]);


  const handleSubmit=async (e)=>{
      e.preventDefault();
      if(
            typeof contract !== "undefined" &&
            typeof account !== "undefined" &&
            typeof web3 !== "undefined"
      ){
          await contract.methods.createAccount(accountHolder,location,account)
          .send(
              {
                  from:account,
                  to:contract.options.address,
                  value: web3.utils.toWei('2','ether'),
              }
          )
          .then((res)=>{
            console.log(res);
            window.location.href="/accounts"
          })
          .catch((err)=>{
            console.log(err);
          });
      }

  }

    return (
        <div>
            <h1 className="info">To create an account, kindly fill the entries given below.</h1>
            <form className="form-submit"
            onSubmit={handleSubmit}>

                <input className="input-field" type="text" placeholder="Enter Name"
                value={accountHolder}
                onChange={(e)=>{
                    setAccountHolder(e.target.value);
                }}>
                </input>
                <br/>
                <input className="input-field" type="text" placeholder="Enter your location"
                value={location}
                onChange={(e)=>{
                    setLocation(e.target.value);
                }}>
                </input>
                <br/>
                <button className="btn-submit" type="submit">
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default CreateAccount
