const express = require('express');

const { api, apiRetry } = require('./api');

const app = express();
const PORT = 3000;
const URL = `http://localhost:${PORT}`;
const RESPONSE_CODES = {
  ERROR: 500,
  SUCCESS: 200,
};

let tries = 0;

// Hello world route for handling requets from api and apiRetry
app.get('/', (req, res) => {
  // increment and log tries
  console.log({ tries: ++tries });

  // if this endpoint has received less than 4 requests
  // return a 500 status code error
  if (tries < 4) {
    return res
      .status(RESPONSE_CODES.ERROR)
      .send('Internal server error. Please try again.');
  }

  res.status(RESPONSE_CODES.SUCCESS).send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening at ${URL}`);

  main();
});

const main = async () => {
  try {
    // default behavior - api() should throw an error
    // since 3 tries are required for successful response
    await api(URL);
    // default behavior - apiRetry() should not throw an error
    // and should retry 3 times since 4 tries are required for successful response
    await apiRetry(URL);
  } catch (error) {
    console.log('error', Object.keys(error), tries);
  }
};
