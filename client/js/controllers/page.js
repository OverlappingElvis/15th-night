angular.module('fifteenAppControllers').controller('PageController', ['$scope', '$state', function($scope, $state) {
	$scope.isState = $state.is;
}]);
