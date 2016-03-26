petShoepApp.controller("tamplateSiteController", [
    '$scope', '$log', 'petShopHttpFacade', function ($scope, $log, petShopHttpFacade) {
        $log.info("Iniciando tamplateSiteController");
        var self = this;
        self.selectedTemplate = {
            "path": "dashboard/dashboard.html"
        };

        self.logout = function () {
            $log.info("logout");
            petShopHttpFacade.logout().success(function (data, status, headers, config) {
                $log.info("Logout com sucesso.");

                $scope.indexCtrl.selectedTemplate = {
                    "path": "login/login.html"
                }
            }).error(function (data, status, headers, config) {
                console.log("erro-----------------");
                console.log(data, status);
            });
        }
    }
]);
