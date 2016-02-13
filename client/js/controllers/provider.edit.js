angular.module('fifteenAppControllers').controller('ProviderEditController', ['$scope', 'DataManager', '$state', '$stateParams', function($scope, DataManager, $state, $stateParams) {
	var providerId = $stateParams.id;
	var fetchProvider = function() {
		return DataManager.fetchOne('Provider', providerId)
			.then(function(provider) {
				$scope.provider = provider;
			});
	};
	$scope.save = function() {
		var provider = $scope.provider;
		if (!providerId) {
			return DataManager.create('Provider', provider)
				.then(function(provider) {
					$state.go('providers.edit', {
						id: provider.id
					})
				});
		}
		return DataManager.updateOne('Provider', providerId, provider)
			.then(fetchProvider)
	};
	if (providerId) {
		fetchProvider();
	}
}]);
