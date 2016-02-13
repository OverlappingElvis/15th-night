angular.module('fifteenAppControllers').controller('ProviderEditController', ['$scope', 'DataManager', '$state', '$stateParams', function($scope, DataManager, $state, $stateParams) {
	var providerId = parseInt($stateParams.id, 10);
	var fetchProvider = function() {
		return DataManager.fetchOne('Provider', providerId);
	};
	$scope.save = function() {
		DataManager.updateOne('Provider', providerId)
			.then(fetchProvider)
	};
	fetchProvider();
}]);
