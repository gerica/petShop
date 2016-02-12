//appAutenticacao.config(function($routeProvider, $locationProvider, $logProvider) {
//	$logProvider.debugEnabled(true);
//	$routeProvider.when("/", {
//		templateUrl : "petShop/pages/login.html",
//		controller : "loginController",
//	// resolve : {
//	// logar : [
//	// '$http', function($http) {
//	// $http({
//	// method : 'POST',
//	// url : '/petShop/rest/loginRest/login' ,
//	// data : {
//	// 'nome' : 'rogerio',
//	// 'senha' : 'asdf'
//	// }
//	// }).success(function(data) {
//	// console.log('certo');
//	// }).error(function(data) {
//	// console.log('errado');
//	// });
//	// }
//	// ]
//	// }
//	}).when("/tamplateSite", {
//		templateUrl : "petShop/pages/tamplateSite.html",
//		controller : "tamplateSiteController"
//	}).when("/clienteForm", {
//		templateUrl : "petShop/pages/cliente/form.html",
//		controller : "clienteController"
//	}).when("/petCaoForm", {
//		templateUrl : "petShop/pages/pet/cao/form.html",
//		controller : "petCaoController"
//	}).otherwise({
//		redirectTo : '/tamplateSite'
//	});
//
//	$locationProvider.html5Mode({
//		enabled : true,
//		requireBase : false,
//		hashPrefix : '!',
//		rewriteLinks : false
//	});
//
//});
//
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
