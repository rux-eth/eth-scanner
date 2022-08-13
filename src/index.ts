import { ERC1155, ERC20, ERC721, evaluateAccounts } from './commands';
import {
    AllBalances,
    ChecksumAddresses,
    ERC1155Balances,
    ERC20Balances,
    ERC721Balances,
    EthScanner
} from './types';

export default function ethScanner(infuraKey?: string, etherscanKey?: string): EthScanner {
    const client: EthScanner = {
        ERC20(account: ChecksumAddresses, prices?: boolean): Promise<ERC20Balances> {
            if (!infuraKey) {
                throw Error('This method requires an Infura key');
            }
            return ERC20(account, infuraKey, etherscanKey, prices);
        },
        ERC721(account: ChecksumAddresses, prices?: boolean): Promise<ERC721Balances> {
            return ERC721(account, prices);
        },
        ERC1155(account: ChecksumAddresses, prices?: boolean): Promise<ERC1155Balances> {
            return ERC1155(account, prices);
        },
        evaluateAccounts(account: ChecksumAddresses, prices?: boolean): Promise<AllBalances> {
            return evaluateAccounts(account, prices);
        },
    };
    return client;
}
