export type ChecksumAddress = string;
export type ChecksumAddresses = ChecksumAddress | ChecksumAddress[];

export enum Token {
    ERC20 = 'ERC20',
    ERC721 = 'ERC721',
    ERC1155 = 'ERC1155',
}
export interface AssetBalance {
    type: Token;
    symbol: string;
    address: ChecksumAddress;
    amount: number;
}
export interface ERC20Balance extends AssetBalance {
    type: Token.ERC20;
    rate?: number;
    value?: number;
}
export interface ERC721Balance extends AssetBalance {
    type: Token.ERC721;
    tokenIds: Array<number>;
    rate?: number;
    value?: number;
}
export interface ERC1155Balance extends AssetBalance {
    type: Token.ERC1155;
    tokens: Array<{ id: number; amount: number; rate?: number; value?: number }>;
    totalValue?: number;
}
export interface AllBalance {
    ERC20: ERC20Balance[];
    ERC721: ERC721Balance[];
    ERC1155: ERC1155Balance[];
}
export type ERC20Balances = Array<{ account: ChecksumAddress; balances: ERC20Balance[] }>;
export type ERC721Balances = Array<{ account: ChecksumAddress; balances: ERC721Balance[] }>;
export type ERC1155Balances = Array<{ account: ChecksumAddress; balances: ERC1155Balance[] }>;
export type AllBalances = Array<{ account: ChecksumAddress; balances: AllBalance[] }>;

export interface EthScanner {
    ERC20(account: ChecksumAddresses, prices?: boolean): Promise<ERC20Balances>;
    ERC721(account: ChecksumAddresses, prices?: boolean): Promise<ERC721Balances>;
    ERC1155(account: ChecksumAddresses, prices?: boolean): Promise<ERC1155Balances>;
    evaluateAccounts(account: ChecksumAddresses, prices?: boolean): Promise<AllBalances>;
}
