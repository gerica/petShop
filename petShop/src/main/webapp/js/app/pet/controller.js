appAutenticacao.controller("petController", function ($uibModalInstance, $log, autencicacaoHttpFacade) {
    $log.info("Iniciando petController");
    var self = this;
    self.tipoPet;

    self.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
