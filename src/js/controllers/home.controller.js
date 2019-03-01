'use strict';

manotesControllers.controller('HomeController', ['$scope', 'Auth', 'Redirect', function($scope, Auth, Redirect) {
    if (!Auth.userIsLogged()) {
        Redirect.toLogin();
    }
}]);
