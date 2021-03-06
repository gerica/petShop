petShoepApp.controller("clienteController", [
    '$rootScope',
    '$uibModal',
    '$log',
    'petShopHttpFacade',
    function ($rootScope, $uibModal, $log, petShopHttpFacade) {
        var self = this;
        self.cliente;

        // FUNCTIONALIDADE DE CADASTRO
        $log.info("Iniciando clienteController");

        self.myAlert = new MyAlert();

        $log.info($rootScope.globals.currentUser);
        self.salvar = function () {
            self.myAlert.removeMessage(0);
            if (self.formCliente.$valid) {
                self.cliente.usuario = $rootScope.globals.currentUser.user;
                //self.cliente.usuario = $scope.indexCtrl.usuario;
                //self.cliente.usuario = sessionService.getUsuario();
                petShopHttpFacade.incluirCliente(self.cliente).success(function (data, status, headers, config) {
                    $log.info("Cliente inserido.");
                    self.myAlert.addMessage("success", "Registro cadastrado com sucesso.");
                    self.formCliente.$setPristine();
                    self.limparForm(self.cliente);

                    // $location.path("/tamplateSite");
                }).error(function (data, status, headers, config) {
                    console.log("erro-----------------");
                    console.log(data, status);
                });
            } else {
                self.myAlert.addMessage("", "Informe os campos.");

                self.formCliente.nome.$setDirty(true);
                self.formCliente.sobreNome.$setDirty(true);
                self.formCliente.dtNacimento.$setDirty(true);
                self.formCliente.email.$setDirty(true);
            }
        };

        self.limparForm = function (cliente) {
            for (var key in cliente) {
                // delete self.cliente[key];
                self.cliente = null;
            }
        };

        // FUNCIONALIDADES DA LISTA
        $log.info("Iniciando listaClienteController");
        self.search;
        self.itemsPerPage = 10;
        self.currentPage = 1;
        self.activeTabs = [
            true, false
        ];

        self.figureOutTodosToDisplay = function (cliente, index) {
            var begin = ((self.currentPage - 1) * self.itemsPerPage);
            var end = begin + self.itemsPerPage;

            if (index >= begin && index < end) {
                return true;
            }
            return false;

        };

        self.pageChanged = function () {
            self.figureOutTodosToDisplay();
        };

        self.selectPerson = function (cliente, index) {
            self.selectedIndex = index;
            self.open('lg', cliente);
        };

        self.sensitiveSearch = function (cliente) {
            if (self.search) {
                return cliente.dsNome.toUpperCase().indexOf(self.search.toUpperCase()) == 0
                    || cliente.dsEmail.toUpperCase().indexOf(self.search.toUpperCase()) == 0;
            }
            return true;
        };

        self.findAllCliente = function () {
            $log.info("parkingHttpFacade.findAllCliente()");
            petShopHttpFacade.findAllCliente().success(function (data, status, headers, config) {
                self.clientes = data;
            }).error(function (data, status, headers, config) {
                console.log("erro-----------------");
                console.log(data, status);
            });
        }

        // funcionalidade de modal
        self.open = function (size, cliente) {

            var modalInstance = $uibModal.open({
                animation: self.animationsEnabled,
                templateUrl: '/petShop/cliente/modalDetalhe.html',
                controller: 'modalDetalheClienteController as ctrl',
                size: size,
                resolve: {
                    cliente: function () {
                        return cliente;
                    }
                }
            });

            modalInstance.result.then(function (clienteResponse) {
                self.cliente = clienteResponse;
                self.cliente.dtNacimento = new Date(self.cliente.dtNacimento);
                self.activeTabs = [
                    true, false
                ];

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        // FUNCIONALIDADES DE PETS
        self.pages = {
            "pets": "cliente/pets.html",
        };

        self.findPetByCliente = function () {
            $log.info("clienteController.findPetByCliente()");
            petShopHttpFacade.findPetByCliente(self.cliente).success(function (data, status, headers, config) {
                self.pets = data;
            }).error(function (data, status, headers, config) {
                console.log("erro-----------------");
                console.log(data, status);
            });

        }

    }
]);

petShoepApp.controller('modalDetalheClienteController', function ($uibModalInstance, $log, cliente) {
    var self = this;
    self.cliente = cliente;

    self.selecionar = function () {
        $uibModalInstance.close(self.cliente);
    };

    self.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
