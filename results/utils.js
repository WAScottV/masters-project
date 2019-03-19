const fs = require('fs');
const cm = require('./confusionMatrix');
const path = require('path');

module.exports.logResults = (trainData, testResults) => {
    const path = `./data/${testResults.name}`;
    ensureDirectoryExistence(path + '/temp.txt');
    fs.writeFileSync(`${path}/train-data.json`, Buffer.from(JSON.stringify(trainData)));
    fs.writeFileSync(`${path}/test-results.json`, Buffer.from(JSON.stringify(testResults)));
    cm.createCsvConfusionMatrix(`${path}/test-results.json`,`${path}/matrix.csv`);
    console.log('Correct: ', testResults.correct);
    console.log('Incorrect: ', testResults.incorrect);
};

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}