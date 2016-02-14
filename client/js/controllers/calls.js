angular.module('fifteenAppControllers').controller('CallsController', ['$scope', 'DataManager', 'Utility', function($scope, DataManager, Utility) {
	$scope.formatMessage = Utility.formatMessage;
	DataManager.fetchAll('Call')
		.then(function(calls) {
			$scope.calls = calls;
		});
}]);
