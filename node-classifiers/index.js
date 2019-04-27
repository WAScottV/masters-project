const express = require('express');
const bayes = require('./classifiers/npm-bayes');
const lr = require('./classifiers/npm-logisticRegression');
const nlp = require('./classifiers/node-nlp');
const bayes_new = require('./classifiers/npm-bayes-new-data');

const app = express();

app.get('/natural/bayes', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({ msg: 'Starting...'}));
  bayes.run(req.query.pct, req.query.res_col, req.query.seed)
    .then(data => res.end(JSON.stringify(data)));
});

app.get('/natural/lr', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({ msg: 'Starting...'}));
  lr.run(req.query.pct, req.query.res_col, req.query.seed)
    .then(data => res.end(JSON.stringify(data)));
});

app.get('/natural/nlp', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({ msg: 'Starting...'}));
  nlp.run(req.query.pct, req.query.res_col, req.query.seed)
    .then(data => res.end(JSON.stringify(data)));
});

app.get('/new/natural/bayes', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({ msg: 'Starting...'}));
  bayes_new.run()
  .then(data => res.end(JSON.stringify(data)));
});

const server = app.listen(8080,'0.0.0.0', () => console.log('Starting server...'));
server.setTimeout(3600000);
