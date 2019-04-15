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

module.exports.getNewMysqlData = () => {
	return new Promise((resolve, reject) => {
		request.get('http://172.28.1.2:8080/data-new', (error, response, body) => {
			if (error) {
				reject(error);
			} else {
				const bodyObj = JSON.parse(body);
				console.log(bodyObj);
				const trainData = bodyObj.filter(b => b.train === 1)
					.map(obj => ({ phrase: obj.title, classification: obj.class }));
				const testData = bodyObj.filter(b => b.train === 0)
					.map(obj => ({ phrase: obj.title, classification: obj.class }))
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