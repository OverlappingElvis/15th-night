module.exports = function(Call) {
	var app = require('../../server/server');
	var http = require('http');
	// Untracked tokens file
	var tokens = require('../../server/tokens');

	Call.observe('before save', function(context, next) {
		if (!context.isNewInstance) {
			// Only create new instances
			return next('cannot update existing instance');
		}
		var instance = context.instance;
		var recipients = instance.recipients;
		recipients.each(function(recipientId) {
			app.models.Provider.findById(recipientId, function(err, provider) {
				if (!provider.phone) {
					return;
				}
				var number = provider.phone;
				var message = encodeURI(instance.message);
				var path = '/1.0/sessions?action=create&token=' + tokens.tropo.messaging + '&msg=' + message + '&number=' + number;
				var tropoSessionAPI = 'api.tropo.com';
				var tropo = http.createClient(80, tropoSessionAPI);
				var request = tropo.request('GET', path, {'host': tropoSessionAPI});
				var request = tropo.request('GET', path, {'host': tropoSessionAPI});
				request.end();
				request.on('response', function (response) {
					response.setEncoding('utf8');
					response.addListener('data', function (chunk) {
						console.log('Sent message. Tropo response code:' + response.statusCode + '. Body: ' + chunk);
					});
				});

			});
		});
		next();
	});
};
