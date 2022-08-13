interface Filters {
    getTokenIds?: boolean;
    getCollectionInfo?: boolean;
}
export default function scrapeNFTs(address: string | Array<string>, filters?: Filters): Promise<void>;
export {};
