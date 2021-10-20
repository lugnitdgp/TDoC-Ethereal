pragma solidity ^0.5.0;

contract TodoList{

    string public demostring = "Watch";
    bool public demodone = false;

    struct Task {
      string task_name;
      bool done;
    }

    Task[] public tasks;

    function get() public view returns(string memory)
    {
        return (demostring);
    }

    function create(string memory task_name_, bool done_) public returns(bool)
    {
        tasks.push(Task(task_name_, done_));
        return (true);
    }
}