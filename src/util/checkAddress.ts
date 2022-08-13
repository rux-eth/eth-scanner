import { isAddress } from "ethers/lib/utils";

export default async function checkAddress(address: string | Array<string>) {
  if (typeof address === typeof "string") {
    if (!isAddress(address as string)) {
      throw new Error(`Invalid Address "${address}". ENS Names Not Supported`);
    }
  } else {
    (address as Array<string>).forEach((elem) => {
      if (!isAddress(elem as string)) {
        throw new Error(`Invalid Address "${elem}". ENS Names Not Supported`);
      }
    });
  }
}
