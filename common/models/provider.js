module.exports = function(Provider) {
	var http = require('http');
	// Untracked tokens file
	var tokens = require('../../server/tokens');
	Provider.prototype.sendMessage = function(message, next) {
		var number = this.phone;
		if (!number) {
			return next();
		}
		var tropo = http.request({
			hostname: 'api.tropo.com',
			port: 80,
			method: 'GET',
			path: '/1.0/sessions?action=create&token=' + tokens.tropo.messaging + '&msg=' + encodeURI(message) + '&number=' + number
		}, function(response) {
			response.setEncoding('utf8');
			response.on('data', function (chunk) {
				console.log('Sent message. Tropo response code:' + response.statusCode + '. Body: ' + chunk);
			});
		});
		tropo.end();
		next();
	};
	Provider.remoteMethod('sendMessage', {
		isStatic: false,
		http: {
			verb: 'post'
		},
		accepts: {
			arg: 'message',
			type: 'string'
		}
	})
};
