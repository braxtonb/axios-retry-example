const express = require('express');

const { api, apiRetry } = require('./api');

const app = express();
const port = 3000;

let tries = 0;

app.get('/', (req, res) => {
  console.log({ tries: ++tries });

  if (tries < 4) {
    return res.status(500).send('Please try again');
  }

  res.status(200).send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);

  main();
});

const main = async () => {
  try {
    // default behavior - api() should throw an error
    // since 3 tries are required for successful response
    await api();
    // default behavior - apiRetry() should not throw an error
    // and should retry 3 times since 4 tries are required for successful response
    await apiRetry();
  } catch (error) {
    console.log('error', Object.keys(error), tries);
  }
};
