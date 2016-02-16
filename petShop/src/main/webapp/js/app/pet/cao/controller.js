appAutenticacao.controller("petCaoController", function($scope, $uibModal, $log, autencicacaoHttpFacade) {
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
		$scope.closeAlert(0);
		if ($scope.formPet.$valid) {
			autencicacaoHttpFacade.incluirCachorro(cachorro).success(function(data, status, headers, config) {
				$log.info("Cachorro inserido.");
				$scope.formPet.$setPristine();
				$scope.addAlert("success", "Registro cadastrado com sucesso.");
				limparForm(cachorro);

				// $location.path("/tamplateSite");
			}).error(function(data, status, headers, config) {
				console.log("erro-----------------");
				console.log(data, status);
			});
		} else {
			$scope.addAlert("danger", "Informe os campos.");

			$scope.formPet.nome.$setDirty(true);
			$scope.formPet.dtNacimento.$setDirty(true);
		}
	};
	var limparForm = function(cachorro) {
		for ( var key in cachorro) {
			delete $scope.cachorro[key];
		}
	};

	// FUNCIONALIDADES DA LISTA
	$log.info("Iniciando listaCachorroController");
	$scope.itemsPerPage = 10;
	$scope.currentPage = 1;

	$scope.figureOutTodosToDisplay = function(cachorro, index) {
		var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
		var end = begin + $scope.itemsPerPage;

		if (index >= begin && index < end) {
			return true;
		}
		return false;
	};

	$scope.pageChanged = function() {
		$scope.figureOutTodosToDisplay();
	};

	$scope.setCachorro = function(cachorro, index) {
		$scope.selectedIndex = index;
		$scope.selectedCachorro = cachorro;
		$scope.open('lg', $scope.selectedCachorro);
	};

	$scope.sensitiveSearch = function(cachorro) {
		if ($scope.search) {
			return cachorro.nome.toUpperCase().indexOf($scope.search.toUpperCase()) == 0;
		}
		return true;
	};

	$scope.findAllCachorro = function() {
		$log.info("parkingHttpFacade.findAllCachorro()");
		autencicacaoHttpFacade.findAllCachorro().success(function(data, status, headers, config) {
			$scope.cachorros = data;
		}).error(function(data, status, headers, config) {
			$log.error("erro ao buscar os cachorros");
		});
	}


	$scope.findAllCachorro();

	// funcionalidade de modal
	$scope.items = ['item1', 'item2', 'item3'];

	$scope.open = function (size, cachorro) {

		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: '/petShop/pages/pet/cao/modalDetalhe.html',
			controller: 'modalDetalheCachorroController',
			size: size,
			resolve: {
				cachorro: function () {
					return cachorro;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});

appAutenticacao.controller('modalDetalheCachorroController', function ($scope, $uibModalInstance, $log, cachorro) {

	$scope.cachorro = cachorro;

	$scope.alterar = function () {
		$log.info($scope);
		$uibModalInstance.close($scope.cachorro);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
