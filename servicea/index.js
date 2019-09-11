const express = require('express')

const APP_PORT = 4000;
const APP_NAME = "SERVICE A"
const APP_VERSION = "1.0.0"
const appInfo = { appName: APP_NAME, version: APP_VERSION };

const app = express();
const users = [
  { id: '1', username: 'Robin Wieruch' },
  { id: '2', username: 'Dave Davids' }
];

app.get('/', (req, res, next) => {
  res.send(appInfo);
  return next();
});

app.get('/users', (req, res, next) => {
  res.send(users);
  return next();
});

app.listen(APP_PORT, () => console.log(`${APP_NAME} listening on port ${APP_PORT}!`));
