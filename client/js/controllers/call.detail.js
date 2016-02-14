angular.module('fifteenAppControllers').controller('CallDetailController', ['$scope', 'DataManager', '$stateParams', 'Utility', function($scope, DataManager, $stateParams, Utility) {
	$scope.formatMessage = Utility.formatMessage;
	DataManager.fetchOne('Call', $stateParams.id)
		.then(function(call) {
			$scope.call = call;
		})
}]);
