angular.module('fifteenAppControllers').controller('CallsController', ['$scope', 'DataManager', '$state', function($scope, DataManager, $state) {
	$scope.go = $state.go;
	DataManager.fetchAll('Call')
		.then(function(calls) {
			$scope.calls = calls;
		});
}]);
