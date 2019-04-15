const natural = require('natural');
const u = require('../utils');

const classifier = new natural.BayesClassifier();

module.exports.run = () => {
  return new Promise((resolve, reject) => {
    u.getNewMysqlData()
    .then(response => {
      const trainData = response.trainData.slice(0, Math.floor(response.trainData.length * 0.1));  
      const testData = response.testData.slice(0, Math.floor(response.testData.length * 0.1));
      console.log(trainData);
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
