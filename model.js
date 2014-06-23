var cls = require('continuation-local-storage');
exports.get = function(param, cb) {
	var tid = cls.getNamespace('transaction').get('tid');
	var now = process.hrtime();
	process.nextTick(function() {
		var took = process.hrtime(now);
		var cmd = 'cmd was: GET ' + param;
		cls.getNamespace('transaction').set('log', 
			(cls.getNamespace('transaction').get('log')||[]).concat({
				took: took,
				cmd: cmd,
				transactionId: tid
			})
		);
		cb(null, {
			took: took,
			dummy: true,
			cmd: cmd
		});
	});
};
