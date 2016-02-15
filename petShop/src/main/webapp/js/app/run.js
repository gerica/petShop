appAutenticacao.run(function($rootScope, $log, $http, paginationConfig) {
	$log.info("Run app");
	$http.defaults.headers.common.Accept = "application/json";
	$http.defaults.cache = true;

	paginationConfig.firstText = 'Primeira';
	paginationConfig.previousText = 'Anteior';
	paginationConfig.nextText = 'Próximo';
	paginationConfig.lastText = 'Último';

});
