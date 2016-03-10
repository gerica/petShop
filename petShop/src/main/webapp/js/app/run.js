appAutenticacao.run(function($rootScope, $log, $http) {
	$log.info("Run app");
	$http.defaults.headers.common.Accept = "application/json";
	$http.defaults.cache = true;
//	$http.defaults.headers.common.Authorization = 'Basic';

});
