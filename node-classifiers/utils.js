const fs = require('fs');
const request = require('request');
const cm = require('./confusionMatrix');
const path = require('path');

module.exports.readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
};

module.exports.getMysqlData = () => {
    return new Promise((resolve, reject) => {
        request.get('http://172.28.1.2:8080/data', {
            qs: {
                pct: '0.8',
                res_col: '1',
                seed: '1',
            }
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                const bodyObj = JSON.parse(body);
                const trainData = bodyObj.train
                    .map(obj => ({ phrase: obj.Response, classification: obj.Classifier }));
                const testData = bodyObj.test
                    .map(obj => ({ phrase: obj.Response, classification: obj.Classifier }));
                resolve({ trainData, testData });
            }
        });
    });
};

module.exports.classifyTestData = (fnContext, classifierFn, testData, parseFn) => {
    const testResults = { correct: 0, incorrect: 0, results: [] };
    testData.forEach(td => {
        let thisClass = classifierFn.call(fnContext, td.phrase);
        if (parseFn) {
            thisClass = parseFn(thisClass);
        }
        let correct = false;
        if (thisClass === td.classifier) {
            testResults.correct++;
            correct = true;
        } else {
            testResults.incorrect++;
        }
        testResults.results.push({
            correct,
            phrase: td.phrase, 
            correctClass: td.classifier, 
            assignedClass: thisClass,
        });
    });
    return testResults;
};

module.exports.logResults = (trainData, testResults) => {
    const path = `./results/${testResults.name}`;
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