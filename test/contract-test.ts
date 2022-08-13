import * as dotenv from "dotenv";
import { MockProvider } from "ethereum-waffle";
import { Contract, Wallet } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { ethers } from "hardhat";

dotenv.config();

describe("Account Scanner", () => {
  const provider = new MockProvider();
  let cc: Contract;
  let as: Contract;
  let rkl: Contract;
  let randWallet: Wallet;
  beforeEach(async () => {
    const ClubCards = await ethers.getContractFactory("ClubCards");
    cc = await ClubCards.deploy("0x4f65cDFfE6c48ad287f005AD14E78ff6433c8d67");
    console.log(`ClubCards deployed.`);
    const AccountScanner = await ethers.getContractFactory(
      "AccountScanner"
    );
    as = await AccountScanner.deploy();
    console.log(`AccountScanner deployed.`);

    const RumbleKongLeague = await ethers.getContractFactory(
      "RumbleKongLeague"
    );
    rkl = await RumbleKongLeague.deploy(Math.round(Date.now() / 1000));
    console.log(`RumbleKongLeague deployed.`);
    await rkl.flipSaleState();
    await cc.setWave(
      3,
      50,
      1238102938012893,
      ethers.utils.parseUnits("0.04", "ether"),
      true,
      false,
      "dewipmdewpidm",
      "edwemdwpiedm"
    );
    await cc.setAllStatus(true);
    randWallet = provider.getWallets()[getRandInt(10)];
    const numMints = 1 + getRandInt(10);
    let overrides = {
      value: parseUnits((0.04 * numMints).toString(), "ether"),
    };
    await cc.attach(randWallet.address).mintCard(numMints, 3, overrides);
    overrides = {
      value: parseUnits((0.08 * numMints).toString(), "ether"),
    };
    await rkl.attach(randWallet.address).mintKong(numMints, overrides);
  });
  it("Test", async () => {
    const balances = await as.batchBalances(
      [randWallet.address],
      [[cc.address]]
    );
    console.log(balances);
    console.log("Finished");
  });
});
const getRandInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
