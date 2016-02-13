angular.module('fifteenAppControllers').controller('ProvidersController', ['$scope', 'DataManager', '$state', function($scope, DataManager, $state) {
	$scope.go = $state.go;

	DataManager.fetchAll('Provider')
		.then(function(providers) {
			$scope.providers = _(providers).map(function(provider) {
				return {
					name: provider.name,
					category: provider.category.split(',').sort().join(', ')
				};
			});
		});
}]);
