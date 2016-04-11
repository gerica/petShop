petShoepApp.controller("indexController", [
		'$log', '$http', '$state', 'AuthenticationService', function($log, $http, $state, AuthenticationService) {
			$log.info("Iniciando indexController");
			var self = this;

			self.containsPapel = function(papel) {
				return AuthenticationService.containsPapel(papel);
			};

			self.isAuthenticate = function() {
				return AuthenticationService.isLoggedIn();
			};

			self.logout = function() {
				$log.info("logout");
				AuthenticationService.logout().success(function(data, status, headers, config) {
					AuthenticationService.isLoggedIn();
					$log.info("Logout com sucesso.");
					AuthenticationService.setLoggedIn(false);
					$state.go('login');

				}).error(function(data, status, headers, config) {
					console.log("erro-----------------");
					console.log(data, status);
				});
			};
		}
]);
