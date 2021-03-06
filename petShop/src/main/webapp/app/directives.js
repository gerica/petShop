petShoepApp.directive('notification', [
		'$timeout', function($timeout) {
			return {
				restrict : 'A',
				controller : [
						'$scope', function($scope) {
							$scope.notification = {
								status : 'hide',
								type : 'success',
								message : 'Welcome! It\'s yet another angular alert ;)'
							};
						}
				],
				link : function(scope, elem, attrs) {
					// watch for changes
					attrs.$observe('notification', function(value) {
						if (value === 'show') {
							// shows alert
							$(elem).show();

							// and after 3secs
							$timeout(function() {
								// hide it
								$(elem).hide();

								// and update the show property
								scope.notification.status = 'hide';
							}, 3000);
						}
					});
				}
			};
		}
]);

petShoepApp.directive('alertaMensagem', function() {
	return {
		restrict : 'EACM',
		replace : true,
		transclude : true,
		scope : {
			'classCss' : '=', // binding strategy
			'descricao' : '=', // binding strategy
			'close' : '&onClose'
		},
		templateUrl : 'pages/alerta.html',
		link : function(scope, elem, attr, ctrl) {
			elem.bind('click', function(e) {
				e.stopPropagation();
			});
		}

	}
});
petShoepApp.directive('navigation', function() {
	return {
		restrict : 'EACM',
		templateUrl : 'petShop/pages/navigation.html',
		replace : true

	}
});

petShoepApp.directive('autoComplete', function(autoCompleteDataService) {
	return {
		restrict : 'A',
		link : function(scope, elem, attr, ctrl) {
			// elem is a jquery lite object if jquery is not present,
			// but with jquery and jquery ui, it will be a full jquery object.
			debugger
			elem.autocomplete({
				source : autoCompleteDataService.getSource(), // from your
				// service
				minLength : 2
			});
		}
	};
});

// Common directive for Focus

petShoepApp.directive('focus', function($timeout) {
	return {
		scope : {
			trigger : '@focus'
		},
		link : function(scope, element) {
			scope.$watch('trigger', function(value) {
				if (value === "true") {
					$timeout(function() {
						element[0].focus();
					});
				}
			});
		}
	};
});


petShoepApp.directive('myAlert', function(){
	return {
		restrict: 'E',
		scope: {
			obj: '='
		},		
		template: '<uib-alert ng-repeat="msg in obj.getMessages()" type="{{msg.type}}" close="obj.removeMessage($index)">' +
        			'{{msg.text}}' + 
        		  '</uib-alert>',
		transclude: true,
		replace: false
	};
});
