const axios = require("axios");
require("dotenv").config();

const token = process.env.MY_TOKEN;

const telegramBaseURL = `https://api.telegram.org/bot${token}`;
const coinGeckoBaseURL = "https://api.coingecko.com/api/v3";

const getAxiosInstance = (baseURL) => {
  return {
    get(method, params) {
      return axios.get(`/${method}`, { baseURL, params });
    },

    post(method, data) {
      return axios({
        method: "post",
        baseURL,
        url: `/${method}`,
        data,
      });
    },
  };
};

module.exports = {
  telegramAxiosInstance: getAxiosInstance(telegramBaseURL),
  coinGeckoAxiosInstance: getAxiosInstance(coinGeckoBaseURL),
};
