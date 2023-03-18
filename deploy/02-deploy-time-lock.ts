import { MIN_DEPLAY } from "./../helper-hardhat-config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployTimeLock: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("*******************");
  log("Deploying TimeLock ...");
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DEPLAY, [], [], deployer],
    log: true,
  });
  log(`Deployed TimeLock to address: ${timeLock.address}`);
};

export default deployTimeLock;
