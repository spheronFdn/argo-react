import Arweave from "arweave";
import config from "../config";

export const arweave: Arweave = Arweave.init({
  host: config.arweave.HOST,
  port: config.arweave.PORT,
  protocol: config.arweave.PROTOCOL,
});

export const getWalletAddress = (wallet: any) => {
  return arweave.wallets.jwkToAddress(wallet);
};

export const getWalletAmount = (address: string) => {
  return arweave.wallets.getBalance(address);
};

export const convertToAr = (amount: string) => {
  return arweave.ar.winstonToAr(amount);
};

export const convertToWinston = (amount: string) => {
  return arweave.ar.arToWinston(amount);
};

export const rechargeArgo = async (amount: string, wallet: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transaction = await arweave.createTransaction(
        {
          target: config.arweave.RECHARGE_ADDRESS,
          quantity: arweave.ar.arToWinston(amount),
          data: "",
        },
        wallet,
      );
      transaction.addTag("APP_NAME", config.arweave.APP_NAME);
      transaction.addTag("TYPE", "WALLET_RECHARGE");
      await arweave.transactions.sign(transaction, wallet);
      await arweave.transactions.post(transaction);
      resolve(transaction.id);
    } catch (err) {
      reject(err);
    }
  });
};
