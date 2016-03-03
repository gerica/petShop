appAutenticacao.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/cadastro');

	$stateProvider.state('lista', {
		templateUrl : "petShop/pages/cliente/lista.html",
		controller : "clienteController",
	}).state('cadastro', {
		templateUrl : "petShop/pages/cliente/cadastro.html",
		controller : "clienteController",
	});

});

appAutenticacao.config(function($logProvider) {
	$logProvider.debugEnabled(false);
});

appAutenticacao.config([
		'$httpProvider', function($httpProvider) {
			$httpProvider.interceptors.push('MyLoggingInterceptor');
		}
]);