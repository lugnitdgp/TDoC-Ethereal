pragma solidity >0.5.1;

contract Banking {
    uint256 public serialNumber = 0;

    uint256 public bankBalance = 0;

    struct Account {
        uint256 serial;
        uint256 createdAt;
        string name;
        string location;
        address creator;
        uint256 balance;
        bool doesExist;
    }

    constructor() public {
        accounts[0] = Account(
            0,
            block.timestamp,
            "Ethereal",
            "NIT Durgapur",
            address(this),
            0,
            true
        );
    }

    mapping(uint256 => Account) public accounts;

    function createAccount(
        address payable _creator,
        string memory _name,
        string memory _location
    ) public payable {
        if (_creator.balance >= 3) {
            serialNumber++;

            accounts[serialNumber] = Account(
                serialNumber,
                block.timestamp,
                _name,
                _location,
                _creator,
                2,
                true
            );
            bankBalance += 2;
        } else {
            revert("Insufficient Funds");
        }
    }

    function addBalance(
        uint256 _serial,
        uint256 _amount,
        address payable _creator
    ) public payable {
        if (_creator.balance >= _amount / 1000000000000000000 + 1) {
            accounts[_serial].balance += _amount / 1000000000000000000;
            bankBalance += _amount / 1000000000000000000;
        } else {
            revert("Insufficient Funds");
        }
    }

    function getBalance(uint256 _serial) public view returns (uint256) {
        uint256 bal = accounts[_serial].balance;
        return bal;
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
