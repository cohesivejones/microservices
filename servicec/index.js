const express = require('express')
const axios = require('axios')

const APP_PORT = 4000;
const APP_NAME = "SERVICE C"
const APP_VERSION = "1.0.0"
const appInfo = { appName: APP_NAME, version: APP_VERSION };
const app = express();

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

const getUsers = () => axios.get(`${process.env.USER_SERVICE}/users`)
const getProducts = () => axios.get(`${process.env.PRODUCT_SERVICE}/products`, {headers: { "Accept-version": "1.0.0" }})

const buildCatalogs = (users, products) => {
  return catalogs.reduce((acc, catalog) => {
    var {id, ...product} = products.find(({id}) => id == catalog.product_id);
    var {id, ...user} = users.find(({id}) => id == catalog.user_id);
    return [...acc, {...catalog, ...product, ...user}];
  }, []);
}

app.get('/catalog', (req, res, next) => {
  axios.all([ getUsers(), getProducts() ]).then(axios.spread((users, products) => {
    const data = buildCatalogs(users.data, products.data);
    res.send(data);
    next();
  })).catch(error => {
    next(error);
  });
});

app.listen(APP_PORT, () => console.log(`${APP_NAME} listening on port ${APP_PORT}!`));
