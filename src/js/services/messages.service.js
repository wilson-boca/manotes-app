'use strict';

manotesServices.service('Messages', function($q) {
  this.interpret = function(message) {
    if (message.result === 'login-not-authorized') {
      return 'Incorrect password.';
    }
    if (message.result === 'user-from-login-not-found') {
      return 'The email or user does not exists';
    }
    if (message.result === 'unexpected-login-error') {
      return 'Something went wrong. Try again later';
    }
  }
});