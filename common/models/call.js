module.exports = function(Call) {
	var app = require('../../server/server');
	var request = require('http');
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
			});
		});
		next();
	});
};
