module.exports = function(Provider) {
	var http = require('http');]
	// Untracked tokens file
	var tokens = require('../../server/tokens');
	Provider.prototype.sendMessage = function(message, next) {
		var provider = this;
		if (!provider.phone) {
			return;
		}
		var number = provider.phone;
		var message = encodeURI(instance.message);
		var path = '/1.0/sessions?action=create&token=' + tokens.tropo.messaging + '&msg=' + message + '&number=' + number;
		var tropoSessionAPI = 'api.tropo.com';
		var tropo = http.createClient(80, tropoSessionAPI);
		var request = tropo.request('GET', path, {'host': tropoSessionAPI});
		request.end();
		request.on('response', function (response) {
			response.setEncoding('utf8');
			response.addListener('data', function (chunk) {
				console.log('Sent message. Tropo response code:' + response.statusCode + '. Body: ' + chunk);
			});
		});
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
