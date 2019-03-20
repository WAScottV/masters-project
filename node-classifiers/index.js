const bayes = require('./classifiers/npm-bayes');
const lr = require('./classifiers/npm-logisticRegression');
const nlp = require('./classifiers/node-nlp');
const express = require('express');

const app = express();

app.get('/bayes', (req, res) => {
  bayes.run()
    .then(data => res.json(data));
});

app.listen(8080,'0.0.0.0', () => console.log('Starting server...'));