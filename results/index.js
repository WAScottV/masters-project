const express = require('express');
const u = require('./utils');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ limit: '50mb'}));

app.post('/results', (req, res) => {
  const results = u.logResults(req.body.train, req.body.test);
  res.json(results);
});

app.listen(8080,'0.0.0.0', () => console.log('Starting server...'));