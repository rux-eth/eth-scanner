interface ERC20Balance {
    name: string;
    symbol: string;
    contractAddress: string;
    balance: number;
}
declare function scrapeERC20(address: string | Array<string>): Promise<void>;
export { scrapeERC20, ERC20Balance };
