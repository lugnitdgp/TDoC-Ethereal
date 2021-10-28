pragma solidity >0.5.1;

contract Banking {
    // int256 public a = 10;
    // string demostring = "Hello World";
    // uint256 public c = 0;
    uint256 public bankBalance = 0;
    uint256 public serialNumber = 0;
    uint256 public transacNum=0;

    struct Account {
        uint256 serial;
        uint256 createdAt;
        string name;
        string location;
        address creator;
        uint256 balance;
        bool doesExist;
    }

        struct Transaction {
        uint256 transacNum;
        uint256 amountTrans;
        string transacType;
        uint256 currentBalance;
        uint256 transactedAt;
        uint256 accountSerial;
    }


    constructor() public{
        accounts[0]=Account(
            0,
            block.timestamp,
            "Ethereal",
            "NIT Durgapur",
            address(this),
            2,
            true
            );

            // transactions[0]=Transaction(
            // 0,
            // 2,
            // "Deposit",
            // 2,
            // block.timestamp,
            // serialNumber
            // );
        }
    mapping(uint256 => Account) public accounts;
    mapping(uint256=> Transaction) public transactions;

    // constructor() public{

    //     }

    function createAccount(string memory name,string memory location,address payable _creator)
        public payable{
            if(_creator.balance>=3)
            {
                serialNumber++; 
                accounts[serialNumber] = Account(serialNumber,block.timestamp,name,location,_creator,2,true);
                bankBalance+=2;
                transactions[serialNumber]=Transaction(0,2,"Depsoit",2,block.timestamp,serialNumber);
            }
            else{
                 revert("Insufficient funds");
        }
        
    }

function addBal(uint _serial, uint amount, address payable creator) 
public payable 
{
    if(creator.balance>=amount/1000000000000000000+1)
    {
        accounts[_serial].balance+=amount/1000000000000000000;
        bankBalance+=amount/1000000000000000000;
        transacNum++;
        transactions[transacNum]=Transaction(transacNum,amount,"Deposit",accounts[_serial].balance,block.timestamp,_serial);

    }else{
        revert("Insufficient funds");
    }
}
function withdrawBal(uint _serial, uint amount, address payable creator) 
external returns(bool _success)
{
    if(accounts[_serial].balance>=amount/1000000000000000000+1)
    {
        creator.transfer(amount);
        accounts[_serial].balance-=amount/1000000000000000000;
        bankBalance-=amount/1000000000000000000;
        transacNum++;
        transactions[transacNum]=Transaction(transacNum,amount,"Withdraw",accounts[_serial].balance,block.timestamp,_serial);
        return true;
    }else{
        revert("Insufficient funds");
    }
}

function transferBal(uint _serial, uint serial_2, uint amount)
    public payable{
        if(accounts[_serial].balance>=amount/1000000000000000000+1)
        {
            accounts[_serial].balance-=amount/1000000000000000000;
            transacNum++;
        transactions[transacNum]=Transaction(transacNum,amount,"Transferred to another account" ,accounts[_serial].balance,block.timestamp,_serial);
            accounts[serial_2].balance+=amount/1000000000000000000;
            transacNum++;
        transactions[transacNum]=Transaction(transacNum,amount,"Deposited from another account",accounts[_serial].balance,block.timestamp,serial_2);
        }
        else
        {
            revert("Insufficient funds!");
        }
    }
}
