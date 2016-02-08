appAutenticacao.factory("autencicacaoHttpFacade", function($http) {
	var _login = function(userLogin) {
		return $http.post("/petShop/rest/loginRest/login", userLogin);
	};
	var _incluirCliente = function(cliente) {
		return $http.post("/petShop/rest/clienteRest/incluir", cliente);
	};

	return {
		login : _login,
		incluirCliente : _incluirCliente
	};
});