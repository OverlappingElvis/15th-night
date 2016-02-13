angular.module('fifteenAppControllers').controller('CallDetailController', ['$scope', 'DataManager', '$stateParams', function($scope, DataManager, $stateParams) {
	$scope.messagePreview = function() {
		var ellipsis = '...';
		if (!$scope.call) {
			return ellipsis;
		}
		var message = $scope.call.message;
		if (!message) {
			return ellipsis;
		}
		return '15thNight: ' + message + ' REPLY YES TO ACCEPT';
	};
	DataManager.fetchOne('Call', $stateParams.id)
		.then(function(call) {
			$scope.call = call;
		})
}]);
