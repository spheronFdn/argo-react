import * as ethers from "ethers";
import Onboard from "bnc-onboard";
import Notify from "bnc-notify";
import config from "../config";
import * as paymentLib from "@argoapp/payment-js";
import { setupENS } from "@ensdomains/ui";

declare global {
  interface Window {
    ethereum: any;
  }
}

var notifyPolygon = Notify({
  dappId: config.web3.onboardPolygon.DAPP_ID, // [String] The API key created by step one above
  networkId: config.web3.onboardPolygon.NETWORK_ID, // [Integer] The Ethereum network ID your Dapp uses.
});

var notifyEth = Notify({
  dappId: config.web3.onboardEth.DAPP_ID, // [String] The API key created by step one above
  networkId: config.web3.onboardEth.NETWORK_ID, // [Integer] The Ethereum network ID your Dapp uses.
});

let provider: ethers.providers.Web3Provider | null;
let payment: paymentLib.Payment | null;
let ensInstance: any;

const walletsPolygon = [
  { walletName: "metamask", preferred: true },
  { walletName: "authereum", preferred: true },
  {
    walletName: "trust",
    preferred: true,
    rpcUrl: config.web3.onboardPolygon.RPC_URL,
  },
  { walletName: "gnosis", preferred: true },
  {
    walletName: "ledger",
    rpcUrl: config.web3.onboardPolygon.RPC_URL,
    preferred: true,
  },
  {
    walletName: "torus",
    rpcUrl: config.web3.onboardPolygon.RPC_URL,
    preferred: true,
  },
  {
    walletName: "walletConnect",
    rpc: {
      "80001": config.web3.onboardPolygon.RPC_URL,
    },
    preferred: true,
  },
];

const walletsEth = [
  { walletName: "metamask", preferred: true },
  { walletName: "authereum", preferred: true },
  {
    walletName: "trust",
    preferred: true,
    rpcUrl: config.web3.onboardEth.RPC_URL,
  },
  { walletName: "gnosis", preferred: true },
  {
    walletName: "ledger",
    rpcUrl: config.web3.onboardEth.RPC_URL,
    preferred: true,
  },
  {
    walletName: "torus",
    rpcUrl: config.web3.onboardEth.RPC_URL,
    preferred: true,
  },
  {
    walletName: "walletConnect",
    rpc: {
      "1": config.web3.onboardEth.RPC_URL,
    },
    preferred: true,
  },
];

const onboardPolygon = Onboard({
  dappId: config.web3.onboardPolygon.DAPP_ID, // [String] The API key created by step one above
  networkId: config.web3.onboardPolygon.NETWORK_ID, // [Integer] The Ethereum network ID your Dapp uses.
  networkName: config.web3.onboardPolygon.NETWORK_NAME,
  subscriptions: {
    wallet: async (wallet) => {
      if (wallet.provider) {
        try {
          provider = new ethers.providers.Web3Provider(wallet.provider);
          const { ens } = await setupENS();
          ensInstance = ens;
          const vendor: paymentLib.Vendor = new paymentLib.Vendor(
            provider,
            provider.getSigner(),
            config.web3.BICONOMY_KEY,
          );
          payment = new paymentLib.Payment(vendor, config.web3.CMC_KEY);
          await payment.at(
            config.web3.PAYMENT_CONTRACT_ADDRESS,
            config.web3.ERC20_CONTRACT_ADDRESS,
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      } else {
        provider = null;
        payment = null;
      }
    },
  },
  walletSelect: {
    wallets: walletsPolygon,
  },
});

const onboardEth = Onboard({
  dappId: config.web3.onboardEth.DAPP_ID, // [String] The API key created by step one above
  networkId: config.web3.onboardEth.NETWORK_ID, // [Integer] The Ethereum network ID your Dapp uses.
  networkName: config.web3.onboardEth.NETWORK_NAME,
  subscriptions: {
    wallet: async (wallet) => {
      if (wallet.provider) {
        try {
          provider = new ethers.providers.Web3Provider(wallet.provider);
          const { ens } = await setupENS({ customProvider: wallet.provider });
          ensInstance = ens;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      } else {
        provider = null;
        payment = null;
      }
    },
  },
  walletSelect: {
    wallets: walletsEth,
  },
});

export const autoChangeNetworkPolygon = async () => {
  try {
    if (window.ethereum.chainId !== "0x13881") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x13881",
            chainName: "Polygon Testnet",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://matic-testnet-archive-rpc.bwarelabs.com"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        ],
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export const getPolygonAccount = async () => {
  try {
    await autoChangeNetworkPolygon();
    await onboardPolygon.walletSelect();
    await onboardPolygon.walletCheck();
    const currentState = onboardPolygon.getState();
    return currentState.address;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    throw new Error("Seems like you've not selected a correct wallet.");
  }
};

export const getPolygonCurrentAccount = async () => {
  const currentState = onboardPolygon.getState();
  return currentState.address;
};

export const disconnectPolygon = () => {
  onboardPolygon.walletReset();
};

export const getArgoBalance = async (address: string) => {
  if (payment) {
    const bal = await payment.getUserBalance(address);
    return bal;
  }
  return 0;
};

export const getArgoAllowances = async (address: string) => {
  if (payment) {
    const approve = await payment.getApprovalAmount(address);
    return approve;
  }
  return 0;
};

export const signRemoveWallet = async () => {
  if (payment) {
    const sign = await payment.vendor.signMessage(config.web3.VERIFYING_MESSAGE);
    return sign;
  }
  return "";
};

export const giveAllowance = async (amount: string) => {
  if (payment) {
    const tx = await payment.gasslessApproval(
      amount,
      config.web3.onboardPolygon.NETWORK_ID,
    );
    notifyPolygon.hash(tx.hash);
    await tx.wait();
    return tx;
  }
  return null;
};

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

export const getEthAccount = async () => {
  try {
    await autoChangeNetworkEth();
    await onboardEth.walletSelect();
    await onboardEth.walletCheck();
    const currentState = onboardEth.getState();
    return currentState.address;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    throw new Error("Seems like you've not selected a correct wallet.");
  }
};

export const getEthCurrentAccount = async () => {
  const currentState = onboardEth.getState();
  return currentState.address;
};

export const disconnectEth = () => {
  onboardEth.walletReset();
};

export const updateEnsContentHash = async (domain: string, contentHash: string) => {
  if (ensInstance) {
    const tx = await ensInstance.setContenthash(domain, contentHash);
    notifyEth.hash(tx.hash);
    await tx.wait();
    return tx;
  }
  return null;
};
