petShoepApp.controller("veterinariaCtrl", [
    '$scope', '$log', 'veterinariaService', function ($scope, $log, usuarioService) {
        $log.info("Iniciando veterinariaCtrl");
        var self = this;
        self.pet;

        self.activeTabs = [
            true, false
        ];

        self.pages = {
            "consulta": "veterinaria/consulta/consulta.html",
            "vacina": "veterinaria/vacina/vacina.html",
        };
        
        self.myAlert = new MyAlert();

    }
]);