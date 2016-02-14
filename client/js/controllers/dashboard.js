angular.module('fifteenAppControllers').controller('DashboardController', ['$scope', 'DataManager', '$rootScope', function($scope, DataManager, $rootScope) {

	var resetCall = $scope.resetCall = function() {
		$scope.call = {
			reply: $rootScope.currentUser.phone
		};
	};

	resetCall();

	var messageText = $scope.messageText = function(message) {
		var call = $scope.call;
		var message = call.message;
		if (!message) {
			return '';
		}
		var reply = call.reply;
		return '15thNight: ' + message + (reply ? ' CALL ' + reply : '');
	};

	$scope.charactersLeft = function() {
		return 160 - messageText($scope.call.message).length;
	};

	var recipientIds = function(categories) {
		return _(categories).chain()
			.map(function(category) {
				return _($scope.providers).chain()
					.filter(function(provider) {
						return _(provider.category.split(',')).contains(category)
					})
					.pluck('id')
					.value();
			})
			.flatten()
			.uniq()
			.value();
	};

	$scope.recipientNames = function() {
		return _(recipientIds($scope.call.categories)).chain()
			.map(function(id) {
				return _($scope.providers).findWhere({ id: id });
			})
			.pluck('name')
			.value()
			.sort()
			.join(', ');
	};

	$scope.createCall = function() {
		var call = $scope.call;
		DataManager.create('Call', {
			date: moment().format(),
			message: messageText(call.message),
			location: call.location,
			recipients: recipientIds(call.categories)
		}).then(resetCall);
	};

	DataManager.fetchAll('Provider')
		.then(function(providers) {
			$scope.providers = providers;
			$scope.providerCategories = _(providers).chain()
				.pluck('category')
				.compact()
				.map(function(categories) {
					return categories.split(',');
				})
				.flatten()
				.uniq()
				.value()
				.sort();
		});
}]);
