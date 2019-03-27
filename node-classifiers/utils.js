const request = require('request');

module.exports.getMysqlData = (pct, res_col, seed) => {
	return new Promise((resolve, reject) => {
		request.get('http://172.28.1.2:8080/data', {
			qs: {
				pct,
				res_col,
				seed,
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

module.exports.logResults = (trainData, testResults) => {
	return new Promise((resolve, reject) => {
		request.post('http://172.28.1.4:8080/results', {
			json: {
				train: trainData,
				test: testResults
			}
		}, (err, res, body) => {
			resolve(body);
		});
	});
};