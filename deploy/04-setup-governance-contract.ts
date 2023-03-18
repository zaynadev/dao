import {
  ADDRESS_ZERO,
  MIN_DEPLAY,
  QUORUM_PERCENTAGE,
  VOTING_DEPLAY,
  VOTING_PERIOD,
} from "./../helper-hardhat-config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const setupContracts: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const timeLock = await ethers.getContract("TimeLock", deployer);
  const governorContract = await ethers.getContract(
    "GovernorContract",
    deployer
  );
  log("*******************");
  log("Setting up roles ...");
  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

  const proposerTX = await timeLock.grantRole(
    proposerRole,
    governorContract.address
  );
  await proposerTX.wait(1);

  const executorTX = await timeLock.grantRole(executorRole, ADDRESS_ZERO);
  await executorTX.wait(1);

  const revokeTX = await timeLock.revokeRole(adminRole, deployer);
  await revokeTX.wait(1);

  log("Setting up roles done !");
};

export default setupContracts;
