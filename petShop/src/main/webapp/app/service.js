petShoepApp.factory("petShopHttpFacade", [
		'$http', function($http) {

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
				});
			};

			var _findRacaByTipo = function(val) {
				return $http.get("/petShop/rest/petShopRest/findRacaByTipo", {
					params : {
						valor : val.idTipoPet,
					}
				}).then(function(response) {
					return response;
				});
			};

			var _findAllTipoPet = function() {
				return $http.get("/petShop/rest/petShopRest/findAllTipoPet");
			};

			var _incluirPet = function(pet) {
				return $http.post("/petShop/rest/petRest/incluir", pet);
			}

			var _findAllPet = function() {
				return $http.get("/petShop/rest/petRest/findAll", {
					cache : false
				});
			};

			var _findPetByCliente = function(val) {
				return $http.get("/petShop/rest/petRest/findPetByCliente", {
					params : {
						valor : val.idCliente,
					}
				});
			};

			var _findPetByDsNome = function(val) {
				return $http.get("/petShop/rest/petRest/findPetByDsNome", {
					params : {
						valor : val,
					}
				});
			};

			var _findAllTipoUsuario = function() {
				return $http.get("/petShop/rest/petShopRest/findAllTipoUsuario");
			};

			var _incluirUsuario = function(usuario) {
				return $http.post("/petShop/rest/usuarioRest/incluir", usuario);
			};

			return {
				incluirCliente : _incluirCliente,
				findAllCliente : _findAllCliente,
				findCliente : _findCliente,
				findAllTipoPet : _findAllTipoPet,
				findRacaByTipo : _findRacaByTipo,
				incluirPet : _incluirPet,
				findAllPet : _findAllPet,
				findPetByCliente : _findPetByCliente,
				findPetByDsNome : _findPetByDsNome,
				findAllTipoUsuario : _findAllTipoUsuario,
				incluirUsuario : _incluirUsuario,
			};
		}
]);

petShoepApp.factory('AuthenticationService', [
		'Base64', '$http', '$rootScope', '$timeout', '$log', '$state', 'Messages',
		function(Base64, $http, $rootScope, $timeout, $log, $state, Messages) {

			var isLoggedIn = false;

			var _isLoggedIn = function() {
				return isLoggedIn;
			};

			var _setLoggedIn = function(value) {
				isLoggedIn = value;
			};

			var _login = function(userLogin) {
				return $http.post("/petShop/rest/loginRest/login", userLogin);
			};

			var _logout = function() {
				return $http.post("/petShop/rest/loginRest/logout");
			}
			var _sessionAtivada = function() {
				$http.get("/petShop/rest/loginRest/sessionAtivada", {
					cache : false
				}).success(function(data) {
					isLoggedIn = true;
				}).error(function(data) {
					isLoggedIn = false;
                    Messages.addMessage("A sessão expirou!");
					$state.go('login');

				});
			}

			/*
			 * var _login = function (usuario) { $timeout(function () { return
			 * _urlLogin(usuario); }, 1000); };
			 */
			var _setCredentials = function(usuario) {
				var authdata = Base64.encode(usuario.dsLogin + ':' + usuario.dsSenha);

				$rootScope.globals = {
					currentUser : {
						user : usuario,
						authdata : authdata
					}
				};

				_setLoggedIn(true);
				$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint
				// ignore:line

			};

			var _clearCredentials = function() {
				$rootScope.globals = {};
				$http.defaults.headers.common.Authorization = 'Basic ';
			};

			return {
				login : _login,
				logout : _logout,
				setCredentials : _setCredentials,
				clearCredentials : _clearCredentials,
				isLoggedIn : _isLoggedIn,
				setLoggedIn : _setLoggedIn,
				sessionAtivada : _sessionAtivada
			};
		}
]);

petShoepApp.factory('Base64', function() {
	/* jshint ignore:start */

	var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	return {
		encode : function(input) {
			var output = "";
			var chr1, chr2, chr3 = "";
			var enc1, enc2, enc3, enc4 = "";
			var i = 0;

			do {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);

				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;

				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}

				output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
				chr1 = chr2 = chr3 = "";
				enc1 = enc2 = enc3 = enc4 = "";
			} while (i < input.length);

			return output;
		},

		decode : function(input) {
			var output = "";
			var chr1, chr2, chr3 = "";
			var enc1, enc2, enc3, enc4 = "";
			var i = 0;

			// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
			var base64test = /[^A-Za-z0-9\+\/\=]/g;
			if (base64test.exec(input)) {
				window.alert("There were invalid base64 characters in the input text.\n"
						+ "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" + "Expect errors in decoding.");
			}
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			do {
				enc1 = keyStr.indexOf(input.charAt(i++));
				enc2 = keyStr.indexOf(input.charAt(i++));
				enc3 = keyStr.indexOf(input.charAt(i++));
				enc4 = keyStr.indexOf(input.charAt(i++));

				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;

				output = output + String.fromCharCode(chr1);

				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}

				chr1 = chr2 = chr3 = "";
				enc1 = enc2 = enc3 = enc4 = "";

			} while (i < input.length);

			return output;
		}
	};

	/* jshint ignore:end */
});

petShoepApp.factory('Messages', [
	function() {
		var _messages = [];

		var _addMessage = function(text) {
			_messages.push({
				text : text
			});
		};
		var _removeMessage = function(ind) {
			_messages.splice(ind, 1);
		};

		var _getMessages = function() {
			return _messages;
		};

		var _getMessage = function(i) {
			return _messages[i];
		};

		return {
			addMessage : _addMessage,
			removeMessage : _removeMessage,
			getMessages : _getMessages,
			getMessage : _getMessage,
		};

	}
]);