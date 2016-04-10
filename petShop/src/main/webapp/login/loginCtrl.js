petShoepApp.controller("loginController", [
		'$scope', '$log', '$state', 'AuthenticationService', 'Messages', function($scope, $log, $state, AuthenticationService, Messages) {
			$log.info("Iniciando loginController");
			var self = this;
			self.usuario;
			self.message = Messages.getMessage(0);

			self.myAlert = new MyAlert();

			if (Messages.getMessages() != undefined && Messages.getMessages().length > 0) {
				self.myAlert.addMessage("", Messages.getMessage(0).text);
                Messages.removeMessage(0);
			}

			// Binding the park function to the scope
			self.logar = function() {
				self.myAlert.removeMessage(0);

				if (self.formLogin.$valid) {
					AuthenticationService.login(self.usuario).success(function(data, status, headers, config) {
						$log.info("Login com sucesso.");
						$scope.indexCtrl.usuario = data;

						AuthenticationService.setCredentials(data);
						// AuthenticationService.setLoggedIn(true);
						$state.go('dashboard');
					}).error(function(data, status, headers, config) {
						switch (status) {
							case 400: {
								self.myAlert.addMessage("", data.description);
								break;
							}
						}
					});
				} else {
					self.myAlert.addMessage("", "Informe o email é a senha.");

					self.formLogin.login.$setDirty(true);
					self.formLogin.senha.$setDirty(true);

				}
			};

			function validarForm(userLogin) {
				$log.info(userLogin);
				if (typeof userLogin === 'undefined') {
					$scope.showAlert = true;
					$scope.classCssValor = "alert alert-danger";
					$scope.alertMessage = "Informe o email e a senha."
					return false;
				} else if (typeof userLogin.email === 'undefined') {
					$scope.showAlert = true;
					$scope.classCssValor = "alert alert-danger";
					$scope.alertMessage = "Informe o email."
					return false;
				} else if (typeof userLogin.senha === 'undefined') {
					$scope.showAlert = true;
					$scope.classCssValor = "alert alert-danger";
					$scope.alertMessage = "Informe a senha."
					return false;
				}
				return true;

			}

		}
]);

petShoepApp.controller("testeController", [
		'$scope', '$log', 'petShopHttpFacade', function($scope, $log, petShopHttpFacade) {
			var self = this;
			self.title = 'Cliente';
			self.tabs = {
				cadastro : {
					active : false,
					page : "usuario/cadastro.html",
				},
				lista : {
					active : true,
					page : "usuario/lista.html"
				}
			};

			self.findAll = function() {
				alert('FINDING ALL ENTITIES');
			};
		}
]);
