import { useMemo } from 'react';
import { ethers } from 'ethers';
import erc20Json from '../contracts/ERC20.sol/ERC20.json';
import guessJson from '../contracts/Guess.sol/Guess.json';
import config from '../config/index';

const { erc20Address, guessAddress } = config;

const useContract = () => {
    const provider = useMemo(() => {
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            return new ethers.BrowserProvider(window.ethereum);
        }
        return null;
    }, []);

    const erc20Contract = useMemo(async () => {
        if (provider) {
            const signer = await provider.getSigner();
            return new ethers.Contract(erc20Address, erc20Json.abi, signer);
        }
        return null;
    }, [provider]);

    const guessContract = useMemo(async () => {
        if (provider) {
            const signer = await provider.getSigner();
            return new ethers.Contract(guessAddress, guessJson.abi, signer);
        }
        return null;
    }, [provider]);

    return { provider, erc20Contract, guessContract };
};

export default useContract;
