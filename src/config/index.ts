export interface IConfig {
  urls: {
    API_URL: string;
  };
  arweave: {
    RECHARGE_ADDRESS: string;
    APP_NAME: string;
    HOST: string;
    PORT: number;
    PROTOCOL: string;
  };
  web3: {
    PAYMENT_CONTRACT_ADDRESS: string;
    ERC20_CONTRACT_ADDRESS: string;
    onboard: {
      DAPP_ID: string;
      NETWORK_ID: number;
    };
    BICONOMY_KEY: string;
    CMC_KEY: string;
    VERIFYING_MESSAGE: string;
  };
}

const NODE_ENV: string = "development";

const development: IConfig = {
  urls: {
    API_URL: process.env.API_URL || "http://localhost:8080",
  },
  arweave: {
    RECHARGE_ADDRESS:
      process.env.RECHARGE_ADDRESS || "NO6e9qZuAiXWhjJvGl7DYEMt90MMl1kdLwhhocQRAuY",
    APP_NAME: process.env.APP_NAME || "ARGO_APP_LIVE",
    HOST: "arweave.net",
    PORT: 443,
    PROTOCOL: "https",
  },
  web3: {
    PAYMENT_CONTRACT_ADDRESS: "0x0B59779C5320B384c9D72457fcd92ABA299ef360",
    ERC20_CONTRACT_ADDRESS: "0x135d0CabDF539dc82121a48b5936ee3E3F785558",
    onboard: {
      DAPP_ID: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
      NETWORK_ID: 80001,
    },
    BICONOMY_KEY: "K97155Ti7.fb32dac1-77df-404b-9e63-621d64ad6718",
    CMC_KEY: "0c5b25a6-4d37-4836-8b43-a6c575667cdd",
    VERIFYING_MESSAGE:
      "I'm the owner of this wallet and want to remove it from the organization.",
  },
};

const production: IConfig = {
  urls: {
    API_URL: process.env.API_URL || "https://api.argoapp.live",
  },
  arweave: {
    RECHARGE_ADDRESS:
      process.env.RECHARGE_ADDRESS || "WCx054sIZjvbkZpCdaRYVLD5Z2fXmg7fH_C-8bRztKA",
    APP_NAME: process.env.APP_NAME || "ARGO_APP_LIVE",
    HOST: "arweave.net",
    PORT: 443,
    PROTOCOL: "https",
  },
  web3: {
    PAYMENT_CONTRACT_ADDRESS: "0x0B59779C5320B384c9D72457fcd92ABA299ef360",
    ERC20_CONTRACT_ADDRESS: "0x135d0CabDF539dc82121a48b5936ee3E3F785558",
    onboard: {
      DAPP_ID: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
      NETWORK_ID: 137,
    },
    BICONOMY_KEY: "K97155Ti7.fb32dac1-77df-404b-9e63-621d64ad6718",
    CMC_KEY: "0c5b25a6-4d37-4836-8b43-a6c575667cdd",
    VERIFYING_MESSAGE:
      "I'm the owner of this wallet and want to remove it from the organization.",
  },
};

const test: IConfig = {
  urls: {
    API_URL: process.env.API_URL || "http://localhost:8080",
  },
  arweave: {
    RECHARGE_ADDRESS:
      process.env.RECHARGE_ADDRESS || "OlZkWxCBTaz3ebHTyYDPuDuBeWOXbezxy6UIQxjg_1g",
    APP_NAME: process.env.APP_NAME || "ARGO_APP_LIVE",
    HOST: "arweave.dev",
    PORT: 80,
    PROTOCOL: "http",
  },
  web3: {
    PAYMENT_CONTRACT_ADDRESS: "0x0B59779C5320B384c9D72457fcd92ABA299ef360",
    ERC20_CONTRACT_ADDRESS: "0x135d0CabDF539dc82121a48b5936ee3E3F785558",
    onboard: {
      DAPP_ID: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
      NETWORK_ID: 1,
    },
    BICONOMY_KEY: "K97155Ti7.fb32dac1-77df-404b-9e63-621d64ad6718",
    CMC_KEY: "0c5b25a6-4d37-4836-8b43-a6c575667cdd",
    VERIFYING_MESSAGE:
      "I'm the owner of this wallet and want to remove it from the organization.",
  },
};

const config: {
  [name: string]: IConfig;
} = {
  test,
  development,
  production,
};

export default config[NODE_ENV];
