appAutenticacao.controller("loginController", function($scope, $log, $location, autencicacaoHttpFacade) {
	$log.info("Iniciando loginController");
	$scope.showAlert = false;
	$scope.classCssValor;
	$scope.alertMessage;
	//
	$scope.closeAlert = function() {
		$scope.showAlert = false;
	};

	// Binding the park function to the scope
	$scope.logar = function(userLogin) {
		if (validarForm(userLogin)) {

			autencicacaoHttpFacade.login(userLogin).success(function(data, status, headers, config) {
				$log.info("Login com sucesso.");
				$location.path("/tamplateSite");
			}).error(function(data, status, headers, config) {
				switch (status) {
					case 401: {
						$scope.message = "You must be authenticated!"
						break;
					}
					case 415: {
						$scope.message = "Alguma coisa deu errado! Unsupported Media Type"
						break;
					}
					case 500: {
						$scope.message = "Something went wrong!";
						break;
					}
				}
				console.log("erro-----------------");
				console.log(data, status);
			});
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

});

appAutenticacao.controller("dashboardController", function($scope, $log) {
	$log.info("Iniciando dashboardController");
	$scope.petCaoForm = function() {
		$log.info('petCaoForm');
	}
});
appAutenticacao.controller("petCaoController", function($scope, $log) {
	$log.info("Iniciando petCaoController");
});

appAutenticacao.controller("painelController", function($scope, $log) {
	$log.info("Iniciando painelController");
});

appAutenticacao.controller("tamplateSiteController", function($scope, $log) {
	$log.info("Iniciando tamplateSiteController");
	$scope.selectedTemplate = {
		"path" : "pages/dashboard.html"
	};
});
