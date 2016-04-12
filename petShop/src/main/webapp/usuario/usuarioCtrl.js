petShoepApp.controller("usuarioController", [
    '$scope', '$log','$uibModal', 'usuarioService', function ($scope, $log, $uibModal, usuarioService) {
        $log.info("Iniciando usuarioController");
        var self = this;
        self.usuario;
        self.tiposUsuario = [];
        self.tipoUsuario;
        self.activeTabs = [
            true, false
        ];

        self.pages = {
            "cadastro": "usuario/cadastro.html",
            "lista": "usuario/lista.html",
        };
        
        self.myAlert = new MyAlert();

        self.findAllTipoUsuario = function () {
            $log.info("tamplateSiteController.findAllTipoUsuario()");
            usuarioService.findAllTipoUsuario().success(function (data, status, headers, config) {
                self.tiposUsuario = data;
            }).error(function (data, status, headers, config) {
                $log.error(data, status);
            });
        };
        self.findAllTipoUsuario();

        self.salvar = function () {
        	self.myAlert.removeMessage(0);
            if (self.formUser.$valid) {

                usuarioService.incluirUsuario(self.usuario).success(function (data, status, headers, config) {
                    $log.info("Usuario inserido.");
                    self.myAlert.addMessage("success", "Registro cadastrado com sucesso.");
                    self.formUser.$setPristine();
                    self.limparForm(self.usuario);
                }).error(function (data, status, headers, config) {
                    console.log("erro-----------------");
                    console.log(data, status);
                });
            } else {
                self.myAlert.addMessage("", "Informe os campos.");

                self.formUser.nomeUsuario.$setDirty(true);
                self.formUser.emailUsuario.$setDirty(true);
                self.formUser.loginUsuario.$setDirty(true);
                self.formUser.senhaUsuario.$setDirty(true);
            }
        };

        self.limparForm = function (usuario) {
            for (var key in usuario) {
                // delete self.cliente[key];
                self.usuario = null;
                self.formUser.$setPristine(true);
            }
        };

        // FUNCIONALIDADES DA LISTA
        self.search;
        self.itemsPerPage = 10;
        self.currentPage = 1;
        self.activeTabs = [
            false, true
        ];
        self.usuarios = [];

        self.figureOutTodosToDisplay = function(usuario, index) {
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

        self.selectObject = function(usuario, index) {
            self.selectedIndex = index;
            self.open('lg', usuario);
        };

        self.sensitiveSearch = function(usuario) {
            if (self.search) {
                return usuario.dsNome.toUpperCase().search(self.search.toUpperCase()) >= 0
                    || usuario.tipoUsuario.dsTipoUsuario.toUpperCase().search(self.search.toUpperCase()) >= 0;
            }
            return true;
        };

        self.findAllUsuarios = function() {
            $log.info("usuarioController.findAllUsuarios()");
            usuarioService.findAllUsuarios().success(function(data, status, headers, config) {
                self.usuarios= data;
            }).error(function(data, status, headers, config) {
                $log.error("erro ao buscar os usuarios");
            });
        }

        self.findAllUsuarios();

        // funcionalidade de modal
        self.open = function(size, usuario) {

            var modalInstance = $uibModal.open({
                animation : self.animationsEnabled,
                templateUrl : '/petShop/usuario/modalDetalhe.html',
                controller : 'modalDetalheUsuarioController as ctrl',
                size : size,
                resolve : {
                    usuario : function() {
                        return usuario;
                    }
                }
            });

            modalInstance.result.then(function(objResponse) {
                self.usuario = objResponse;

                /*self.tipoUsuario = {
                    cliente : self.pet.cliente,
                    nomeCompleto : self.pet.cliente.dsNome + ' ' + self.pet.cliente.dsSobreNome,
                };*/

                self.activeTabs = [
                    true, false
                ];

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
]);


petShoepApp.controller('modalDetalheUsuarioController', [
    '$uibModalInstance', '$log', 'usuario', function($uibModalInstance, $log, usuario) {
        var self = this;
        self.usuario = usuario;

        self.selecionar = function() {
            $uibModalInstance.close(self.usuario);
        };

        self.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
]);