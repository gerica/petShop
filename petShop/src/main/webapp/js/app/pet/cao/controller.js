appAutenticacao.controller("petCaoController", function($scope, $log, autencicacaoHttpFacade) {
	$log.info("Iniciando petCaoController");
	$scope.selected = undefined;
	$scope.alerts = [];
	autencicacaoHttpFacade.findAllRaca().then(function(response) {
		$scope.racas = response.data;
	});

	$scope.findAllRaca = function(val) {
		$log.info("parkingHttpFacade.findAllRaca()");
		return autencicacaoHttpFacade.findAllRaca();
	}

	$scope.findCliente = function(val) {
		$log.info("parkingHttpFacade.findCliente()");
		return autencicacaoHttpFacade.findCliente(val);
	}

	$scope.addAlert = function(type, msg) {
		$scope.alerts.push({
			msg : msg,
			type : type
		});
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.onSelect = function($item, $model, $label) {
		$scope.$item = $item;
		$scope.$model = $model;
		$scope.$label = $label;
	};
	
	$scope.salvar = function(cachorro) {
		if ($scope.formPet.$valid) {
			$log.info(cachorro);
//			autencicacaoHttpFacade.incluirCliente(cliente).success(function(data, status, headers, config) {
//				$log.info("Cliente inserido.");
//				$scope.showAlert = true;
//				$scope.classCssValor = "alert alert-success";
//				$scope.alertMessage = "Operação realizada com suesso.";
//				$scope.formPet.$setPristine();
//				limparForm(cliente);
//
//				// $location.path("/tamplateSite");
//			}).error(function(data, status, headers, config) {
//				console.log("erro-----------------");
//				console.log(data, status);
//			});
		} else {
//			$scope.showAlert = true;
//			$scope.classCssValor = "alert alert-warning";
//			$scope.alertMessage = "Informe os campos.";
			$scope.addAlert("danger", "Informe os campos.");

			$scope.formPet.nome.$setDirty(true);
			$scope.formPet.dtNacimento.$setDirty(true);
		}
	};
	var limparForm = function(cliente) {
		for ( var key in cliente) {
			delete $scope.cliente[key];
		}
	};

});
