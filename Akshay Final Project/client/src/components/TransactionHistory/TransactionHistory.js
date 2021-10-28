import React from 'react';
import { useState,useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import BankingContract from "../../contracts/Banking.json";
import getWeb3 from "../../getWeb3";
import "./TransactionHistory.css";
import logo from '../../eth.png';


const TransactionHistory = () => {


    const [contract, setContract] = useState(undefined);
    const [account, setAccount] = useState(undefined);
    const [web3, setWeb3] = useState(undefined);
    const [loading,setLoading]=useState(true);
    // const[accountBalance,setAccountBalance]=useState(undefined);
    // const[dateCreated,setDateCreated]=useState(undefined);
    // const[bankingAccount,setBankingAccount]=useState(undefined);
    // const[serial,setSerial]=useState(undefined);
    const[transactionHistory,setTransactionHistory]=useState([]);
    
    const{id}=useParams();
                
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


  useEffect(()=>{
  const getContractDetails=async ()=>{
      let transactionNumber=await contract.methods.transacNum().call();
      console.log(transactionNumber);

            for(let i=1;i<=transactionNumber;i++)
      {
          await contract.methods.transactions(i).call()
          .then((res)=>{
              console.log(id);
              if(res.accountSerial===id){
                  console.log(res);
                  var transac=transactionHistory;
                  transac.push(res);
                  setTransactionHistory(transac);
              }
            })
          .catch((err)=>{
              console.log(err);
          });
        }
            setLoading(false);
  
  };

  if (
   typeof contract !== "undefined" &&
   typeof account !== "undefined" &&
   typeof web3 !== "undefined"
   ) {
 //       console.log(contract);
 //       console.log(account);
 //       console.log(web3);
       getContractDetails();
 }
}, [web3, account, contract]);


  if(!web3){
      return <div>Loading, web3, accounts, and contract...</div>;
  }

    return (
        <div>
            <img src={logo}/>
            {/* <form className="form-submit">

                <input className="input-field" type="text" placeholder="Enter transaction number till where you want to see transactions"
                value={transactionNumber}
                onChange={(e)=>{
                    setTransationNumber(e.target.value);
                }}>
                </input>                
                <br/>
                <button className="btn-submit" type="submit">
                    Get transactions!
                </button>
            </form> */}
            {!loading
            ?transactionHistory.map((transaction)=>{
                var time=new Date(transaction.transactedAt*1000).toLocaleString();
                return(
                    <div className="transac-info">
            <h1 className="account-name-2">TRANSACTION NUMBER : {transaction.transacNum}</h1>
            <h1 className="account-name-2">TRANSACTION TYPE : {transaction.transacType}</h1>
            <h1 className="account-name-1">TRANSACTED AMOUNT : {(transaction.amountTrans)/1000000000000000000} ETH</h1>
            <h1 className="account-name-2">CURRENT BALANCE : {transaction.currentBalance} ETH</h1>
            <h1 className="account-name-2">TIME : {time}</h1>
            </div>)
            }):null}
            <hr></hr>
        </div>
    )
}

export default TransactionHistory
