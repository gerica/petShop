appAutenticacao.directive('notification', [
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

/*
 * <div class="alert alert-{{notification.type}}" style="display: none;"
 * role="alert"
 * data-notification="{{notification.status}}">{{notification.message}} </div>
 * <button id="submit" name="submit" class="btn btn-default" type="submit"
 * ng-click="notification.status = 'show'; notification.message = 'Oh yeah!';
 * notification.type = 'info';"> Show </button>
 */

appAutenticacao.directive('myDirective', function() {
	return {
		restrict : 'EACM',
		replace : true,
		scope : {
			classCss : '=', // binding strategy
			descricao : '=', // binding strategy
			close : '&'
		},
		templateUrl : 'petShop/pages/alerta.html'
			
	}
});
appAutenticacao.directive('navigation', function() {
	return {
		restrict : 'EACM',
		templateUrl : 'petShop/pages/navigation.html',
		replace : true

	}
});