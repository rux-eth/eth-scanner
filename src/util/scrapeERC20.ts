import axios from 'axios';

interface ERC20Balance {
    name: string;
    symbol: string;
    contractAddress: string;
    balance: number;
}

async function scrapeERC20(address: string | Array<string>) {
    const data = {
        dataTableModel: {
            order: [{ column: 6, dir: 'desc' }],
            start: 0,
            length: 99999,
            search: { value: '', regex: false },
        },
        model: {
            address: '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
            hideZeroAssets: true,
            filteredContract: '',
            showEthPrice: false,
        },
    };
    const res = await axios.post(
        'https://etherscan.io/tokenholdingsnew.aspx/GetAssetDetails',
        data,
        {
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
        }
    );
}
export { scrapeERC20, ERC20Balance };
