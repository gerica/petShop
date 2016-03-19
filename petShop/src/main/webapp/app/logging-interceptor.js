// File: chapter6/public/logging-interceptor.js
petShoepApp.factory('MyLoggingInterceptor', [
		'$q', '$log', function($q, $log) {
			return {
				request : function(config) {
					$log.debug('Request made with ', config);
					return config;
					// If an error, not allowed, or my custom condition,
					// return $q.reject('Not allowed');
				},
				requestError : function(rejection) {
					$log.debug('Request error due to ', rejection);
					// Continue to ensure that the next promise chain
					// sees an error
					return $q.reject(rejection);
					// Or handled successfully?
					// return someValue
				},
				response : function(response) {
					$log.debug('Response from server', response);
					// Return a promise
					return response || $q.when(response);
				},
				responseError : function(rejection) {
					$log.debug('Error in response ', rejection);
					// Continue to ensure that the next promise chain
					// sees an error
					// Can check auth status code here if need to
					// if (rejection.status === 403) {
					// Show a login dialog
					// return a value to tell controllers it has
					// been handled
					// }
					// Or return a rejection to continue the
					// promise failure chain
					return $q.reject(rejection);
				}
			};
		}
]);