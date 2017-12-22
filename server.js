const express = require('express');
const path = require('path');
const redis = require('redis');

const app = express();

const client = redis.createClient();
const cache = require('express-redis-cache')({ client, expire: 5000 });

cache.on('connected', () => {
  console.log('redis connected');
});

app.use(express.static(path.join(__dirname, './build')));
app.get('/*', cache.route(), (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});
const port = 1337;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
