'use strict';

manotesServices.service('Redirect', ['$window', function ($window) {
  this.toHome = function() {
    $window.location.href = '/#!/home';
  };
  this.toLogin = function() {
    $window.location.href = '/#!/login';
  };
}]);