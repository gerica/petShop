petShoepApp.controller("indexController", [
		'$log', '$http', '$state', 'AuthenticationService','$rootScope', function($log, $http, $state, AuthenticationService,$rootScope) {
			$log.info("Iniciando indexController");
			var self = this;

			self.containsPapel = function(papeis) {
				return AuthenticationService.containsPapel(papeis);
			};

			self.isAuthenticate = function() {
				return AuthenticationService.isLoggedIn();
			};

			self.getNomeUsuario = function(){
				if($rootScope.globals != undefined && $rootScope.globals.currentUser != undefined){
					return $rootScope.globals.currentUser.user.dsNome;
				}
			}

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
