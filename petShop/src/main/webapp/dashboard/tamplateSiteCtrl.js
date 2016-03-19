petShoepApp.controller("tamplateSiteController", [
		'$scope', '$log', function($scope, $log) {
			$log.info("Iniciando tamplateSiteController");
			var self = this;
			self.selectedTemplate = {
				"path" : "dashboard/dashboard.html"
			};

			self.logout = function() {
				$log.info("logout");
				$scope.indexCtrl.selectedTemplate = {
					"path" : "login/login.html"
				}
			}
		}
]);
