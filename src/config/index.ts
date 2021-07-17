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

const NODE_ENV: string = "production";

const development: IConfig = {
  urls: {
    API_URL: "https://api.argoapp.live",
    IMAGE_NOT_FOUND:
      "https://image.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg",
  },
  web3: {
    PAYMENT_CONTRACT_ADDRESS: "0x113bcF2d1DeB08D295291dA8Bce33ACAD9c9A726",
    ERC20_CONTRACT_ADDRESS: "0x02546A1848EA5282dC4a01529623c10C748f1E9f",
    onboard: {
      DAPP_ID: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
      NETWORK_ID: 80001,
      NETWORK_NAME: "polygon testnet",
      RPC_URL: "https://matic-mumbai.chainstacklabs.com/",
    },
    BICONOMY_KEY: "K97155Ti7.fb32dac1-77df-404b-9e63-621d64ad6718",
    CMC_KEY: "0c5b25a6-4d37-4836-8b43-a6c575667cdd",
    VERIFYING_MESSAGE:
      "I'm the owner of this wallet and want to remove it from the organization.",
  },
};

const production: IConfig = {
  urls: {
    API_URL: "http://localhost:8080",
    IMAGE_NOT_FOUND:
      "https://image.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg",
  },
  web3: {
    PAYMENT_CONTRACT_ADDRESS: "0x113bcF2d1DeB08D295291dA8Bce33ACAD9c9A726",
    ERC20_CONTRACT_ADDRESS: "0x02546A1848EA5282dC4a01529623c10C748f1E9f",
    onboard: {
      DAPP_ID: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
      NETWORK_ID: 80001,
      NETWORK_NAME: "matic testnet",
      RPC_URL: "https://matic-mumbai.chainstacklabs.com/",
    },
    BICONOMY_KEY: "K97155Ti7.fb32dac1-77df-404b-9e63-621d64ad6718",
    CMC_KEY: "0c5b25a6-4d37-4836-8b43-a6c575667cdd",
    VERIFYING_MESSAGE:
      "I'm the owner of this wallet and want to remove it from the organization.",
  },
};

const test: IConfig = {
  urls: {
    API_URL: "http://localhost:8080",
    IMAGE_NOT_FOUND:
      "https://image.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg",
  },
  web3: {
    PAYMENT_CONTRACT_ADDRESS: "0x113bcF2d1DeB08D295291dA8Bce33ACAD9c9A726",
    ERC20_CONTRACT_ADDRESS: "0xE044842Ce0A54dF5Dc11dbB962B462B28331728e",
    onboard: {
      DAPP_ID: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
      NETWORK_ID: 1,
      NETWORK_NAME: "matic testnet",
      RPC_URL: "https://matic-mumbai.chainstacklabs.com/",
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
