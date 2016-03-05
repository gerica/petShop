appAutenticacao.controller("vetConsultaController", function ($uibModal, $log, autencicacaoHttpFacade) {
    $log.info("Iniciando vetConsultaController");
    var self = this;
    self.cachorro;

    // FUNCIONALIDADE DA TAB
    self.tab = 'first';
    self.openTab = function (tab) {
        self.tab = tab;
    };

    // funcionalidade de modal
    self.open = function (size, cachorro) {

        var modalInstance = $uibModal.open({
            animation: self.animationsEnabled,
            templateUrl: '/petShop/pages/pet/formModal.html',
            controller: 'petController as ctrl',
            size: size,
            resolve: {
                cachorro: function () {
                    return cachorro;
                }
            }
        });

        modalInstance.result.then(function (cachorro) {
            self.cachorro= cachorro;

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});