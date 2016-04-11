petShoepApp.factory("usuarioService", [
    '$http', function ($http) {

        var _findAllTipoUsuario = function () {
            return $http.get("/petShop/rest/petShopRest/findAllTipoUsuario");
        };

        var _findAllUsuarios = function () {
            return $http.get("/petShop/rest/usuarioRest/findAllUsuario");
        };

        var _incluirUsuario = function (usuario) {
            return $http.post("/petShop/rest/usuarioRest/incluir", usuario);
        };

        return {
            findAllTipoUsuario: _findAllTipoUsuario,
            incluirUsuario: _incluirUsuario,
            findAllUsuarios: _findAllUsuarios
        };
    }
]);