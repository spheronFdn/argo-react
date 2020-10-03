import * as dotenv from "dotenv";

dotenv.config();

interface IConfig {
  urls: {
    BASE_URL: string;
    API_URL: string;
    BACKEND_URL: string;
  };
}

const NODE_ENV: string = process.env.NODE_ENV || "development";

const development: IConfig = {
  urls: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    API_URL: process.env.API_URL || "http://localhost:8080",
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:5000",
  },
};

const production: IConfig = {
  urls: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    API_URL: process.env.API_URL || "http://localhost:8080",
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:5000",
  },
};

const test: IConfig = {
  urls: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    API_URL: process.env.API_URL || "http://localhost:8080",
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:5000",
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
