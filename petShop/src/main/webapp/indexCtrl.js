petShoepApp.controller("indexController", [
    '$log', '$http', function ($log, $http) {
        $log.info("Iniciando indexController");
        var self = this;

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
