angular.module('fifteenAppControllers').controller('DashboardController', ['$scope', 'DataManager', function($scope, DataManager) {

	$scope.messagePreview = function() {
		var message = $scope.call.message;
		if (!message) {
			return '...';
		}
		return '15thNight: ' + $scope.call.message + ' REPLY YES TO ACCEPT';
	};

	$scope.resetCall = function() {
		$scope.call = {};
	};

	DataManager.fetchAll('Provider')
		.then(function(providers) {
			$scope.providers = providers;
			$scope.providerCategories = _(providers).chain()
				.pluck('category')
				.map(function(categories) {
					return categories.split(',');
				})
				.flatten()
				.uniq()
				.value()
				.sort();
		});
}]);
