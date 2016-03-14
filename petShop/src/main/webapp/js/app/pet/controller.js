appAutenticacao.controller("petController", [
		'$scope', '$uibModal', '$log', 'petShopHttpFacade', function($scope, $uibModal, $log, petShopHttpFacade) {
			$log.info("Iniciando petController");
			var self = this;
			self.pet;
			self.tipoPet;
			self.tiposPet;
			self.racas = [];

			self.cadastro = {
				"path" : "pages/pet/cadastro.html",
			}

			self.alerts = [];
			self.addAlert = function(type, msg) {
				self.alerts.push({
					msg : msg,
					type : type
				});
			};

			self.closeAlert = function(index) {
				self.alerts.splice(index, 1);
			};

			self.findAllTipoPet = function() {
				$log.info("petController.findAllTipoPet()");
				petShopHttpFacade.findAllTipoPet().success(function(data, status, headers, config) {
					self.tiposPet = data;
				}).error(function(data, status, headers, config) {
					$log.error(data, status);
				});
			}
			self.findAllTipoPet();

			self.findCliente = function(val) {
				$log.info("petController.findCliente() " + val);
				return petShopHttpFacade.findCliente(val);
			}

			self.findRacaByTipo = function(val) {
				$log.info("petController.findRacaByTipo() " + val);
				petShopHttpFacade.findRacaByTipo(val).then(function(response) {
					self.racas = response.data;
				});
				self.pet.raca = null;
			}

			self.salvar = function() {
				self.closeAlert(0);
				if (self.formPet.$valid) {
					self.pet.usuario = $scope.indexCtrl.usuario;
					petShopHttpFacade.incluirPet(self.pet).success(function(data, status, headers, config) {
						$log.info("Pet inserido.");
						self.addAlert("success", "Registro cadastrado com sucesso.");
						self.formPet.$setPristine();
						self.limparForm(self.pet);

						// $location.path("/tamplateSite");
					}).error(function(data, status, headers, config) {
						console.log("erro-----------------");
						console.log(data, status);
					});
				} else {
					self.addAlert("", "Informe os campos.");

					self.formPet.nome.$setDirty(true);
					self.formPet.dtNacimento.$setDirty(true);
					self.formPet.raca.$setDirty(true);
				}
			};

			self.limparForm = function(cliente) {
				for ( var key in cliente) {
					// delete self.cliente[key];
					self.pet = null;
					self.formPet.$setPristine(true);
				}
			};

		}
]);
