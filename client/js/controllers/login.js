angular.module('fifteenApp').controller('LoginController', ['$scope', 'DataManager', '$state', function($scope, DataManager, $state) {
	$scope.status = {};
	var error = function() {
		$scope.status.error = true;
	};
	$scope.login = function() {
		DataManager.modelMethod('Profile', 'login', $scope.user)
			.then(function(profile) {
				$rootScope.currentUser = profile;
			}, error)
			.then(_($state.go).partial('dashboard'));
	};
}]);
