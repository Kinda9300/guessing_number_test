import { useAccount, useContractRead } from "wagmi";
import config from "../config";
import erc20Json from '../contracts/ERC20.sol/ERC20.json';
import guessJson from '../contracts/Guess.sol/Guess.json';

export const useGetApprovalToken = (ownerAddress: `0x${string}` | undefined) => {
    const ERC20ContractAddress = config.erc20Address as `0x${string}`;
    return useContractRead({
        address: ERC20ContractAddress,
        abi: erc20Json.abi,
        functionName: 'allowance',
        args: [ownerAddress, config.guessAddress],
        watch: true,
        enabled: Boolean(ERC20ContractAddress && ownerAddress),
    });
};