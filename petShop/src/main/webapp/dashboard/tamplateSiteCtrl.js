petShoepApp.controller("tamplateSiteController", [
    '$scope', '$log', '$state', 'AuthenticationService', function ($scope, $log, $state, AuthenticationService) {
        $log.info("Iniciando tamplateSiteController");
        var self = this;

        self.isAuthenticate = function(){
            return AuthenticationService.isLoggedIn();
        }
    }
]);
