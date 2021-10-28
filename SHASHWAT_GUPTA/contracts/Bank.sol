// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Banking {
    uint256 public serialNumber = 0;
    uint256 public transacNum = 0;
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

    struct Transaction {
        uint256 transacNum;
        uint256 currentBalance;
        uint256 amountTransacted;
        uint256 createdAt;
        string transacType;
        uint256 accountSerialNumber;
    }
    
    mapping(uint256 => Account) public accounts;
    mapping(uint256 => Transaction) public transactions;

    event AccountCreated(
        uint256 _serialNumber,
        bytes32 _name,
        bytes32 _location,
        uint256 _createdAt,
        uint256 _balance
    );

    event TransactionCompleted(
        uint256 _amount,
        uint256 _transacNumber,
        uint256 _currentAccountSerial,
        bytes32 _transactionType
    );

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
            transacNum++;
            transactions[transacNum] = Transaction(
                transacNum,
                2,
                2,
                block.timestamp,
                "NewAccount",
                serialNumber
            );
            emit TransactionCompleted(
                2,
                transacNum,
                serialNumber,
                "NewAccount"
            );
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
            transacNum++;

            transactions[transacNum] = Transaction(
                transacNum,
                accounts[_serial].balance,
                _amount / 1000000000000000000,
                block.timestamp,
                "AddingBalance",
                _serial
            );

            emit TransactionCompleted(
                _amount / 1000000000000000000,
                transacNum,
                serialNumber,
                "AddingBalance"
            );
        } else {
            revert("Insufficient Funds");
        }
    }

    function withdrawBalance(
        uint256 _serial,
        uint256 _amount,
        address payable _creator
    ) 
    external returns (bool _success) {
        if (accounts[_serial].balance >= _amount / 1000000000000000000 + 1) {
            _creator.transfer(_amount);
            accounts[_serial].balance -= _amount / 1000000000000000000;
            bankBalance -= _amount / 1000000000000000000;
            transacNum++;
            transactions[transacNum] = Transaction(
                transacNum,
                accounts[_serial].balance,
                _amount / 1000000000000000000,
                block.timestamp,
                "Withdrawal",
                _serial
            );
            emit TransactionCompleted(
                _amount / 1000000000000000000,
                transacNum,
                serialNumber,
                "Withdrawal"
            );
            return true;
        } else {
            revert("Insufficient Funds");
        }
    }

    function transactAmount(
        uint256 _amount,
        uint256 _serial_2,
        uint256 _serial
    ) public {
        if (accounts[_serial].balance >= _amount / 1000000000000000000 + 1) {
            accounts[_serial].balance -= _amount / 1000000000000000000;
            accounts[_serial_2].balance += _amount / 1000000000000000000;
            transacNum++;
            emit TransactionCompleted(
                _amount / 1000000000000000000,
                transacNum,
                serialNumber,
                "TransferMoneySent"
            );
            transactions[transacNum] = Transaction(
                transacNum,
                accounts[_serial].balance,
                _amount / 1000000000000000000,
                block.timestamp,
                "TransferMoneySent",
                _serial
            );
            transacNum++;
            emit TransactionCompleted(
                _amount / 1000000000000000000,
                transacNum,
                serialNumber,
                "TransferMoneyReceived"
            );
            transactions[transacNum] = Transaction(
                transacNum,
                accounts[_serial_2].balance,
                _amount / 1000000000000000000,
                block.timestamp,
                "TransferMoneyReceived",
                _serial_2
            );
        } else {
            revert("Insufficient Funds");
        }
    }

    function getLoan(uint256 _amount, uint256 _serial) public payable {
            accounts[_serial].balance += _amount / 1000000000000000000;
            transacNum++;
            transactions[transacNum] = Transaction(
                transacNum,
                accounts[_serial].balance,
                _amount / 1000000000000000000,
                block.timestamp,
                "LoanTransaction",
                _serial
            );
            emit TransactionCompleted(
                _amount / 1000000000000000000,
                transacNum,
                _serial,
                "LoanTransaction"
            );
    }

    function retrieveLoan(
        uint256 _installment,
        uint256 _serial,
        address payable _creator
    ) public payable {
        if (
            accounts[_serial].balance >=
            (_installment / 1000000000000000000) + 1
        ) {
            accounts[_serial].balance -= _installment / 1000000000000000000;
            transacNum++;
            transactions[transacNum] = Transaction(
                transacNum,
                accounts[_serial].balance,
                _installment / 1000000000000000000,
                block.timestamp,
                "LoanRetrieval",
                _serial
            );
            emit TransactionCompleted(
                _installment / 1000000000000000000,
                transacNum,
                _serial,
                "LoanRetrieval"
            );
        } else {
            addBalance(_serial, _installment, _creator);

            accounts[_serial].balance -= _installment / 1000000000000000000;
        }
    }

    function getBalance(uint256 _serial) public view returns (uint256) {
        uint256 bal = accounts[_serial].balance;
        return bal;
    }

    function getSenderBalance(address payable _account)
        external
        view
        returns (uint256)
    {
        return _account.balance;
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getOwner() public view returns (address) {
        return msg.sender;
    }
}