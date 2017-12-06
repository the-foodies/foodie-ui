const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './build')));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});
const port = 1337;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
