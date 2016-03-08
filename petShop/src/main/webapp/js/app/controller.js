appAutenticacao.controller("indexController", [
		'$log', function($log) {
			$log.info("Iniciando indexController");
			var self = this;

			self.selectedTemplate = {
				"path" : "pages/login.html"
			};
		}
]);

appAutenticacao.controller("loginController", [
		'$scope', '$log', 'autencicacaoHttpFacade', function($scope, $log, autencicacaoHttpFacade) {
			$log.info("Iniciando loginController");
			var self = this;
			self.usuario;

			// funcionalidade de alerta
			self.alerts = [];
			self.addAlert = function(type, msg) {
				self.alerts.push({
					msg : msg,
					type : type
				});
			};
			self.closeAlert = function(index) {
				self.alerts.splice(index, 1);
			};
			// fim - funcionalidade de alerta

			// Binding the park function to the scope
			self.logar = function() {
				self.closeAlert(0);

				if (self.formLogin.$valid) {
					autencicacaoHttpFacade.login(self.usuario).success(function(data, status, headers, config) {
						$log.info("Login com sucesso.");

						$scope.indexCtrl.selectedTemplate = {
							"path" : "pages/tamplateSite.html"
						}

					}).error(function(data, status, headers, config) {
						switch (status) {
							case 412: {
								self.addAlert("", "Login ou a senha não confere.");
								break;
							}
						}
						$log.error(status, data, "Login ou a senha não confere");
						$log.error(headers);
						$log.error(config);
					});
				} else {
					self.addAlert("", "Informe o email é a senha.");

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

appAutenticacao.controller("dashboardController", function($scope, $log) {
	$log.info("Iniciando dashboardController");
	$scope.petCaoForm = function() {
		$log.info('petCaoForm');
	}
});

appAutenticacao.controller("tamplateSiteController", [
		'$scope', '$log', function($scope, $log) {
			$log.info("Iniciando tamplateSiteController");
			var self = this;

			self.selectedTemplate = {
				"path" : "pages/dashboard.html"
			};

			self.logout = function() {
				$log.info("logout");
				$scope.indexCtrl.selectedTemplate = {
					"path" : "pages/login.html"
				}
			}
		}
]);
