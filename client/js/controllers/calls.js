angular.module('fifteenAppControllers').controller('CallsController', ['$scope', 'DataManager', function($scope, DataManager) {
	DataManager.fetchAll('Call')
		.then(function(providers) {
			$scope.providers = providers;
		});
}]);
