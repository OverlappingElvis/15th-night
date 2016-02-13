angular.module('fifteenApp').controller('PageController', ['$scope', '$state', function($scope, $state) {
	$scope.className = function() {
		return $state.is('login') ? 'login-page' : 'skin-blue sidebar-mini';
	};
}]);
