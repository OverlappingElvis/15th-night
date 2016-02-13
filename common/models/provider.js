module.exports = function(Provider) {
	var request = require('request');
	Provider.prototype.sendMessage = function(message, cb) {

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
