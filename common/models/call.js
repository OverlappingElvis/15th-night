module.exports = function(Call) {
	var app = require('../../server/server');
	var http = require('http');
	var _ = require('underscore');

	Call.observe('before save', function(context, next) {
		if (!context.isNewInstance) {
			// Only create new instances
			return next('cannot update existing instance');
		}
		var instance = context.instance;
		var recipients = instance.recipients;
		recipients.each(function(recipientId) {
			app.models.Provider.findById(recipientId, function(err, provider) {
				provider.sendMessage(instance.message, _.noop);
			});
		});
		next();
	});
};
