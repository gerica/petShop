petShoepApp.controller("tamplateSiteController", [
    '$scope', '$log', '$state', 'AuthenticationService', function ($scope, $log, $state, AuthenticationService) {
        $log.info("Iniciando tamplateSiteController");
        var self = this;

        self.isAuthenticate = function(){
            return AuthenticationService.isLoggedIn();
        }

        self.logout = function () {
            $log.info("logout");
            AuthenticationService.logout().success(function (data, status, headers, config) {
                AuthenticationService.isLoggedIn();
                $log.info("Logout com sucesso.");
                AuthenticationService.setLoggedIn(false);
                $state.go('login');

            }).error(function (data, status, headers, config) {
                console.log("erro-----------------");
                console.log(data, status);
            });
        }
    }
]);
