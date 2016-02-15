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

	var _findCliente = function(val) {
		return $http.get("/petShop/rest/clienteRest/findByValor", {
			params : {
				valor : val,
			}
		}).then(function(response) {
			return response.data.map(function(item) {
				return {
					cliente : item,
					nomeCompleto : item.nome + " " + item.sobreNome
				};
			});
		});
	};

	var _findAllRaca = function(val) {
		return $http.get("/petShop/rest/petShopRest/findAllRaca").then(function(response) {
			return response;
		});
	};

	return {
		login : _login,
		incluirCliente : _incluirCliente,
		findAllCliente : _findAllCliente,
		findCliente : _findCliente,
		findAllRaca : _findAllRaca,
	};
});