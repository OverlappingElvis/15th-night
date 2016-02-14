angular.module('fifteenApp').controller('SettingsController', ['$scope', '$rootScope', 'DataManager', function($scope, $rootScope, DataManager) {
	DataManager.modelMethod('Profile', 'getCurrent')
		.then(function(profile) {
			$scope.profile = profile;
		});
}]);
