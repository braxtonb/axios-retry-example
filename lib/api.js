const axios = require('axios');
const axiosRetry = require('axios-retry');

/**
 * Make a single request for the provided URL
 * @param {String} URL
 */
const api = async (URL) => {
  try {
    const response = await axios.get(URL);

    console.log('[api] response.data', response.data);

    return response;
  } catch (error) {
    console.log('[api] response threw an error', Object.keys(error));
  }
};

// A callback to further control the delay between retried requests.
// By default there is no delay between retries.
const retryDelay = (retryCount) => retryCount * 1000;

/**
 * Make a single request for the provided URL
 * followed by at most 3 retry requests, if a request
 * yields an error response
 * @param {String} URL
 */
const apiRetry = async (URL) => {
  try {
    axiosRetry(axios, { retries: 3, retryDelay });

    const response = await axios.get(URL);

    console.log('[apiRetry] response.data', response.data);

    return response;
  } catch (error) {
    console.log('[apiRetry] response threw an error', Object.keys(error));
  }
};

module.exports = {
  api,
  apiRetry,
};