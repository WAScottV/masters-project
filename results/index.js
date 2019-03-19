const express = require('express');
const u = require('./utils');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/results', (req, res) => {
  console.log(req.body);
  res.json({ msg: 'done' });
});

app.listen(8080,'0.0.0.0', () => console.log('Starting server...'));