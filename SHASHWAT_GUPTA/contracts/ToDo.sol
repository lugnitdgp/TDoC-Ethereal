pragma solidity >=0.5.16;

contract ToDo
{
    uint public taskCount=0;  // unsigned int var to keep track of no of tasks

    struct Task
    {
        uint id;  //task ID
        string content; //task content
        bool completed; //check completion
        bool deleted; //check if deleted 
    }

    mapping(uint=>Task) public tasksMap; //creating an array tasksMap of key value pairs(mapping)

  function createTask(string memory _content) public 
  {
    tasksMap[taskCount] = Task(taskCount, _content, false, false);
    // tasksMap.push(task);
    taskCount ++;
  }
  
  function getTaskCount() public view returns (uint) 
  {
    return taskCount; 
  }

  function getTask(uint _i) public view returns (uint, string memory, bool, bool) 
  {
    uint id = _i;
    string memory cont = tasksMap[_i].content;
    bool state = tasksMap[_i].completed;
    bool dele = tasksMap[_i].deleted;
    return (id, cont, state, dele);
  }

  function deleteTask(uint _id) public returns (string memory) 
  {
    // tasksMap[id] = Task(id, "", false, true);
    // Task storage task = tasksMap[id];
    // task.deleted = true;
    tasksMap[_id].deleted = true; 

    return tasksMap[_id].content;
  }

  function toggleComplete(uint _id) public 
  {
    tasksMap[_id].completed = !tasksMap[_id].completed;
  }

}