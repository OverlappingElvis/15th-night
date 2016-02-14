angular.module('fifteenAppControllers').controller('ProviderEditController', ['$scope', 'DataManager', '$state', '$stateParams', function($scope, DataManager, $state, $stateParams) {
	var providerId = $stateParams.id;

	$scope.status = {};

	$scope.save = function() {
		var provider = $scope.provider;
		provider.category = $scope.categories.join(',');
		if (!providerId) {
			return DataManager.create('Provider', provider)
				.then(function(provider) {
					$state.go('providers.edit', {
						id: provider.id
					})
				});
		}
		return DataManager.updateOne('Provider', providerId, provider)
			.then(_($state.go).partial('providers'));
	};

	$scope.addCategory = function() {

	};

	$scope.removeCategory = function(category) {
		$scope.categories = _($scope.categories).without(category);
	};

	if (providerId) {
		DataManager.fetchOne('Provider', providerId)
			.then(function(provider) {
				$scope.provider = provider;
				$scope.categories = provider.category.split(',');
			});
	}

}]);
