petShoepApp.config([
		'$logProvider', function($logProvider) {
			$logProvider.debugEnabled(false);

		}
]);

petShoepApp.config([
		'$httpProvider', function($httpProvider) {
			$httpProvider.interceptors.push('MyLoggingInterceptor');
		}
]);

petShoepApp.config(function($stateProvider, $urlRouterProvider, $logProvider) {
	//$urlRouterProvider.otherwise('/dashboard');

	// when there is an empty route, redirect to /index
	//$urlRouterProvider.when('', '/dashboard');
	
	$stateProvider
		// VIEWS LOGIN	 ========================================
		.state('login', {
			url: '/login',
			templateUrl: 'login/login.html',			
		})
		// VIEWS TAMPLATESITE ========================================
		.state('tamplateSite', {
			url: '/tamplateSite',
			templateUrl: 'dashboard/tamplateSite.html',
			data : {requireLogin : true },
		})
		// VIEWS DASHBOARD ========================================
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: 'dashboard/dashboard.html',
			data : {requireLogin : true },
		})
		// VIEWS PETSHOP ========================================
		.state('petShop', {
			url: '/petShop',
			templateUrl: 'dashboard/dashboard.html',
			data : {requireLogin : true },
		})
		// VIEWS PET ========================================
		.state('pet', {
			url: '/pet',
			templateUrl: 'pet/form.html',
			data : {requireLogin : true },
		})
		// VIEWS RACAO ========================================
		.state('racao', {
			url: '/racao',
			templateUrl: 'shop/racao.html',
			data : {requireLogin : true },
		})
		// VIEWS USUARIO ========================================
		.state('usuario', {
			url: '/usuario',
			templateUrl: 'usuario/form.html',
			data : {requireLogin : true },
		})
		// VIEWS VETERINARIA========================================
		.state('veterinario', {
			url: '/veterinario',
			templateUrl: 'veterinaria/form.html',
			data : {requireLogin : true },
		})

		// VIEWS CLIENTE =================================
		.state('cliente', {
			url: '/cliente',
			templateUrl: 'cliente/form.html',
			data : {requireLogin : true },
		});
});
