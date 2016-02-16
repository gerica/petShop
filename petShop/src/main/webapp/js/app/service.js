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
				return item;
//				{
//					cliente : item,
//					nomeCompleto : item.nome + " " + item.sobreNome
//				};
			});
		});
	};

	var _findAllRaca = function(val) {
		return $http.get("/petShop/rest/petShopRest/findAllRaca").then(function(response) {
			return response;
		});
	};

	var _incluirCachorro = function(cliente) {
		return $http.post("/petShop/rest/cachorroRest/incluir", cliente);
	};

	var _findAllCachorro = function() {
		return $http.get("/petShop/rest/cachorroRest/findAllCachorro", {
			cache : false
		});
	};

	return {
		login : _login,
		incluirCliente : _incluirCliente,
		findAllCliente : _findAllCliente,
		findCliente : _findCliente,
		findAllRaca : _findAllRaca,
		incluirCachorro : _incluirCachorro,
		findAllCachorro : _findAllCachorro,
	};
});