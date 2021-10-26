import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BankingContract from "../../contracts/Banking.json";
import getWeb3 from "../../getWeb3";
import Loader from "react-loader-spinner";
import "./AccountDetails.css";

const AccountDetails = () => {
  const [contract, setContract] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [contractAddress, setContractAddress] = useState(undefined);

  const [bankingAccount, setBankingAccount] = useState(undefined);
  const [createdDate, setCreatedDate] = useState(undefined);

  const [loading, setLoading] = useState(true);
  const [bankingAccountBalance, setBankingAccountBalance] = useState(undefined);

  const [balanceAdded, setBalanceAdded] = useState("");

  const { id } = useParams();

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
        setContractAddress(deployedNetwork.address)
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
    const getContractDetails = async () => {
      console.log(id);

      await contract.methods
      .accounts(id)
        .call()
        .then((res) => {
          setBankingAccount(res);
          setBankingAccountBalance(res.balance);

          setCreatedDate(new Date(res.createdAt * 1000).toLocaleString());

          console.log(createdDate);
          console.log(res);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

      await contract.methods
        .getContractBalance()
        .call()
        .then((res) => {
          console.log(web3.utils.fromWei(res, "ether"));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      console.log(contract);
      console.log(contract.options.address);
      console.log(contractAddress);
      getContractDetails();
    }
  }, [web3, account, contract]);

  const addBalance = async (e) => {
    e.preventDefault();
    console.log(`${id}`);
    console.log(balanceAdded);
    console.log("add");

    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      await contract.methods
        .addBalance(id, web3.utils.toWei(balanceAdded, "ether"), account)
        .send({ from: account, value: web3.utils.toWei(balanceAdded, "ether") })

        .then(async (res) => {
          await contract.methods
            .accounts(id)
            .call()
            .then((res) => {
              setBankingAccountBalance(res.balance);
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(res);
        });
    }
  };

  if (!web3) {
    return (
      <div className="default">
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={10000}
        />
      </div>
    );
  }
  return (
    <div className="account-details-section">
      <div className="account-details-grid-wrapper">
        <div className="account-card">
          {!loading ? (
            <div className="inner-wrapper">
              <h1>ACCOUNT-NUMBER : {bankingAccount.serialNumber}</h1>
              <h1>ACCOUNT-NAME : {bankingAccount.name}</h1>
              <h1>ACCOUNT-BALANCE : {bankingAccountBalance} ETH</h1>
              <h1>ACCOUNT-LOCATION : {bankingAccount.location}</h1>
              <h1>ACCOUNT-CREATED-AT : {createdDate}</h1>
            </div>
          ) : null}
        </div>

        <div className="add-balance-card">
          <h1>Add more balance to your account</h1>
          <form onSubmit={addBalance} className="transact-form">
            <input
              className="form-input-field"
              type="number"
              placeholder="Add amount"
              value={balanceAdded}
              onChange={(e) => {
                setBalanceAdded(e.target.value);
              }}
            ></input>
            <button className="submit-button" type="submit">
              ADD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;


