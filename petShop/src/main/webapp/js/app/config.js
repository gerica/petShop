appAutenticacao.config(function($logProvider) {
	$logProvider.debugEnabled(false);
});

appAutenticacao.config([
		'$httpProvider', function($httpProvider) {
			$httpProvider.interceptors.push('MyLoggingInterceptor');
		}
]);