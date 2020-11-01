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
};

const production: IConfig = {
  urls: {
    BASE_URL: process.env.BASE_URL || "https://argoapp.live",
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
};

const config: {
  [name: string]: IConfig;
} = {
  test,
  development,
  production,
};

export default config[NODE_ENV];
