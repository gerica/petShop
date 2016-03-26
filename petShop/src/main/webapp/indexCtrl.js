petShoepApp.controller("indexController", [
    '$log', '$http', function ($log, $http) {
        $log.info("Iniciando indexController");
        var self = this;
        self.usuario = null;
        self.selectedTemplate = {
            "path": ""
        };
        if (self.usuario) {
            // Está logado
            self.selectedTemplate.path = "dashboard/tamplateSite.html";
        } else {
            // Não está logado
            self.selectedTemplate.path = "login/login.html";
        }


        self.containsPapel = function (papel) {
            // $log.info("contains papel: " + papel);
            if (self.usuario && self.usuario.tipoUsuario.tipoUsuarioPapels) {
                for (i = 0; i < self.usuario.tipoUsuario.tipoUsuarioPapels.length; i++) {
                    if (self.usuario.tipoUsuario.tipoUsuarioPapels[i].papel.dsPapel == papel) {
                        return true;
                    }
                }
            }
            return false;
        };

        // self.addUserHeader = function() {
        // $http.defaults.headers.common.Authorization = 'Basic ' +
        // self.usuario.dsSenha;
        // }
    }
]);
