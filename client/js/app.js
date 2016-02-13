angular.module('fifteenAppControllers', []);
angular.module('fifteenApp', [
		'ui.router',
		'lbServices',
		'fifteenAppControllers'
	])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/login');
		$stateProvider
			.state('login', {
				url: '/login',
				controller: 'LoginController',
				templateUrl: 'views/login.html'
			})
			.state('logout', {
				url: '/logout',
				controller: 'LogoutController'
			})
			.state('dashboard', {
				url: '/dashboard',
				controller: 'DashboardController',
				templateUrl: 'views/dashboard.html',
				authenticate: true
			})
			.state('calls', {
				url: '/calls',
				controller: 'CallsController',
				templateUrl: 'views/calls.html',
				authenticate: true
			})
			.state('providers', {
				url: '/providers',
				controller: 'ProvidersController',
				templateUrl: 'views/providers.html',
				authenticate: true
			});
	}])
	.run(['$rootScope', 'DataManager', '$state', function($rootScope, DataManager, $state) {
		$rootScope.$on('$stateChangeStart', function(e, next) {
			if (!next.authenticate) {
				return;
			};
			DataManager.modelMethod('Profile', 'getCurrent')
				.then(_.noop, function() {
					e.preventDefault();
					delete $rootScope.currentUser;
					$state.go('login');
				});
		});
		return DataManager.modelMethod('Profile', 'getCurrent')
			.then(function(profile) {
				$rootScope.currentUser = profile;
			});
	}]);
