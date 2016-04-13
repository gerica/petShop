petShoepApp.controller("vetConsultaController", ['$scope', '$log', 'petShopHttpFacade', function ($scope, $log, petShopHttpFacade) {
    $log.info("Iniciando vetConsultaController");
    var self = this;
    self.pet;
    self.myAlert = new MyAlert();

    self.proximo = function () {
        $scope.vetCtrl.pet = self.pet;
        $scope.vetCtrl.activeTabs = [
            false, true
        ];
    };

    // FUNCIONALIDADE DE CADASTRO
    self.findPetByDsNome = function (val) {
        $log.info("vetConsultaController.findPetByNome() " + val);

        return petShopHttpFacade.findPetByDsNome(val).then(function (response) {
                return response.data;
            }
        );
    };

}]);