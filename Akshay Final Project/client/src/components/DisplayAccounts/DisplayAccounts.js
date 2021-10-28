import React from 'react';
import { useState,useEffect } from 'react';
import BankingContract from "../../contracts/Banking.json";
import getWeb3 from "../../getWeb3";
import "./DisplayAccounts.css";
const DisplayAccounts = () => {

          const [contract, setContract] = useState(undefined);
      const [account, setAccount] = useState(undefined);
      const [web3, setWeb3] = useState(undefined);
    //   const [accountHolder, setAccountHolder] = useState("");
    //   const [location, setLocation] = useState("");
      const [loading,setLoading]=useState(true);

      const[bankAccounts,setBankAccounts]=useState([]);
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
      const serialNumber=await contract.methods.serialNumber().call();
      console.log(serialNumber);

      for(let i=1;i<=serialNumber;i++)
      {
          await contract.methods.accounts(i).call()
          .then((res)=>{
              var bankAc=bankAccounts;
              if(res.creator===account){
                  bankAc.push({
                      serialNumber:res.serial,
                      name:res.name,
                      location:res.location,
                      balance:res.balance,
                  });
              }
              setBankAccounts(bankAc);
              console.log(res);
              console.log(bankAccounts);
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
        getContractDetails();
      console.log(contract);
      console.log(account);
      console.log(web3);
    }
  }, [web3, account, contract]);

  if(!web3){
      return <div>Loading, web3, accounts, and contract...</div>;
  }
  return(
  <div className="display-accounts">
      <div className="accounts">
          <h1>YOUR ACCOUNTS</h1>
      </div>
    <div className="account-container">

        {
            !loading
            ?bankAccounts.map((account)=>{
            return (
                <div className="information" onClick={()=>(window.location=`/accounts/${account.serialNumber}`)}>
            <h1 className="account-name-1">{account.name}</h1>
            <h1 className="account-name-2">{account.serialNumber}</h1>
                </div>)
            }):null
        }
        
    </div>
  </div>
  )
}

export default DisplayAccounts
