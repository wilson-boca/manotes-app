'use strict';

manotesControllers.controller('SignupController', ['$scope', function($scope) {
  $scope.user = {
    email: null,
    username: null,
    password: null
  };
}]);
