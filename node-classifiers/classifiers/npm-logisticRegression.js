const natural = require('natural');
const u = require('../utils');

const classifier = new natural.LogisticRegressionClassifier();

module.exports.run = (trainPct, res_cols, seed) => {
  return new Promise((resolve, reject) => {
    u.getMysqlData(trainPct, res_cols, seed)
    .then(response => {
      response.trainData.forEach(d => {
        classifier.addDocument(d.phrase, d.classification);
      });
      
      classifier.train();
      
      const results = response.testData.map(d => {
        const assigned = classifier.classify(d.phrase);
        return {
          correct: assigned === d.classification,
          assignedClass: assigned,
          correctClass: d.classification,
          phrase: d.phrase,
        }
      });

      const resultsObj = {
        name: 'natural/lr/',
        correct: results.filter(r => r.correct).length, 
        incorrect: results.filter(r => !r.correct).length,
        results,
      };
      
      u.logResults(response.trainData, resultsObj)
        .then(resolve);
    })
    .catch(reject);
  });
};