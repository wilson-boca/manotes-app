'use strict';

manotesControllers.controller('LoginController', ['$scope', 'Login', 'Redirect', 'Alert', function($scope, Login, Redirect, Alert) {
    $scope.credentials = {
        username_or_email: '',
        password: ''
    }

    $scope.submit = function() {
        console.log('a');
        Login.save(
            $scope.credentials,
            function(response) {
                Alert.success('a', 'a');
                Redirect.toHome();
            },
            function(error) {
                Alert.success('a', 'a');
            }
        );
    }

}]);
