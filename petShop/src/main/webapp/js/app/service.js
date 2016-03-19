appAutenticacao.factory("petShopHttpFacade", function ($http) {
    var _login = function (userLogin) {
        // $http.defaults.headers.common.Authorization = userLogin.dsLogin + '@'
        // + userLogin.dsSenha;
        return $http.post("/petShop/rest/loginRest/login", userLogin);
    };

    var _incluirCliente = function (cliente) {
        return $http.post("/petShop/rest/clienteRest/incluir", cliente);
    };

    var _findAllCliente = function () {
        return $http.get("/petShop/rest/clienteRest/findAllCliente", {
            cache: false
        });
    };

    var _findCliente = function (val) {
        return $http.get("/petShop/rest/clienteRest/findByValor", {
            params: {
                valor: val,
            }
        });
    };

    var _findRacaByTipo = function (val) {
        return $http.get("/petShop/rest/petShopRest/findRacaByTipo", {
            params: {
                valor: val.idTipoPet,
            }
        }).then(function (response) {
            return response;
        });
    };

    var _findAllTipoPet = function () {
        return $http.get("/petShop/rest/petShopRest/findAllTipoPet");
    };

    var _incluirPet = function (pet) {
        return $http.post("/petShop/rest/petRest/incluir", pet);
    }

    var _findAllPet = function () {
        return $http.get("/petShop/rest/petRest/findAll", {
            cache: false
        });
    };

    var _findPetByCliente = function (val) {
        return $http.get("/petShop/rest/petRest/findPetByCliente", {
            params: {
                valor: val.idCliente,
            }
        });
    };

    var _findPetByDsNome = function (val) {
        return $http.get("/petShop/rest/petRest/findPetByDsNome", {
            params: {
                valor: val,
            }
        });
    };

    var _findAllTipoUsuario = function () {
        return $http.get("/petShop/rest/petShopRest/findAllTipoUsuario");
    };

    var _incluirUsuario = function (usuario) {
        return $http.post("/petShop/rest/usuarioRest/incluir", usuario);
    }

    return {
        login: _login,
        incluirCliente: _incluirCliente,
        findAllCliente: _findAllCliente,
        findCliente: _findCliente,
        findAllTipoPet: _findAllTipoPet,
        findRacaByTipo: _findRacaByTipo,
        incluirPet: _incluirPet,
        findAllPet: _findAllPet,
        findPetByCliente: _findPetByCliente,
        findPetByDsNome: _findPetByDsNome,
        findAllTipoUsuario: _findAllTipoUsuario,
        incluirUsuario: _incluirUsuario,
    };
});