import * as ethers from "ethers";
import Onboard from "bnc-onboard";
import Notify from "bnc-notify";
import config from "../config";
import * as paymentLib from "@argoapp/payment-js";

var notify = Notify({
  dappId: config.web3.onboard.DAPP_ID, // [String] The API key created by step one above
  networkId: config.web3.onboard.NETWORK_ID, // [Integer] The Ethereum network ID your Dapp uses.
});

let provider: ethers.providers.Web3Provider | null;
let payment: paymentLib.Payment | null;

const onboard = Onboard({
  dappId: config.web3.onboard.DAPP_ID, // [String] The API key created by step one above
  networkId: config.web3.onboard.NETWORK_ID, // [Integer] The Ethereum network ID your Dapp uses.
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
});

export const getAccount = async () => {
  try {
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
