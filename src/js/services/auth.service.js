
'use strict';

manotesServices.service('Auth',['$cookies', function($cookies){
  this.userToken = null;
  var self = this;

  this.update = function() {
    self.userToken = $cookies.get('userToken');
  };

  this.userIsLogged = function() {
    return self.userToken !== undefined;
  };

  this.logout = function() {
    $cookies.remove('userToken', {path: '/', domain: ''});
  }
}]);
