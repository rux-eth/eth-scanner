import * as dotenv from "dotenv";
import { Contract, ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { Map as IMap } from "immutable";
import { interactedAddresses } from "../../src/commands/ERC20";
import { ChecksumAddress } from "../../src/types";
import BalanceScanner from "../../src/util/BalanceScanner";
dotenv.config();
test("interacted", async () => {
  const provider = new ethers.providers.InfuraProvider(
    "mainnet",
    process.env.INFURA_KEY
  );
  const contract: Contract = new ethers.Contract(
    BalanceScanner.address,
    BalanceScanner.abi,
    provider
  );
  const address: ChecksumAddress = "0x599ED2119EFC6b97d23729E0f2aF5Bf71c1e1249";
  const res: IMap<ChecksumAddress, ChecksumAddress[]> =
    await interactedAddresses([address]);
  const res1 = (await contract.tokensBalance(address, res.get(address)))
    .map((val) => ({
      success: val[0],
      data: roundTo(parseFloat(formatEther(val[1] === '0x' ? '0x00' : val[1])), 3),
    }))
    .filter((val) => val.success);
  console.log(res1);
});
function roundTo(num: number, decPlace: number): number {
    const p: number = Math.pow(10,decPlace);
    return Math.round(num * p) / p
}