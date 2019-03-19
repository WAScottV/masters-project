const bayes = require('./classifiers/npm-bayes');
const lr = require('./classifiers/npm-logisticRegression');
const nlp = require('./classifiers/node-nlp');
const express = require('express');

const app = express();

app.get('/bayes', (req, res) => {
  bayes.run();
  res.json({msg: 'done'});
});

app.listen(8080,'0.0.0.0', () => console.log('Starting server...'));

// switch(process.argv[2]) {
//   case 'bayes':
//     console.log('Running Bayes Classifier...');
//     bayes.run();
//     break;
//   case 'lr':
//     console.log('Running Logistict Regression Classifier...');
//     lr.run();
//     break;
//   case 'nlp':
//     console.log('Running Node-NLP Manager...');
//     nlp.run();
//     break;
// }