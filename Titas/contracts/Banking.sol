pragma solidity >0.5.1;

contract Banking {
    uint256 public serialNumber = 0;

    struct Account {
        uint256 _serial;
        uint256 _balance;
        string _name;
        string _location;
        address payable _creator;
        uint256 _time;
    }

    mapping(uint256 => Account) public accounts;

    function createAccount(
        string memory _name,
        string memory _location,
        address payable _creator
    ) public payable {
        serialNumber++;

        accounts[serialNumber] = Account(
            serialNumber,
            2,
            _name,
            _location,
            _creator,
            block.timestamp
        );
    }
}
