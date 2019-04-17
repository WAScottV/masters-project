const express = require('express');
const mysql = require('mysql');

const app = express();
const pool = mysql.createPool({
	connectionLimit: 10,
	host: '172.28.1.1',
	user: 'umduser',
	password: 'password',
	database: 'nlp',
	port: 3306,
});

app.use((req, res, next) => {
	console.log('Time:', Date.now());
	console.log(`${req.path}`);
	next();
});

app.get('/', (req, res) => res.send('Hello, world!'));

app.get('/data-new', (req, res) => {
		pool.query('CALL GetNewsData(0.1)', (error, results, fields) => {
			console.log(results[0]);
			const mod = results[0].map(v => {
				return {
					class: v.Class,
					title: v.Title,
					train: v.Train
				};
			});
			res.json(mod);
		});
});

app.get('/data', (req, res) => {
	const cols = req.query.res_col.split(',');
	Promise.all(cols.map(c => {
		return getData(req.query.pct, c, req.query.seed)
	}))
		.then((results) => {
			const overall = { train: [], test: [] };
			results.forEach(r => {
				overall.train.push(...r.train);
				overall.test.push(...r.test);
			});
			res.json(overall);
		});
});

pool.on('error', error => {
	console.log(error);
});

app.listen(8080, '0.0.0.0', () => console.log('Starting server...'));

const getData = (pct, res_col, seed) => {
	return new Promise((resolve, reject) => {
		pool.query(`CALL GetTrainingAndTestingRecords (${pct}, ${res_col}, ${seed})`,
			(error, results, fields) => {
				resolve({
					train: results[0],
					test: results[1],
				});
			});
	});
};