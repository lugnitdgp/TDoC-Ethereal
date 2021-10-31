pragma solidity >0.5.1;

contract Banking {
    // int256 public a = 10;
    // string demostring = "Hello World";
    // uint256 public c = 0;
    uint256 public bankBalance = 0;
    uint256 public serialNumber = 0;

    struct Account {
        uint256 serial;
        uint256 createdAt;
        string name;
        string location;
        address payable creator;
        uint256 balance;
        bool doesExist;
    }

    mapping(uint256 => Account) public accounts;

    // function get() public view returns (string memory) {
    //     return demostring;
    // }

    function createAccount(string memory name,string memory location,address payable _creator) public payable {
        serialNumber++; 
        accounts[serialNumber] = Account(serialNumber,block.timestamp,name,location,_creator,2,true);
    }

    // function getContractBalance()
    //     // function display(int256 ind) public view returns (string memory, int) {
    //     todo storage todos= todos[ind];
    //     return (todos.todo_name, todos.counter);
    // }
}
