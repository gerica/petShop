appAutenticacao.factory("autencicacaoHttpFacade", function($http) {
	var _login = function(userLogin) {
		return $http.post("/petShop/rest/loginRest/login", userLogin);
	};
	var _incluirCliente = function(cliente) {
		return $http.post("/petShop/rest/clienteRest/incluir", cliente);
	};
	var _findAllCliente = function() {
		return $http.get("/petShop/rest/clienteRest/findAllCliente", {
			cache : false
		});
	};

	return {
		login : _login,
		incluirCliente : _incluirCliente,
		findAllCliente : _findAllCliente
	};
});