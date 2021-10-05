// deploy/00_deploy_your_contract.js

//const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("YourToken", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ "Hello", ethers.utils.parseEther("1.5") ],
    args: [ethers.utils.parseEther("1000") ],

    log: true,
  });

  //Todo: transfer tokens to frontend address
  const yourToken = await deployments.get("YourToken");
  const token = await ethers.getContractAt("YourToken", yourToken.address);
  // const result = await token.transfer( "0x9E7C593CCf40aB030bfb08D816505B8B55B20712", ethers.utils.parseEther("1000") );


  // deploy() does not return contract instance. so you need 
  // 1. const Con = await deployments.get(“YourToken”)  
  // 2. const token = await ethers.getContractAt(“YourToken”, Con.address) 
  // 3. token.transfer()    
  // 1. can be await.deploy(….), in that case 2 and 3 will stay the same
  //    getContractAt is the missing step, that’s why the transfer() error
  
  // This is an issue that I needed to work around also.
  // I ended up replacing the declaration for YourToken with:
  // const yourToken = await ethers.getContract("YourToken", deployer);

  // And for the Vendor with:
  // const Vendor = await deployments.get("Vendor");
  // const vendor = await ethers.getContract("Vendor", deployer);

  /*
    // Getting a previously deployed contract
    const YourContract = await ethers.getContract("YourContract", deployer);
    await YourContract.setPurpose("Hello");

    To take ownership of yourContract using the ownable library uncomment next line and add the
    address you want to be the owner.
    // yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
};
module.exports.tags = ["YourToken"];
