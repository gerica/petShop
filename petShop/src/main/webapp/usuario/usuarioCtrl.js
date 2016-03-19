petShoepApp.controller("usuarioController", [
    '$scope', '$log', 'petShopHttpFacade', function ($scope, $log, petShopHttpFacade) {
        $log.info("Iniciando usuarioController");
        var self = this;
        self.usuario;
        self.tiposUsuario = [];
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
            petShopHttpFacade.findAllTipoUsuario().success(function (data, status, headers, config) {
                self.tiposUsuario = data;
            }).error(function (data, status, headers, config) {
                $log.error(data, status);
            });
        };
        self.findAllTipoUsuario();

        self.salvar = function () {
        	self.myAlert.removeMessage(0);
            if (self.formUser.$valid) {

                petShopHttpFacade.incluirUsuario(self.usuario).success(function (data, status, headers, config) {
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

        self.logout = function () {
            $log.info("logout");
            $scope.indexCtrl.selectedTemplate = {
                "path": "pages/login.html"
            }
        }
    }
]);
