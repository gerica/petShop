petShoepApp.controller("loginController", [
    '$scope', '$log', 'petShopHttpFacade', function ($scope, $log, petShopHttpFacade) {
        $log.info("Iniciando loginController");
        var self = this;
        self.usuario;
        
        self.myAlert = new MyAlert();        

        // Binding the park function to the scope
        self.logar = function () {
        	self.myAlert.removeMessage(0);

            if (self.formLogin.$valid) {
                petShopHttpFacade.login(self.usuario).success(function (data, status, headers, config) {
                    $log.info("Login com sucesso.");

                    $scope.indexCtrl.selectedTemplate = {
                        "path": "dashboard/tamplateSite.html"
                    }
                    $scope.indexCtrl.usuario = data;
//						$scope.indexCtrl.addUserHeader();

                }).error(function (data, status, headers, config) {
                    switch (status) {
                        case 400:
                        {
                        	self.myAlert.addMessage("", data.description);
                            break;
                        }
                    }
                });
            } else {
            	self.myAlert.addMessage("", "Informe o email é a senha.");

                self.formLogin.login.$setDirty(true);
                self.formLogin.senha.$setDirty(true);

            }
        };

        function validarForm(userLogin) {
            $log.info(userLogin);
            if (typeof userLogin === 'undefined') {
                $scope.showAlert = true;
                $scope.classCssValor = "alert alert-danger";
                $scope.alertMessage = "Informe o email e a senha."
                return false;
            } else if (typeof userLogin.email === 'undefined') {
                $scope.showAlert = true;
                $scope.classCssValor = "alert alert-danger";
                $scope.alertMessage = "Informe o email."
                return false;
            } else if (typeof userLogin.senha === 'undefined') {
                $scope.showAlert = true;
                $scope.classCssValor = "alert alert-danger";
                $scope.alertMessage = "Informe a senha."
                return false;
            }
            return true;

        }

    }
]);