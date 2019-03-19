const express = require('express');
const mysql = require('mysql');

const app = express();
const pool = mysql.createPool({
	connectionLimit: 10,
	host: '172.28.1.1',
	user: 'umduser',
	password: 'password',
	database: 'nlp',
	//insecureAuth: true,
	port: 3306,
});

app.use(function (req, res, next) {
	console.log('Time:', Date.now());
	console.log(`${req.path}`);
	next();
});

app.get('/', (req, res) => res.send('New Response'));

app.get('/all-data', (req, res) => {
	pool.query('SELECT table_name FROM information_schema.tables where table_schema=\'nlp\'', (error, results, fields) => res.json(results));
});

app.get('/data', (req, res) => {
	pool.query(`CALL GetTrainingAndTestingRecords (${req.query.pct}, ${req.query.res_col}, ${req.query.seed})`,
		(error, results, fields) => {
			res.json({
				train: results[0],
				test: results[1],
			});
		});
});

pool.on('error', error => {
	console.log(error);
});

app.listen(8080,'0.0.0.0', () => console.log('Starting server...'));
