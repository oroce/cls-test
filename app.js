var express = require('express');
var app = express();
var cls = require('continuation-local-storage');
var model = require('./model');
var clsmw  = require('cls-middleware');
var ns = cls.createNamespace('transaction');
var uuid = require('uuid');
var inspect = require('util').inspect;

app.use(clsmw(ns));

app.use(function pre(req, res, next) {
	cls.getNamespace('transaction').set('tid', uuid.v4());
	next();
});

app.use(function setTID(req, res, next) {
	var tid = cls.getNamespace('transaction') || uuid.v4();
	res.set('X-Transaction-Id', tid);
	next();
});

app.get('/', function(req, res, next) {
	var param = req.param('param', 'dummy');
	model.get(param, function(err, result) {
		if (err) return next(err);

		res.json(result);
		next();
	});
});


app.use(function post(req, res, next) {
	console.log(inspect(cls.getNamespace('transaction').active, {
		depth: 4
	}));
});

require('http').createServer(app).listen(8000, console.log.bind(console));
