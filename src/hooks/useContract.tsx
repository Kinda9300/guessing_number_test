import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import type { Contract } from 'ethers';
import erc20Json from '../contracts/ERC20.sol/ERC20.json';
import guessJson from '../contracts/Guess.sol/Guess.json';
import config from '../config/index';

const { erc20Address, guessAddress } = config;

const useContract = () => {
  const [erc20Contract, setErc20Contract] = useState<Contract | null>(null);
  const [guessContract, setGuessContract] = useState<Contract | null>(null);

  useEffect(() => {
    const initSigner = async () => {
      try {
        if (
          typeof window !== 'undefined' &&
          typeof window.ethereum !== 'undefined'
        ) {
          const provider = new ethers.BrowserProvider(window.ethereum);

          const signer = await provider.getSigner();

          const _erc20Contract = new ethers.Contract(
            erc20Address, erc20Json.abi, signer
          );

          const _guessContract = new ethers.Contract(
            guessAddress, guessJson.abi, signer
          );

          setErc20Contract(_erc20Contract);
          setGuessContract(_guessContract);
        }
      } catch (error) {
        // Handle the error here, and consider retrying after a delay
        console.error('Error getting signer:', error);
      }
    };

    initSigner();
  }, []);

  return { erc20Contract, guessContract };
};

export default useContract;
