'use strict';

const axios = require('axios');

const MB_CLI_BASE_URL = process.env.MB_CLI_BASE_URL ? process.env.MB_CLI_BASE_URL : 'http://127.0.0.1:7001';

const request = axios.create({
  baseURL: MB_CLI_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    }
  },
  error => {
    return Promise.reject(error);
  })

module.exports = request;