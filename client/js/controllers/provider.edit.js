angular.module('fifteenAppControllers').controller('ProviderEditController', ['$scope', 'DataManager', '$state', '$stateParams', function($scope, DataManager, $state, $stateParams) {
	var providerId = $stateParams.id;
	var fetchProvider = function() {
		return DataManager.fetchOne('Provider', providerId)
			.then(function(provider) {
				$scope.provider = provider;
			});
	};
	$scope.
	$scope.save = function() {
		DataManager.updateOne('Provider', providerId, $scope.provider)
			.then(fetchProvider)
	};
	fetchProvider();
}]);
