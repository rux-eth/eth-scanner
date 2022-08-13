import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { List, Map as IMap } from 'immutable';
import { ChecksumAddress, ChecksumAddresses, ERC20Balances } from '../types';
import BalanceScanner from '../util/BalanceScanner';
import { ERC20Balance } from '../util/scrapeERC20';
dotenv.config();

export default async function ERC20(
    a: ChecksumAddresses,
    infuraKey: string,
    etherscanKey?: string,
    prices?: boolean,
    accounts: ChecksumAddress[] = Array.isArray(a) ? a : Array.from(a),
    provider = new ethers.providers.InfuraProvider('mainnet', infuraKey),
    contract = new ethers.Contract(BalanceScanner.address, BalanceScanner.abi, provider)
): Promise<ERC20Balances> {
    const callAndParse = async (
        owner: ChecksumAddress,
        contracts: ChecksumAddress[]
    ): ERC20Balance[] => {
        List(contracts)
            .zip(List(await contract.tokensBalance(owner, contracts))).filter((val: [ChecksumAddress, any]) => val[1][0] === true && hexToEther(val[1][1]) > 0)
            .map((val: [ChecksumAddress, any]):  => {

            });
    };

    const fetchAddresses = async (
        account: ChecksumAddress,
        provider = new ethers.providers.EtherscanProvider('mainnet', etherscanKey)
    ): Promise<[ChecksumAddress, ChecksumAddress[]]> => {
        let lastBlock: number = 0;
        let res: ethers.providers.TransactionResponse[] = [];
        let total: ChecksumAddress[] = [];
        do {
            res = await provider.getHistory(account, lastBlock);
            res.forEach((val) => {
                Object.values(val)
                    .filter((val) => ethers.utils.isAddress(val) && !total.includes(val))
                    .forEach((v: ChecksumAddress) => total.push(v));
            });

            lastBlock = <number>res[res.length - 1].blockNumber;
        } while (res.length === 10000);

        return [account, total];
    };
    IMap(
        await Promise.all(
            accounts.map(
                (acct: ChecksumAddress): Promise<[ChecksumAddress, ChecksumAddress[]]> =>
                    fetchAddresses(acct)
            )
        )
    );
}
function hexToEther(hex: string): number {
    const ether: number = parseFloat(formatEther(hex === '0x' ? '0x00' : hex));
    const p: number = Math.pow(10,3);
    return Math.round(ether*p)/p

}