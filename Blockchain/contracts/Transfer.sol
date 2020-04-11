pragma solidity >=0.5.0;

contract Transfer{
    address payable public ngo;
    uint public count;
    address public check;

    constructor() public{
        count = 0;
    }

    function setTransaction(address _ngo) public payable returns(string memory){
        count = msg.value;
        check = _ngo;
        string memory str = "Money from your account deducted!!";
        return str;
    }

    function getTransaction(address payable _ngo) public returns(string memory){
         if(_ngo==check){
             _ngo.transfer(count);
             return "Successfully added";
         }else{
             return "Not having any pending amount";
         }
    }
}