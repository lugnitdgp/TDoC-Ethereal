// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract TodoList {
  
uint public count=0;


struct Todo{
    bytes32 info;
    uint serialNumber;
}
  
mapping(uint=>Todo) todos;

  


}
