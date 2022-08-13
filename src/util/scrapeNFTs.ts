import fetch from "isomorphic-fetch";
import axios from "axios";

export interface Filters {
  getTokenIds?: boolean;
  getCollectionInfo?: boolean;
}
interface CollectionInfo {
  totalSupply: number;
}
interface NFTBalance {
  name: string;
  address: string;
  owned: number;
  collectionInfo?: CollectionInfo;
  tokenIds?: Array<number>;
}
function extractText(htmlString: string) {
  return htmlString.replace(/<[^>]+>/g, "");
}

// includes both ERC721 and ERC1155 tokens
export default async function scrapeNFTs(
  address: string | Array<string>,
  filters?: Filters
) {
  const [getIds, getColInfo] = filters
    ? [
        filters.getTokenIds === undefined ? false : filters.getTokenIds,
        filters.getCollectionInfo === undefined
          ? false
          : filters.getCollectionInfo,
      ]
    : [false, false];

  const queryStr = (cursor?: number | null): string => {
    const newCur: string = cursor ? cursor.toString() : "null";
    return getIds
      ? `{"query":"\\n    query GetTokens($filter: TokenFilterInput, $pagination: PaginationInput, $sort: TokenSortInput) {\\n      tokens(filter: $filter, pagination: $pagination, sort: $sort) {\\n        id\\n        tokenId\\n        image\\n        name\\n        lastOrder {\\n          price\\n          currency\\n        }\\n        owners {\\n          address\\n          balance\\n        }\\n        collection {\\n          name\\n          address\\n          type\\n          isVerified\\n          floorOrder {\\n            price\\n          }\\n        }\\n        ask {\\n          ...OrderFragment\\n        }\\n        bids(pagination: { first: 1 }) {\\n          ...OrderFragment\\n        }\\n      }\\n    }\\n    \\n  fragment OrderFragment on Order {\\n    isOrderAsk\\n    signer\\n    collection {\\n      address\\n    }\\n    price\\n    amount\\n    strategy\\n    currency\\n    nonce\\n    startTime\\n    endTime\\n    minPercentageToAsk\\n    params\\n    signature\\n    token {\\n      tokenId\\n    }\\n    hash\\n  }\\n\\n  ","variables":{"filter":{"owner":"${address}"},"pagination":{"first":16, "cursor":${newCur}},"sort":"PRICE_ASC"}}`
      : `{"query":"\\n    query GetUserRelativeCollections(\\n      $address: Address!\\n      $filter: CollectionFilterInput\\n      $pagination: PaginationInput\\n      $sort: RelativeCollectionSortInput\\n    ) {\\n      user(address: $address) {\\n        relativeCollections(filter: $filter, pagination: $pagination, sort: $sort) {\\n          ...CollectionFilterItemFragment\\n        }\\n      }\\n    }\\n    \\n  fragment CollectionFilterItemFragment on Collection {\\n    name\\n    address\\n    totalSupply\\n    owned\\n    volume {\\n      volume24h\\n    }\\n    logo\\n    floorOrder {\\n      price\\n    }\\n  }\\n\\n  ","variables":{"address":"${address}","sort":"OWNED_DESC"}}`;
  };
  const url = "https://api.looksrare.org/graphql";

  const query = {
    url: "https://etherscan.io/tokenholdingsnew.aspx/GetAssetDetails",
    body: {
      dataTableModel: {
        order: [{ column: 6, dir: "desc" }],
        start: 0,
        length: 999999999,
      },
      model: {
        address: "0x80B23b59d3019DA27113C05314fe16895b3C6404",
        hideZeroAssets: true,
        filteredContract: "",
        showEthPrice: false,
      },
    },
  };
  const res = await axios.get(
    "https://etherscan.io/tokenholdings?a=0x80B23b59d3019DA27113C05314fe16895b3C6404"
  );
  const assetsTotal = {
    ERC20: parseInt(
      extractText(res.data)
        .match(/(Assets in Wallet)(.*?)\)/)[0]
        .replace(/\D+/g, "")
    ),
    NFT:
      parseInt(
        extractText(res.data)
          .match(/(NFT Assets)(.*?)\)/)[0]
          .replace(/\D+/g, "")
      ) || null,
  };
  const requests: Array<Promise<any>> = [];
  requests.push(axios.post(query.url, query.body));
  for (let i = 0; i < Math.ceil(assetsTotal.NFT / 12); i += 1) {
    const NFTquery = {
      url: "https://etherscan.io/tokenholdingsnew.aspx/GetNftDetails",
      body: {
        dataTableModel: {
          start: i * 12,
          length: 12,
        },
        model: {
          address: "0x80B23b59d3019DA27113C05314fe16895b3C6404",
          hideZeroAssets: false,
          filteredContract: "",
          showEthPrice: false,
        },
      },
    };
    requests.push(axios.post(NFTquery.url, NFTquery.body));
  }
  const finalRes = await Promise.all(requests);
  return finalRes;
}
