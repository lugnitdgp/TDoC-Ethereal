import React from 'react';
import { useState,useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import BankingContract from "../../contracts/Banking.json";
import getWeb3 from "../../getWeb3";

const TransferMoney = () => {

    const [contract, setContract] = useState(undefined);
    const [account, setAccount] = useState(undefined);
    const [web3, setWeb3] = useState(undefined);
    const [loading,setLoading]=useState(true);
    const[accountBalance,setAccountBalance]=useState(undefined);
    const[dateCreated,setDateCreated]=useState(undefined);
    const[balanceAdded,setBalanceAdded]=useState("");
    const[bankingAccount,setBankingAccount]=useState(undefined);
    const[balanceRemoved,setBalanceRemoved]=useState(undefined);
    const[serial,setSerial]=useState(undefined);
    const[transferMoney,setTransferMoney]=useState("");
    
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

const transferSubmit=async(e)=>{
    e.preventDefault();
      console.log(`${id}`);
      console.log(transferMoney);
      
    //   if(
    //         typeof contract !== "undefined" &&
    //         typeof account !== "undefined" &&
    //         typeof web3 !== "undefined"
    //   )
    {
          await contract.methods.transferBal(id,serial,web3.utils.toWei(transferMoney,"ether"))
          .send(
              {
                  from:account,
                  to:contract.options.address,
                //   value: web3.utils.toWei(transferMoney,"ether"),
              }
          )
          .then(async(res)=>{
              alert("Transaction successful!");
            console.log(res);

          })
          .catch((err)=>{
              alert("You don't have sufficient funds!");
            console.log(err);
          });
    }
};

  if(!web3){
      return <div>Loading, web3, accounts, and contract...</div>;
  }
    return (
        <div>
            <form className="form-submit"
            onSubmit={transferSubmit}>

                <input className="input-field" type="text" placeholder="Enter account serial to transfer money"
                value={serial}
                onChange={(e)=>{
                    setSerial(e.target.value);
                }}>
                </input>
                <br/>
                <input className="input-field" type="text" placeholder="Enter amount"
                value={transferMoney}
                onChange={(e)=>{
                    setTransferMoney(e.target.value);
                }}>
                </input>
                <br/>
                <button className="btn-submit" type="submit">
                    Approve Transfer!
                </button>
            </form>
        </div>
    )
}

export default TransferMoney
