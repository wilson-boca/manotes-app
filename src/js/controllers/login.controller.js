'use strict';

manotesControllers.controller('LoginController', ['$scope', 'Login', 'Redirect', 'Alert', 'Messages', function($scope, Login, Redirect, Alert, Messages) {
  $scope.credentials = {
    username_or_email: '',
    password: ''
  }

  $scope.submit = function() {
    Login.save(
  	  $scope.credentials,
      function(response) {
        Redirect.toHome();
      },
      function(error) {
        var message = Messages.interpret(error.data);
        Alert.success('Ops', message);
      }
    );
  }

}]);
