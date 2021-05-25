import * as ethers from "ethers";
import Onboard from "bnc-onboard";
import Notify from "bnc-notify";
import config from "../config";
import * as paymentLib from "@argoapp/payment-js";

var notify = Notify({
  dappId: config.web3.onboard.dappId, // [String] The API key created by step one above
  networkId: config.web3.onboard.networkId, // [Integer] The Ethereum network ID your Dapp uses.
});

let provider: ethers.providers.Web3Provider | null;
let payment: paymentLib.Payment | null;

const onboard = Onboard({
  dappId: config.web3.onboard.dappId, // [String] The API key created by step one above
  networkId: config.web3.onboard.networkId, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet) => {
      if (wallet.provider) {
        provider = new ethers.providers.Web3Provider(wallet.provider);
        const vendor: paymentLib.Vendor = new paymentLib.Vendor(
          provider,
          provider.getSigner(),
        );
        payment = new paymentLib.Payment(
          vendor,
          "0c5b25a6-4d37-4836-8b43-a6c575667cdd",
        );
        payment.at(
          config.web3.paymentContract.address,
          config.web3.argoERC20.address,
        );
      } else {
        provider = null;
        payment = null;
      }
    },
  },
});

export const getAccount = async () => {
  await onboard.walletSelect();
  await onboard.walletCheck();
  const currentState = onboard.getState();
  return currentState.address;
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

export const giveAllowance = async (amount: string) => {
  if (payment) {
    const tx: any = await payment.setNewApprovals(amount);
    notify.hash(tx.hash);
    await tx.wait();
    return tx;
  }
  return null;
};
