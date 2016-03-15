appAutenticacao.controller("petController", [
    '$scope', '$uibModal', '$log', 'petShopHttpFacade', function ($scope, $uibModal, $log, petShopHttpFacade) {
        $log.info("Iniciando petController");
        var self = this;
        self.pet;
        self.tipoPet;
        self.tiposPet;
        self.cliente;
        self.racas = [];

        self.pages = {
            "cadastro": "pages/pet/cadastro.html",
            "lista": "pages/pet/lista.html",
        };

        self.alerts = [];
        self.addAlert = function (type, msg) {
            self.alerts.push({
                msg: msg,
                type: type
            });
        };

        self.closeAlert = function (index) {
            self.alerts.splice(index, 1);
        };

        self.findAllTipoPet = function () {
            $log.info("petController.findAllTipoPet()");
            petShopHttpFacade.findAllTipoPet().success(function (data, status, headers, config) {
                self.tiposPet = data;
            }).error(function (data, status, headers, config) {
                $log.error(data, status);
            });
        }
        self.findAllTipoPet();

        self.findCliente = function (val) {
            $log.info("petController.findCliente() " + val);
            console.log(petShopHttpFacade.findCliente(val));
            return petShopHttpFacade.findCliente(val).then(function (response){
                    return response.data.map(function (item) {
                        return {
                            cliente: item,
                            nomeCompleto : item.dsNome + " "+ item.dsSobreNome
                        }
                    })
                }

            );
        }

        self.findRacaByTipo = function (val) {
            $log.info("petController.findRacaByTipo() " + val);
            petShopHttpFacade.findRacaByTipo(val).then(function (response) {
                self.racas = response.data;
            });
            self.pet.raca = null;
        }

        self.salvar = function () {
            self.closeAlert(0);
            if (self.formPet.$valid) {
                self.pet.usuario = $scope.indexCtrl.usuario;
                self.pet.cliente = self.cliente.cliente;
                petShopHttpFacade.incluirPet(self.pet).success(function (data, status, headers, config) {
                    $log.info("Pet inserido.");
                    self.addAlert("success", "Registro cadastrado com sucesso.");
                    self.formPet.$setPristine();
                    self.limparForm(self.pet);

                    // $location.path("/tamplateSite");
                }).error(function (data, status, headers, config) {
                    console.log("erro-----------------");
                    console.log(data, status);
                });
            } else {
                self.addAlert("", "Informe os campos.");

                self.formPet.nome.$setDirty(true);
                self.formPet.dtNacimento.$setDirty(true);
                self.formPet.raca.$setDirty(true);
            }
        };

        self.limparForm = function (cliente) {
            for (var key in cliente) {
                // delete self.cliente[key];
                self.pet = null;
                self.cliente = null;
                self.formPet.$setPristine(true);
            }
        };

        // FUNCIONALIDADES DA LISTA
        self.search;
        self.itemsPerPage = 10;
        self.currentPage = 1;
        self.activeTabs = [
            false, true
        ];
        self.pets = [];

        self.figureOutTodosToDisplay = function (pet, index) {
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

        self.selectObject = function (pet, index) {
            self.selectedIndex = index;
            self.open('lg', pet);
        };

        self.sensitiveSearch = function (pet) {
            if (self.search) {
                return pet.dsNome.toUpperCase().indexOf(self.search.toUpperCase()) == 0;
            }
            return true;
        };

        self.findAllPet = function() {
            $log.info("petController.findAllPet()");
            petShopHttpFacade.findAllPet().success(function(data, status, headers, config) {
                self.pets = data;
            }).error(function(data, status, headers, config) {
                $log.error("erro ao buscar os pets");
            });
        }

        self.findAllPet();
        console.log(self.pets);

        // funcionalidade de modal
        self.open = function (size, pet) {

            var modalInstance = $uibModal.open({
                animation: self.animationsEnabled,
                templateUrl: '/petShop/pages/pet/modalDetalhe.html',
                controller: 'modalDetalhePetController as ctrl',
                size: size,
                resolve: {
                    pet: function () {
                        return pet;
                    }
                }
            });

            modalInstance.result.then(function (objResponse) {
                self.pet = objResponse;
                self.pet.dtNacimento = new Date(self.pet.dtNacimento);
                self.cliente = self.pet.cliente.dsNome + ' '+ self.pet.cliente.dsSobreNome;
                self.activeTabs = [
                    true, false
                ];

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }
]);


appAutenticacao.controller('modalDetalhePetController', ['$uibModalInstance', '$log', 'pet', function ($uibModalInstance, $log, pet) {
    var self = this;
    self.pet = pet;

    self.selecionar = function () {
        $uibModalInstance.close(self.pet);
    };

    self.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
