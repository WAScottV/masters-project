const fs = require('fs');
const cm = require('./confusionMatrix');
const path = require('path');

module.exports.logResults = (trainData, testResults) => {
    const path = `./data/${testResults.name}`;
    ensureDirectoryExistence(path + '/temp.txt');
    fs.writeFileSync(`${path}/train-data.json`, JSON.stringify(trainData, null, 2));
    fs.writeFileSync(`${path}/test-results.json`, JSON.stringify(testResults, null, 2));
    cm.logConfusionMatrixData(`${path}/test-results.json`, path);
    return {
        correct: testResults.correct,
        incorrect: testResults.incorrect,
    };
};

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}