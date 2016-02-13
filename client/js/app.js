angular.module('fifteenApp', [
		'ui.router',
		'lbServices'
	])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('root', {
				url: '/',
				controller: 'RootController'
			})
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
			});
		$locationProvider.html5Mode(false);
		$locationProvider.hashPrefix('!');
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
