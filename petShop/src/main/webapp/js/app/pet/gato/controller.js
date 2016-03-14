appAutenticacao.controller("petGatoController", function($uibModal, $log, petShopHttpFacade) {
	$log.info("Iniciando petGatoController");
	var self = this;
	self.search;
	self.gato
	
	self.selected = undefined;
	self.alerts = [];
	
	petShopHttpFacade.findAllRacaGato().then(function(response) {
		self.racas = response.data;
	});

	self.findAllRacaGato = function() {
		$log.info("petGatoController.findAllRacaGato()");
		return petShopHttpFacade.findAllRacaGato();
	}

	self.findCliente = function(val) {
		$log.info("parkingHttpFacade.findCliente()");
		return petShopHttpFacade.findCliente(val);
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
			petShopHttpFacade.incluirGato(self.gato).success(function(data, status, headers, config) {
				$log.info("gato inserido.");
				self.formPet.$setPristine(true);
				self.addAlert("success", "Registro cadastrado com sucesso.");
				self.limparForm(self.gato);
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
	
	self.limparForm = function(gato) {
		for ( var key in gato) {
			self.gato = null;
		}
		self.formPet.$setPristine(true);
	};

	// FUNCIONALIDADES DA LISTA
	$log.info("Iniciando listaGatoController");
	self.itemsPerPage = 10;
	self.currentPage = 1;
	self.activeTabs = [false, true];

	self.figureOutTodosToDisplay = function(gato, index) {
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

	self.setGato = function(gato, index) {
		self.selectedIndex = index;
		self.open('lg', gato);
	};

	self.sensitiveSearch = function(gato) {
		if (self.search) {
			return gato.nome.toUpperCase().indexOf(self.search.toUpperCase()) == 0 ||
			gato.cliente.nome.toUpperCase().indexOf(self.search.toUpperCase()) ==0 ;;
		}
		return true;
	};

	self.findAllGato = function() {
		$log.info("parkingHttpFacade.findAllGato()");
		petShopHttpFacade.findAllGato().success(function(data, status, headers, config) {
			self.gatos = data;
		}).error(function(data, status, headers, config) {
			$log.error("erro ao buscar os gatos");
		});
	}


	self.findAllGato();

	// funcionalidade de modal
	self.open = function (size, gato) {

		var modalInstance = $uibModal.open({
			animation: self.animationsEnabled,
			templateUrl: '/petShop/pages/pet/gato/modalDetalhe.html',
			controller: 'modalDetalheGatoController as ctrl',
			size: size,
			resolve: {
				gato: function () {
					return gato;
				}
			}
		});

		modalInstance.result.then(function (gato) {
			self.gato = gato;
			self.gato.dtNacimento = new Date(self.gato.dtNacimento);
			self.activeTabs = [true, false];
			
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});

appAutenticacao.controller('modalDetalheGatoController', function ($uibModalInstance, $log, gato) {
	var self = this;
	self.gato = gato;

	self.alterar = function () {
		$uibModalInstance.close(self.gato);
	};

	self.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
