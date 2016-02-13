angular.module('fifteenAppControllers').controller('ProvidersController', ['$scope', 'DataManager', '$state', function($scope, DataManager, $state) {
	DataManager.fetchAll('Provider')
		.then(function(providers) {
			$scope.providers = _(providers).chain()
				.filter(function(provider) {
					return !!provider.category;
				})
				.map(function(provider) {
					provider.category = provider.category.split(',').sort().join(', ')
					return provider;
				})
				.value();
		});
}]);
