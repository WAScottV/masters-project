const natural = require('natural');
const u = require('../utils');

const classifier = new natural.BayesClassifier();

module.exports.run = () => {
  return new Promise((resolve, reject) => {
    u.getNewMysqlData()
    .then(response => {
      const trainData = response.trainData;
      const testData = response.testData;
      trainData.forEach(d => {
        classifier.addDocument(d.phrase, d.classification);
      });
      classifier.train();

      const results = testData.map(d => {
        const assigned = classifier.classify(d.phrase);
        return {
          correct: assigned === d.classification,
          assignedClass: assigned,
          correctClass: d.classification,
          phrase: d.phrase,
        }
      });

      const resultsObj = {
        name: 'natural/bayes/new/',
        correct: results.filter(r => r.correct).length, 
        incorrect: results.filter(r => !r.correct).length,
        results,
      };
      u.logResults(trainData, resultsObj)
        .then(resolve);
    })
    .catch(reject);
  }); 
};
