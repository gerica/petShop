appAutenticacao.controller("clienteController", function($scope, $log, autencicacaoHttpFacade) {
	// FUNCTIONALIDADE DE CADASTRO
	$log.info("Iniciando clienteController");
	$scope.showAlert = false;
	$scope.classCssValor;
	$scope.alertMessage;

	//
	$scope.closeAlert = function() {
		$scope.showAlert = false;
	};

	$scope.salvar = function(cliente) {
		if ($scope.formCliente.$valid) {
			autencicacaoHttpFacade.incluirCliente(cliente).success(function(data, status, headers, config) {
				$log.info("Cliente inserido.");
				$scope.showAlert = true;
				$scope.classCssValor = "alert alert-success";
				$scope.alertMessage = "Operação realizada com suesso.";
				$scope.formCliente.$setPristine();
				limparForm(cliente);

				// $location.path("/tamplateSite");
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
		} else {
			$scope.showAlert = true;
			$scope.classCssValor = "alert alert-warning";
			$scope.alertMessage = "Informe os campos.";

			$scope.formCliente.nome.$setDirty(true);
			$scope.formCliente.sobreNome.$setDirty(true);
			$scope.formCliente.dtNacimento.$setDirty(true);
			$scope.formCliente.email.$setDirty(true);
		}
	};
	var limparForm = function(cliente) {
		for ( var key in cliente) {
			delete $scope.cliente[key];
		}
	};

	// FUNCIONALIDADES DA LISTA
	$log.info("Iniciando listaClienteController");
	$scope.search = "";
	$scope.order = "nome";
	$scope.tipoOrderAsc = true;
	$scope.selectedIndex = null;
	$scope.selectedCliente = null;

	$scope.filteredCliente = [];
	$scope.itemsPerPage = 5;
	$scope.currentPage = 1;

	// $scope.figureOutTodosToDisplay = function() {
	// var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
	// var end = begin + $scope.itemsPerPage;
	// if ($scope.clientes) {
	// $scope.filteredCliente = $scope.clientes.slice(begin, end);
	// }
	// };

	$scope.figureOutTodosToDisplay = function(cliente, index) {
		var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
		var end = begin + $scope.itemsPerPage;
		if (index >= begin && index <= end) {
			return true;
		}
		return false;
	};

	$scope.pageChanged = function() {
		$scope.figureOutTodosToDisplay();
	};

	$scope.selectPerson = function(cliente, index) {
		$scope.selectedIndex = index;
		$scope.selectedCliente = cliente;
	};

	$scope.sensitiveSearch = function(cliente) {
		if ($scope.search) {
			return cliente.nome.toUpperCase().indexOf($scope.search.toUpperCase()) == 0
					|| cliente.sobreNome.toUpperCase().indexOf($scope.search.toUpperCase()) == 0
					|| cliente.email.toUpperCase().indexOf($scope.search.toUpperCase()) == 0;
		}
		return true;
	};

	$scope.findAllCliente = function() {
		$log.info("parkingHttpFacade.findAllCliente()");
		autencicacaoHttpFacade.findAllCliente().success(function(data, status, headers, config) {
			$scope.clientes = data;
			// $scope.figureOutTodosToDisplay();
			// $log.info("clientes "+$scope.clientes);
		}).error(function(data, status, headers, config) {
			switch (status) {
				case 401: {
					$scope.message = "You must be authenticated!"
					break;
				}
				case 500: {
					$scope.message = "Something went wrong!";
					break;
				}
			}
		});
	}
});
