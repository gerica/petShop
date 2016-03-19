petShoepApp.controller("vetConsultaController", function ($uibModal, $log, petShopHttpFacade) {
    $log.info("Iniciando vetConsultaController");
    var self = this;
    self.pet;

    // FUNCIONALIDADE DE CADASTRO
    self.findPetByDsNome = function (val) {
        $log.info("vetConsultaController.findPetByNome() " + val);

        return petShopHttpFacade.findPetByDsNome(val).then(function (response) {
                return response.data;
            }
        );
    }

    // funcionalidade de modal
    self.open = function (size) {
console.log(size);
        var modalInstance = $uibModal.open({
            animation: self.animationsEnabled,
            templateUrl: '/petShop/pages/pet/cadastro.html',
            controller: 'petController as petCtrl',
            size: size,
            resolve: {
                petShopModal: function () {
                    return {
                        isModal: true
                    };
                }
            }
        });

        modalInstance.result.then(function (cachorro) {
            self.cachorro = cachorro;

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});