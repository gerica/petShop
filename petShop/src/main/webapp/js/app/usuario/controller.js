appAutenticacao.controller("usuarioController", [
    '$scope', '$log', 'petShopHttpFacade', 'alertService', function ($scope, $log, petShopHttpFacade, alertService) {
        $log.info("Iniciando usuarioController");
        var self = this;
        self.usuario;
        self.tiposUsuario = [];
        self.activeTabs = [
            true, false
        ];

        self.pages = {
            "cadastro": "pages/usuario/cadastro.html",
            "lista": "pages/usuario/lista.html",
        };

		self.addAlert = function(type, msg) {
			alertService.alert.addAlert(type, msg);
		};
		
		self.closeAlert = function(index) {
			alertService.closeAlert(index, 1);
		};

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
            self.closeAlert(0);
            if (self.formUser.$valid) {

                petShopHttpFacade.incluirUsuario(self.usuario).success(function (data, status, headers, config) {
                    $log.info("Usuario inserido.");
                    self.addAlert("success", "Registro cadastrado com sucesso.");
                    self.formUser.$setPristine();
                    self.limparForm(self.usuario);
                }).error(function (data, status, headers, config) {
                    console.log("erro-----------------");
                    console.log(data, status);
                });
            } else {
                self.addAlert("", "Informe os campos.");

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
