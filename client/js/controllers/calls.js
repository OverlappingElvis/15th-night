angular.module('fifteenAppControllers').controller('CallsController', ['$scope', 'DataManager', '$state', function($scope, DataManager, $state) {
	DataManager.fetchAll('Call')
		.then(function(calls) {
			$scope.calls = calls;
		});
}]);
