module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const YourToken = await deployments.get("YourToken");
  const yourToken = await ethers.getContractAt("YourToken", YourToken.address);
  //Todo: deploy the vendor
  await deploy("Vendor", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [yourToken.address],
    log: true,
  });

  console.log("\n 🏵  Sending all 1000 tokens to the vendor...\n");
  
  //Todo: transfer the tokens to the vendor
  const Vendor = await deployments.get("Vendor");
  const vendor = await ethers.getContractAt("Vendor", Vendor.address);
  const result = await yourToken.transfer( vendor.address, ethers.utils.parseEther("1000") );

  console.log("\n 🤹  Sending ownership to frontend address...\n")
  //ToDo: change address with your burner wallet address vvvv
  await vendor.transferOwnership( "0x9E7C593CCf40aB030bfb08D816505B8B55B20712" );
};

module.exports.tags = ["Vendor"];
