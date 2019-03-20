const bayes = require('./classifiers/npm-bayes');
const lr = require('./classifiers/npm-logisticRegression');
const nlp = require('./classifiers/node-nlp');
const express = require('express');

const app = express();

app.get('/natural/bayes', (req, res) => {
  bayes.run()
    .then(data => res.json(data));
});

app.get('/natural/lr', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.write({msg: 'starting'});
  lr.run()
    .then(data => res.end({data}));
});

app.get('/status', (req, res) => {

});

const server = app.listen(8080,'0.0.0.0', () => console.log('Starting server...'));
server.setTimeout(300000);
