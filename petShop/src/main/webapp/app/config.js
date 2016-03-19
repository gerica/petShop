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