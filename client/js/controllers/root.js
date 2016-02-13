angular.module('fifteenAppControllers').controller('RootController', ['$rootScope', '$state', function($rootScope, $state) {
	if (_($rootScope.currentUser).isEmpty()) {
		$state.go('login');
	} else {
		$state.go('dashboard');
	}
}]);
