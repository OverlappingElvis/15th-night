angular.module('fifteenAppControllers').controller('ProvidersController', ['$scope', 'DataManager', function($scope, DataManager) {
	DataManager.fetchAll('Provider')
		.then(function(providers) {
			$scope.providers = providers;
		});
}]);
