petShoepApp.run([
		'$rootScope', '$state', '$location', '$log', '$http', 'AuthenticationService',
		function($rootScope, $state, $location, $log, $http, AuthenticationService) {
			$log.info("Run app");
			$http.defaults.headers.common.Accept = "application/json";
			$http.defaults.cache = true;
			// $http.defaults.headers.common.Authorization = 'Basic';

			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
				AuthenticationService.sessionAtivada();

				var shouldLogin = toState.data !== undefined && toState.data.requireLogin && !AuthenticationService.isLoggedIn();

				// NOT authenticated - wants any private stuff
				if (shouldLogin) {
					$state.go('login');
					event.preventDefault();
					return;
				}

				//
				// // authenticated (previously) comming not to root main
				// if (Auth.isLoggedIn) {
				// var shouldGoToMain = fromState.name === ""
				// && toState.name !== "main";
				//
				// if (shouldGoToMain) {
				// $state.go('main');
				// event.preventDefault();
				// }
				// return;
				// }
				//
				// // UNauthenticated (previously) comming not to root public
				// var shouldGoToPublic = fromState.name === ""
				// && toState.name !== "public"
				// && toState.name !== "login";
				//
				// if (shouldGoToPublic) {
				// $state.go('public');
				// console.log('p')
				// event.preventDefault();
				// }

				// unmanaged
			});

		}
]);
