appAutenticacao.controller("clienteController", function($uibModal, $log, autencicacaoHttpFacade) {
	var self = this;
	
	// FUNCIONALIDADE DA TAB
	self.tab = 'first';
	self.openTab = function (tab) {
        self.tab = tab;
    };
	
	// FUNCTIONALIDADE DE CADASTRO
	$log.info("Iniciando clienteController");
	
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

	self.salvar = function() {
		self.closeAlert(0);
		if (self.formCliente.$valid) {
			autencicacaoHttpFacade.incluirCliente(self.cliente).success(function(data, status, headers, config) {
				$log.info("Cliente inserido.");
				self.addAlert("success", "Registro cadastrado com sucesso.");
				self.formCliente.$setPristine();
				self.limparForm(self.cliente);

				// $location.path("/tamplateSite");
			}).error(function(data, status, headers, config) {
				console.log("erro-----------------");
				console.log(data, status);
			});
		} else {
			self.addAlert("", "Informe os campos.");

			self.formCliente.nome.$setDirty(true);
			self.formCliente.sobreNome.$setDirty(true);
			self.formCliente.dtNacimento.$setDirty(true);
			self.formCliente.email.$setDirty(true);
		}
	};
	self.limparForm = function(cliente) {
		for ( var key in cliente) {
			delete self.cliente[key];
		}
	};

	// FUNCIONALIDADES DA LISTA
	$log.info("Iniciando listaClienteController");
	self.search;
	self.itemsPerPage = 10;
	self.currentPage = 1;
	self.clientes=[];

	self.figureOutTodosToDisplay = function(cliente, index) {
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

	self.selectPerson = function(cliente, index) {
		self.selectedIndex = index;
		self.selectedCliente = cliente;
	};

	self.sensitiveSearch = function(cliente) {
		if (self.search) {
			return cliente.nome.toUpperCase().indexOf(self.search.toUpperCase()) == 0
					|| cliente.sobreNome.toUpperCase().indexOf(self.search.toUpperCase()) == 0
					|| cliente.email.toUpperCase().indexOf(self.search.toUpperCase()) == 0;
		}
		return true;
	};

	self.findAllCliente = function() {
		$log.info("parkingHttpFacade.findAllCliente()");
		autencicacaoHttpFacade.findAllCliente().success(function(data, status, headers, config) {
			self.clientes = data;
		}).error(function(data, status, headers, config) {
			console.log("erro-----------------");
			console.log(data, status);
		});
		self.openTab('second');
	}
});
