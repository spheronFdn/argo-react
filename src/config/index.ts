import * as dotenv from "dotenv";

dotenv.config();

export interface IConfig {
  urls: {
    BASE_URL: string;
    API_URL: string;
    BACKEND_URL: string;
  };
  arweave: {
    RECHARGE_ADDRESS: string;
    APP_NAME: string;
    HOST: string;
    PORT: number;
    PROTOCOL: string;
  };
  web3: {
    argoERC20: {
      address: string;
    };
    paymentContract: {
      address: string;
    };
    onboard: {
      dappId: string;
      networkId: number;
    };
    biconomyKey: string;
  };
}

const NODE_ENV: string = "development";

const development: IConfig = {
  urls: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    API_URL: process.env.API_URL || "http://localhost:8080",
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:5000",
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
    argoERC20: {
      address: "0x135d0CabDF539dc82121a48b5936ee3E3F785558",
    },
    paymentContract: {
      address: "0x0B59779C5320B384c9D72457fcd92ABA299ef360",
    },
    onboard: {
      dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
      networkId: 80001,
    },
    biconomyKey: "K97155Ti7.fb32dac1-77df-404b-9e63-621d64ad6718",
  },
};

const production: IConfig = {
  urls: {
    BASE_URL: process.env.BASE_URL || "https://app.argoapp.live",
    API_URL: process.env.API_URL || "https://api.argoapp.live",
    BACKEND_URL: process.env.BACKEND_URL || "https://internal.argoapp.live",
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
    argoERC20: {
      address: "0xbla",
    },
    paymentContract: {
      address: "0xbla",
    },
    onboard: {
      dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
      networkId: 137,
    },
    biconomyKey: "K97155Ti7.fb32dac1-77df-404b-9e63-621d64ad6718",
  },
};

const test: IConfig = {
  urls: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    API_URL: process.env.API_URL || "http://localhost:8080",
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:5000",
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
    argoERC20: {
      address: "0xbla",
    },
    paymentContract: {
      address: "0xbla",
    },
    onboard: {
      dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
      networkId: 1,
    },
    biconomyKey: "K97155Ti7.fb32dac1-77df-404b-9e63-621d64ad6718",
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
