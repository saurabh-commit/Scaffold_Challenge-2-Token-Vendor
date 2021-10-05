pragma solidity >=0.6.0 <0.7.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./YourToken.sol";

contract Vendor is Ownable{
  using SafeMath for uint256;

  YourToken yourToken;
  uint256 public constant tokensPerEth = 100;
  // address owner;

  event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
  event SellTokens(address seller, uint256 amountOfTokens, uint256 soldAmount);
  constructor(address tokenAddress) public {
    yourToken = YourToken(tokenAddress);
  }

  //ToDo: create a payable buyTokens() function:
  function buyTokens() 
    public 
    payable{
      uint256 amountOfTokens = msg.value.mul(tokensPerEth);
      yourToken.transfer(msg.sender, amountOfTokens);
      emit BuyTokens(msg.sender, msg.value, amountOfTokens);
  }
  //ToDo: create a sellTokens() function:
  function sellTokens(uint256 amountOfTokens) 
    public {
      require(amountOfTokens > 0, "Insufficient tokens!");
      require(yourToken.allowance(msg.sender, address(this)) >= amountOfTokens, "Token allowance too low!");
      uint256 soldAmount = amountOfTokens.div(tokensPerEth);
      bool sent = yourToken.transferFrom(msg.sender, address(this), amountOfTokens);
      require(sent, "Token transfer failed!");
      // msg.sender.transfer(soldAmount);
      (bool success, ) = msg.sender.call{value: soldAmount}("");
      require(success, "Failed to send Ether");
      emit SellTokens(msg.sender, amountOfTokens, soldAmount);
  }

  //ToDo: create a withdraw() function that lets the owner, you can 
  function withdraw()
    public
    onlyOwner {
      msg.sender.transfer(address(this).balance);
  }

  //use the Ownable.sol import above:
   
  // function transferOwnership(address account)
  //   public {
  //     require (msg.sender == owner, "Not an owner!");
  //     owner = account;
  // }

}
