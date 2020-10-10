import Arweave from "arweave";
import Community from "community-js";

export const arweave: Arweave = Arweave.init({
  host: "arweave.dev",
  port: 443,
  protocol: "https",
});

const contractId = "p04Jz3AO0cuGLzrgRG0s2BJbGL20HP1N8F9hsu6iFrE";
const feeAddress = "NO6e9qZuAiXWhjJvGl7DYEMt90MMl1kdLwhhocQRAuY";

export const getWalletAddress = (wallet: any) => {
  return arweave.wallets.jwkToAddress(wallet);
};

export const getArgoTokenBalance = async (address: string) => {
  const community = new Community(arweave);
  community.setCommunityTx(contractId);
  // community.setWallet(wallet);
  const argoBal = await community.getBalance(address);
  return argoBal;
};

export const payArgoFee = async (wallet: any) => {
  const community = new Community(arweave as any);
  community.setCommunityTx(contractId);
  community.setWallet(wallet);
  await community.transfer(feeAddress, 1);
};
