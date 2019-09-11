const express = require('express');
const version = require('express-routes-versioning')();

const APP_PORT = 4000;
const APP_NAME = "SERVICE B"
const APP_VERSION = "1.0.0"
const appInfo = { appName: APP_NAME, version: APP_VERSION };

const app = express();
const products = [
  { id: '1', product: 'Kettle' },
  { id: '2', product: 'Iron' }
];

app.get('/', (req, res, next) => {
  res.send(appInfo);
  return next();
});

app.get('/products', version({
  "1.0.0": (req, res, next) => {
    res.send(products);
    return next();
  },
  "~1.1.0": (req, res, next) => {
    const newProducts = products.map((product) => ({ ...product, state: 'NY' }))
    res.send(newProducts);
    return next();
  }
}));

app.listen(APP_PORT, () => console.log(`${APP_NAME} listening on port ${APP_PORT}!`));
