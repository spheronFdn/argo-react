export interface IConfig {
  urls: {
    API_URL: string;
    IMAGE_NOT_FOUND: string;
  };
  web3: {
    PAYMENT_CONTRACT_ADDRESS: string;
    ERC20_CONTRACT_ADDRESS: string;
    onboard: {
      DAPP_ID: string;
      NETWORK_ID: number;
      NETWORK_NAME: string;
      RPC_URL: string;
    };
    BICONOMY_KEY: string;
    CMC_KEY: string;
    VERIFYING_MESSAGE: string;
  };
}

const NODE_ENV: string = process.env.REACT_APP_STAGE || "development";

const development: IConfig = {
  urls: {
    API_URL: "https://dev-api.argoapp.net",
    IMAGE_NOT_FOUND: "https://ik.imagekit.io/argo/default-not-fount_RVbgyZDh5Q.png",
  },
  web3: {
    PAYMENT_CONTRACT_ADDRESS: "0x4D89Ab733a7BaF5A09fC11f8C247DF17050021B7",
    ERC20_CONTRACT_ADDRESS: "0x6794a9E5411f8f9B3E5Dc7457162728544A443E0",
    onboard: {
      DAPP_ID: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
      NETWORK_ID: 80001,
      NETWORK_NAME: "matic testnet",
      RPC_URL:
        "https://polygon-mumbai.infura.io/v3/d2aeb63172e34db99638f149103ae693",
    },
    BICONOMY_KEY: "IXRYQIMN6.59c8aa5a-cd68-4de4-bea5-f7ab0db70b66",
    CMC_KEY: "0c5b25a6-4d37-4836-8b43-a6c575667cdd",
    VERIFYING_MESSAGE:
      "I'm the owner of this wallet and want to remove it from the organization.",
  },
};

const production: IConfig = {
  urls: {
    API_URL: "https://api.argoapp.net",
    IMAGE_NOT_FOUND: "https://ik.imagekit.io/argo/default-not-fount_RVbgyZDh5Q.png",
  },
  web3: {
    PAYMENT_CONTRACT_ADDRESS: "0x5140Ff2C70e861453604A268468E379762daF84c",
    ERC20_CONTRACT_ADDRESS: "0x6794a9E5411f8f9B3E5Dc7457162728544A443E0",
    onboard: {
      DAPP_ID: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
      NETWORK_ID: 80001,
      NETWORK_NAME: "matic testnet",
      RPC_URL:
        "https://polygon-mumbai.infura.io/v3/d2aeb63172e34db99638f149103ae693",
    },
    BICONOMY_KEY: "IXRYQIMN6.59c8aa5a-cd68-4de4-bea5-f7ab0db70b66",
    CMC_KEY: "0c5b25a6-4d37-4836-8b43-a6c575667cdd",
    VERIFYING_MESSAGE:
      "I'm the owner of this wallet and want to remove it from the organization.",
  },
};

const test: IConfig = {
  urls: {
    API_URL: "http://localhost:8080",
    IMAGE_NOT_FOUND: "https://ik.imagekit.io/argo/default-not-fount_RVbgyZDh5Q.png",
  },
  web3: {
    PAYMENT_CONTRACT_ADDRESS: "0x113bcF2d1DeB08D295291dA8Bce33ACAD9c9A726",
    ERC20_CONTRACT_ADDRESS: "0x02546A1848EA5282dC4a01529623c10C748f1E9f",
    onboard: {
      DAPP_ID: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
      NETWORK_ID: 1,
      NETWORK_NAME: "matic testnet",
      RPC_URL:
        "https://polygon-mumbai.infura.io/v3/d2aeb63172e34db99638f149103ae693",
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
