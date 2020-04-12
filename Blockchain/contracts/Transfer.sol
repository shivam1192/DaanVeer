pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

contract Transfer{

    struct Passbook{
        uint256 count;
        address ngo;
    }
    mapping (address => Passbook[]) Passbooks ;
    address[] senderaccounts;

    function setTransaction(address _ngo) public payable{
        uint256 c = 0;
        for(uint256 i = 0;i<Passbooks[msg.sender].length;i++){
            if(Passbooks[msg.sender][i].ngo == _ngo){
                c = 1;
                Passbooks[msg.sender][i].count = Passbooks[msg.sender][i].count + msg.value;
            }}
            if(c!=1){
                 Passbook memory newEntry = Passbook(msg.value,_ngo);
                Passbooks[msg.sender].push(newEntry);
                senderaccounts.push(msg.sender);
            }
    }

    function getTransaction(address payable _ngo) public{
        for(uint256 i = 0 ;i < Passbooks[msg.sender].length;i++){
            if(Passbooks[msg.sender][i].ngo==_ngo){
                _ngo.transfer(Passbooks[msg.sender][i].count);
                Passbooks[msg.sender][i].count = 0;
            }
        }
    }

    function getAllSenderAccount() public view returns(address[] memory){
        return senderaccounts;
    }
    function getAllInfoByAccount(address _sender) public view returns(Passbook[] memory){
        return Passbooks[_sender];
    }

}