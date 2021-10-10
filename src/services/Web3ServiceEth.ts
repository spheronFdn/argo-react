import Web3Modal from "web3modal";
import config from "../config";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";
import Portis from "@portis/web3";
import { setupENS } from "@ensdomains/ui";

declare global {
  interface Window {
    ethereum: any;
  }
}
const INFURA_ID = config.web3.ethConfig.INFURA_KEY;
const PORTIS_ID = config.web3.ethConfig.PORTIS_ID;

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: {
    authereum: {
      package: Authereum, // required
    },
    portis: {
      package: Portis, // required
      options: {
        id: PORTIS_ID, // required
      },
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
  network: "mainnet",
});

export const autoChangeNetworkEth = async () => {
  try {
    if (window.ethereum.chainId !== "0x1") {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export const updateEnsContentHash = async (domain: string, contentHash: string) => {
  try {
    await autoChangeNetworkEth();
    const provider = await web3Modal.connect();
    const { ens } = await setupENS({ customProvider: provider });
    const tx = await ens.setContenthash(domain, contentHash);
    await tx.wait();
    return tx;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    throw new Error("Seems like you've not selected a correct wallet.");
  }
};

export const disconnect = () => {
  web3Modal.clearCachedProvider();
};
