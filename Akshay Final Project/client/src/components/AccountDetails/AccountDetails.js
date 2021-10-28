import React from 'react';
import { useState,useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import BankingContract from "../../contracts/Banking.json";
import getWeb3 from "../../getWeb3";
import "./AccountDetails.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

const AccountDetails = () => {

    const [contract, setContract] = useState(undefined);
    const [account, setAccount] = useState(undefined);
    const [web3, setWeb3] = useState(undefined);
    const [loading,setLoading]=useState(true);
    const[accountBalance,setAccountBalance]=useState(undefined);
    const[dateCreated,setDateCreated]=useState(undefined);
    const[balanceAdded,setBalanceAdded]=useState("");
    const[bankingAccount,setBankingAccount]=useState(undefined);
    const[balanceRemoved,setBalanceRemoved]=useState(undefined);
    
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
      
    //   console.log(id);

          await contract.methods.accounts(id).call()
          .then((res)=>{
              setBankingAccount(res);
              setAccountBalance(res.balance);
              setDateCreated(new Date(res.createdAt*1000).toLocaleString());
                // console.log(dateCreated);
            //   console.log(res);
          })
          .then(()=>{
              setLoading(false);
          })
          .catch((err)=>{
              console.log(err);
          });
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

  const submitHandler=async (e)=>{
      e.preventDefault();
      console.log(`${id}`);
      console.log(balanceAdded);
      
      if(
            typeof contract !== "undefined" &&
            typeof account !== "undefined" &&
            typeof web3 !== "undefined"
      ){
          await contract.methods.addBal(id,web3.utils.toWei(balanceAdded,"ether"),account)
          .send(
              {
                  from:account,
                //   to:contract.options.address,
                  value: web3.utils.toWei(balanceAdded,"ether"),
              }
          )
          .then(async(res)=>{
              await contract.methods
              .accounts(id)
              .call()
              .then((res)=>{
                alert("Balance Added successfully!");
                  setAccountBalance(res.balance);

          })
          .catch((err)=>{
            console.log(err);
          });
          console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
};

 const withdrawHandler=async (e)=>{
      e.preventDefault();
      console.log(`${id}`);
      console.log(balanceRemoved);
      
      if(
            typeof contract !== "undefined" &&
            typeof account !== "undefined" &&
            typeof web3 !== "undefined"
      ){
          await contract.methods.withdrawBal(id,web3.utils.toWei(balanceRemoved,"ether"),account)
          .send(
              {
                  from:account,
                  to:contract.options.address,
                  // value: web3.utils.toWei(balanceRemoved,"ether"),
              }
          )
          .then(async(res)=>{
              await contract.methods
              .accounts(id)
              .call()
              .then((res)=>{
                alert("Balance withdrawn successfully");
                setAccountBalance(res.balance);
              })
              .catch((err)=>{
                console.log(err);
              });
          console.log(res);
        })
        .catch((err)=>{
          alert("Insufficient Funds!");
            console.log(err);
        });
    }
};
            

  if(!web3){
      return <div>Loading, web3, accounts, and contract...</div>;
  }

    return (
        
        <div className="info-container">
            <div className="account-details">
                {!loading ?
                (
                    <div className="main-info">
                        <h1 >ACCOUNT NAME : {bankingAccount.name}</h1>
                        <h1 >ACCOUNT NUMBER : {id}</h1>
                        <h1 >ACCOUNT LOCATION : {bankingAccount.location}</h1>
                        <h1 >ACCOUNT CREATED AT : {dateCreated}</h1>
                        <h1 >ACCOUNT BALANCE : {accountBalance}</h1>
                    </div>
                ):null}
            </div>
                    <form onSubmit={submitHandler} className="submit-form">
                        <input type="number" placeholder="Add ether"
                        value={balanceAdded}
                        onChange={(e)=>{setBalanceAdded(e.target.value);}}/>
                <button className="btn-submit" type="submit">
                    Add balance
                </button>
                </form>
                <form onSubmit={withdrawHandler} className="submit-form">
                        <input type="number" placeholder="Withdraw ether"
                        value={balanceRemoved}
                        onChange={(e)=>{setBalanceRemoved(e.target.value);}}/>
                <button className="btn-submit" type="submit">
                    Withdraw balance
                </button>
                </form>
                <h4>To transfer balance from your account to another account, click the button given below.</h4>
                <button className="btn-submit" onClick={()=>(window.location=`/transfer/${id}`)}>
                    Transfer balance!
                </button>
                <br/>
                <h4>To view transactions from your account, click the button given below.</h4>
                  <button className="btn-submit" onClick={()=>(window.location=`/transactions/${id}`)}>
                    Transactions
                </button>
        </div>
    )
}

export default AccountDetails
