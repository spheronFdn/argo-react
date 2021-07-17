import * as ethers from "ethers";
import Onboard from "bnc-onboard";
import Notify from "bnc-notify";
import config from "../config";
import * as paymentLib from "@argoapp/payment-js";

declare global {
  interface Window {
    ethereum: any;
  }
}

var notify = Notify({
  dappId: config.web3.onboard.DAPP_ID, // [String] The API key created by step one above
  networkId: config.web3.onboard.NETWORK_ID, // [Integer] The Ethereum network ID your Dapp uses.
});

let provider: ethers.providers.Web3Provider | null;
let payment: paymentLib.Payment | null;

const wallets = [
  { walletName: "metamask", preferred: true },
  { walletName: "authereum", preferred: true },
  { walletName: "trust", preferred: true, rpcUrl: config.web3.onboard.RPC_URL },
  { walletName: "gnosis", preferred: true },
  {
    walletName: "ledger",
    rpcUrl: config.web3.onboard.RPC_URL,
    preferred: true,
  },
  {
    walletName: "torus",
    rpcUrl: config.web3.onboard.RPC_URL,
    preferred: true,
  },
  {
    walletName: "walletConnect",
    rpc: {
      "80001":
        "https://polygon-mumbai.infura.io/v3/53e706eaa088405491d1e311f6a6938b",
    },
    preferred: true,
  },
];

const onboard = Onboard({
  dappId: config.web3.onboard.DAPP_ID, // [String] The API key created by step one above
  networkId: config.web3.onboard.NETWORK_ID, // [Integer] The Ethereum network ID your Dapp uses.
  networkName: config.web3.onboard.NETWORK_NAME,
  subscriptions: {
    wallet: async (wallet) => {
      if (wallet.provider) {
        try {
          provider = new ethers.providers.Web3Provider(wallet.provider);
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
    wallets: wallets,
  },
});

export const autoChangeNetwork = async () => {
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

export const getAccount = async () => {
  try {
    await autoChangeNetwork();
    await onboard.walletSelect();
    await onboard.walletCheck();
    const currentState = onboard.getState();
    return currentState.address;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return "";
  }
};

export const getCurrentAccount = async () => {
  const currentState = onboard.getState();
  return currentState.address;
};

export const disconnect = () => {
  onboard.walletReset();
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
      config.web3.onboard.NETWORK_ID,
    );
    notify.hash(tx.hash);
    await tx.wait();
    return tx;
  }
  return null;
};
