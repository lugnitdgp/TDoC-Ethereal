pragma solidity >0.5.1;

contract Demo {
    int256 public a = 10;
    string demostring = "Hello World";
    uint256 public c = 0;

    struct todo {
        string todo_name;
        uint256 counter;
    }

    mapping(uint256 => todo) public todos;

    // function get() public view returns (string memory) {
    //     return demostring;
    // }

    function create(string memory b) public {
        c++;
        todos[c] = todo(b, c);
    }

    // function display(int256 ind) public view returns (string memory, int) {
    //     todo storage todos= todos[ind];
    //     return (todos.todo_name, todos.counter);
    // }
}
