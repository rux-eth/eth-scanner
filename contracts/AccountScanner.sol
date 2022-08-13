// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";

import "hardhat/console.sol";

/**
 * @title An ERC20, ERC721, and ERC1155 token balance scanner
 * @author Maxwell Rux
 */
contract AccountScanner {
    using SafeCast for uint256;
    enum Token {
        ERC20,
        ERC721,
        ERC1155
    }
    // provides information on ERC721 and ERC1155 tokens
    struct TokenData {
        uint128 id;
        uint128 balance;
        string uri;
    }
    // result of calling one contract
    struct CallResult {
        bool success;
        address contractAddress;
        Token tokenType;
        uint256 balance;
        TokenData[] tokenData;
    }
    // holds a list of contract call results. on 'Results' is returned per account.
    struct Results {
        CallResult[] callRes;
    }
    Token private constant token_default = Token.ERC20;

    // gets all token balances and tokenIds for each owner. go nuts
    function batchBalances(
        address[] calldata owners,
        address[][] calldata contracts
    ) external view returns (Results[] memory results) {
        results = new Results[](owners.length);
        for (uint256 i = 0; i < owners.length; i++) {
            results[i].callRes = _tokensBalance(owners[i], contracts[i]);
        }
    }

    function pushToken(TokenData[] memory _tokens, TokenData memory newToken)
        private
        pure
        returns (TokenData[] memory newTokenData)
    {
        newTokenData = new TokenData[](_tokens.length + 1);
        newTokenData[newTokenData.length - 1] = newToken;
    }

    function _tokensBalance(address owner, address[] calldata contracts)
        private
        view
        returns (CallResult[] memory result)
    {
        result = new CallResult[](contracts.length);
        for (uint256 i = 0; i < contracts.length; i++) {
            if (isERC1155(contracts[i])) {
                bool finished = false;
                uint256 counter = 0;
                TokenData[] memory tokens = new TokenData[](0);
                while (!finished) {
                    bytes memory balData = abi.encodeWithSignature(
                        "balanceOf(address,uint256)",
                        owner,
                        counter
                    );
                    console.log("Attempting call");

                    (bool balRes, bytes memory balResData) = staticCall(
                        contracts[i],
                        balData,
                        1000
                    );
                    console.log("tokenId:", counter);
                    console.log("balRes:", balRes);
                    console.log("balance:", bytesToUint(balResData));
                    if (!balRes) {
                        if (counter != 0) {
                            finished = true;
                            break;
                        }
                        continue;
                    }
                    uint256 idBal = bytesToUint(balResData);
                    if (idBal > 0) {
                        /* 
                        (bool uriRes, bytes memory uriResData) = staticCall(
                            contracts[i],
                            abi.encodeWithSignature("uri(uint256)", counter),
                            1000
                        );
                         */
                        tokens = false
                            ? pushToken(
                                tokens,
                                TokenData(
                                    counter.toUint128(),
                                    idBal.toUint128(),
                                    ""
                                )
                            )
                            : pushToken(
                                tokens,
                                TokenData(
                                    counter.toUint128(),
                                    idBal.toUint128(),
                                    ""
                                )
                            );
                    }
                    ++counter;
                }
                result[i] = tokens.length > 0
                    ? CallResult(
                        true,
                        contracts[i],
                        Token.ERC1155,
                        tokens.length,
                        tokens
                    )
                    : CallResult(false, contracts[i], Token.ERC1155, 0, tokens);
            } else if (isERC721(contracts[i])) {} else {}
            /* 
            (bool res, bytes memory resData) = staticCall(
                contracts[i],
                balData,
                1000
            );
            if (!res) {
                result[i] = CallResult(
                    false,
                    contracts[i],
                    token_default,
                    0,
                    new TokenData[](0)
                );
                continue;
            }
            uint256 balance = st2num(string(resData));
 */
        }
        /* 
        bytes memory balData = abi.encodeWithSignature(
            "balanceOf(address)",
            owner
        );
         */
    }

    function isERC721(address contractAddress) private view returns (bool) {
        return
            IERC721(contractAddress).supportsInterface(
                type(IERC721).interfaceId
            );
    }

    function isERC1155(address contractAddress) private view returns (bool) {
        return
            IERC1155(contractAddress).supportsInterface(
                type(IERC1155).interfaceId
            );
    }

    function staticCall(
        address target,
        bytes memory data,
        uint256 gas
    ) private view returns (bool, bytes memory) {
        if (isContract(target)) {
            (bool success, bytes memory result) = target.staticcall{gas: gas}(
                data
            );
            if (success) {
                return (success, result);
            }
        }

        return (false, "");
    }

    function isContract(address _address) private view returns (bool) {
        return _address.code.length > 0;
    }

    function bytesToUint(bytes memory b) private pure returns (uint256) {
        uint256 number;
        for (uint256 i = 0; i < b.length; i++) {
            number = number + uint8(b[i]);
        }
        return number;
    }
}
