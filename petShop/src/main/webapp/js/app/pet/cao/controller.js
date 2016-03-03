appAutenticacao.controller("petCaoController", function($uibModal, $log, autencicacaoHttpFacade) {
	$log.info("Iniciando petCaoController");
	var self = this;
	self.search;
	self.cachorro
	
	self.selected = undefined;
	self.alerts = [];
	
	autencicacaoHttpFacade.findAllRaca().then(function(response) {
		self.racas = response.data;
	});

	self.findAllRaca = function(val) {
		$log.info("parkingHttpFacade.findAllRaca()");
		return autencicacaoHttpFacade.findAllRaca();
	}

	self.findCliente = function(val) {
		$log.info("parkingHttpFacade.findCliente()");
		return autencicacaoHttpFacade.findCliente(val);
	}

	self.addAlert = function(type, msg) {
		self.alerts.push({
			msg : msg,
			type : type
		});
	};

	self.closeAlert = function(index) {
		self.alerts.splice(index, 1);
	};

	self.onSelect = function($item, $model, $label) {
		self.$item = $item;
		self.$model = $model;
		self.$label = $label;
	};

	self.salvar = function() {
		self.closeAlert(0);
		if (self.formPet.$valid) {
			autencicacaoHttpFacade.incluirCachorro(self.cachorro).success(function(data, status, headers, config) {
				$log.info("Cachorro inserido.");
				self.formPet.$setPristine();
				self.addAlert("success", "Registro cadastrado com sucesso.");
				limparForm(self.cachorro);

				// $location.path("/tamplateSite");
			}).error(function(data, status, headers, config) {
				console.log("erro-----------------");
				console.log(data, status);
			});
		} else {
			self.addAlert("danger", "Informe os campos.");

			self.formPet.nome.$setDirty(true);
			self.formPet.dtNacimento.$setDirty(true);
		}
	};
	var limparForm = function(cachorro) {
		for ( var key in cachorro) {
			delete self.cachorro[key];
		}
	};

	// FUNCIONALIDADES DA LISTA
	$log.info("Iniciando listaCachorroController");
	self.itemsPerPage = 10;
	self.currentPage = 1;
	self.activeTabs = [false, true];

	self.figureOutTodosToDisplay = function(cachorro, index) {
		var begin = ((self.currentPage - 1) * self.itemsPerPage);
		var end = begin + self.itemsPerPage;

		if (index >= begin && index < end) {
			return true;
		}
		return false;
	};

	self.pageChanged = function() {
		self.figureOutTodosToDisplay();
	};

	self.setCachorro = function(cachorro, index) {
		self.selectedIndex = index;
		self.open('lg', cachorro);
	};

	self.sensitiveSearch = function(cachorro) {
		if (self.search) {
			return cachorro.nome.toUpperCase().indexOf(self.search.toUpperCase()) == 0;
		}
		return true;
	};

	self.findAllCachorro = function() {
		$log.info("parkingHttpFacade.findAllCachorro()");
		autencicacaoHttpFacade.findAllCachorro().success(function(data, status, headers, config) {
			self.cachorros = data;
		}).error(function(data, status, headers, config) {
			$log.error("erro ao buscar os cachorros");
		});
	}


	self.findAllCachorro();

	// funcionalidade de modal
	self.open = function (size, cachorro) {

		var modalInstance = $uibModal.open({
			animation: self.animationsEnabled,
			templateUrl: '/petShop/pages/pet/cao/modalDetalhe.html',
			controller: 'modalDetalheCachorroController as ctrl',
			size: size,
			resolve: {
				cachorro: function () {
					return cachorro;
				}
			}
		});

		modalInstance.result.then(function (cachorro) {
			self.cachorro = cachorro;
			self.activeTabs = [true, false];
			
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});

appAutenticacao.controller('modalDetalheCachorroController', function ($uibModalInstance, $log, cachorro) {
	var self = this;
	self.cachorro = cachorro;

	self.alterar = function () {
		$uibModalInstance.close(self.cachorro);
	};

	self.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
