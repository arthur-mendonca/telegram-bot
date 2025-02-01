const axios = require("axios");
require("dotenv").config();

const token = process.env.MY_TOKEN;

const baseURL = `https://api.telegram.org/bot${token}`;

const getAxiosInstance = () => {
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

module.exports = { axiosInstance: getAxiosInstance() };
