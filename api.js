const axios = require('axios');
const axiosRetry = require('axios-retry');

const api = async () => {
  try {
    const response = await axios.get('http://localhost:3000');

    console.log('api', response.data);

    return response;
  } catch (error) {
    console.log('[api] response threw an error', Object.keys(error));
  }
};

const retryDelay = (retryCount) => retryCount * 1000;

const apiRetry = async () => {
  try {
    axiosRetry(axios, { retries: 3, retryDelay });

    const response = await axios.get('http://localhost:3000');

    console.log(response.data);

    return response;
  } catch (error) {
    console.log('[apiResponse] response threw an error', Object.keys(response));
  }
};

module.exports = {
  api,
  apiRetry,
};