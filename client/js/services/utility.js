angular.module('fifteenApp')
	.factory('Utility', [function() {
		var Utility = {};
		Utility.formatMessage = function(call) {
			var message = call.message;
			if (!message) {
				return '';
			}
			var reply = call.reply;
			return _(['15thNight:', message, (reply ? 'reply' : void(0)), reply]).compact().join(' ');
		};
		return Utility;
	}]);
