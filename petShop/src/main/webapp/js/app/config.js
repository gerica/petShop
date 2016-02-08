appAutenticacao.config(function($routeProvider, $locationProvider, $logProvider) {
	$logProvider.debugEnabled(true);
	$routeProvider.when("/", {
		templateUrl : "petShop/pages/login.html",
		controller : "loginController",
//		resolve : {
//			logar : [
//					'$http', function($http) {
//						$http({
//							method : 'POST',
//							url : '/petShop/rest/loginRest/login' ,
//							data : {
//								'nome' : 'rogerio',
//								'senha' : 'asdf'
//							}
//						}).success(function(data) {
//							console.log('certo');
//						}).error(function(data) {
//							console.log('errado');
//						});
//					}
//			]
//		}
	}).when("/tamplateSite", {
		templateUrl : "petShop/pages/tamplateSite.html",
		controller : "tamplateSiteController"
	}).when("/petCaoForm", {
		templateUrl : "petShop/pages/cliente/form.html",
		controller : "petCaoController"
	}).when("/petCaoForm", {
		templateUrl : "petShop/pages/pet/cao/form.html",
		controller : "petCaoController"
	}).otherwise({
		redirectTo : '/tamplateSite'
	});
	
	
	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});

});
