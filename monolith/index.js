const express = require('express')
const axios = require('axios')

const APP_PORT = 4000;
const APP_NAME = "MONOLITH"
const APP_VERSION = "1.0.0"
const appInfo = { appName: APP_NAME, version: APP_VERSION };
const app = express();

const users = [
  { id: '1', username: 'Robin Wieruch' },
  { id: '2', username: 'Dave Davids' }
];
const products = [
  { id: '1', product: 'Kettle' },
  { id: '2', product: 'Iron' }
];
const catalogs = [
  {id: 1, user_id: 1, product_id: 1},
  {id: 2, user_id: 1, product_id: 2},
  {id: 3, user_id: 2, product_id: 1},
  {id: 4, user_id: 2, product_id: 1},
]

app.get('/', (req, res, next) => {
  res.send(appInfo);
  return next();
});

app.get('/users', (req, res, next) => {
  res.send(users);
  return next();
});

app.get('/products', (req, res, next) => {
  res.send(products);
  return next();
});

const buildCatalogs = () => {
  return catalogs.reduce((acc, catalog) => {
    var {id, ...product} = products.find(({id}) => id == catalog.product_id);
    var {id, ...user} = users.find(({id}) => id == catalog.user_id);
    return [...acc, {...catalog, ...product, ...user}];
  }, []);
};

app.get('/catalog', (req, res, next) => {
  res.send(buildCatalogs());
  return next();
});

app.listen(APP_PORT, () => console.log(`${APP_NAME} listening on port ${APP_PORT}!`));
