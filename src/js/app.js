'use strict';

var format = function(str, data) {
  return str.replace(/{([^{}]+)}/g, function(match, val) {
    var prop = data;
    val.split('.').forEach(function(key) {
      prop = prop[key];
    });

    return prop;
  });
};

String.prototype.format = function(data) {
  return format(this, data);
};

String.prototype.encodedURI = function() {
  return this.replace(' ', '+');
};

String.prototype.slugify = function() {
  function dasherize(str) {
    return str.trim().replace(/[-_\s]+/g, '-').toLowerCase();
  }

  function clearSpecial(str) {
    var from  = 'ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž',
      to    = 'aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz';
    to = to.split('');
    return str.replace(/.{1}/g, function(c){
      var index = from.indexOf(c);
      return index === -1 ? c : to[index];
    });
  }

  return clearSpecial(dasherize(this));
};

Number.prototype.paddingLeft = function(size, char) {
  if (!char) {
    char = '0'
  }
  var length = this.toString().length;
  if (length >= size) {
    return this.toString();
  }
  var result = [];
  for (var i = length; i < size; i++) {
    result.push(char);
  }
  return result.join('') + this.toString();
};

Number.prototype.formataDecimal = function(isCurrency) {
  if (isCurrency === undefined) {
    isCurrency = false;
  }
  return '{0}{1}'.format([(isCurrency ? 'R$ ' : ''), this.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')]);
};

var manotesControllers  = angular.module('manotes.controllers', []);
var manotesServices  = angular.module('manotes.services', []);
var manotesFactories  = angular.module('manotes.factories', []);
var manotesResources  = angular.module('manotes.resources', []);
var manotesDirectives  = angular.module('manotes.directives', []);
var manotesFilters = angular.module('manotes.filters', []);

var manotes = angular.module(
  'manotes', [
    'ngResource',
    'ngAnimate',
    'ui.router',
    'ngCookies',
    '19degrees.ngSweetAlert2',
    'manotes.controllers',
    'manotes.services',
    'manotes.factories',
    'manotes.resources',
    'manotes.directives',
    'manotes.filters'
  ]
);

manotes.constant('appConfig', {
  backendURL: '@@backendURL',
  appURL: '@@appURL',
  env: '@@env'
});

var TEMPLATE_FOLDER = 'templates';

manotes.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {
  moment.locale('pt-BR');

  $stateProvider
    .state({
      name: 'home',
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'HomeController'
    });

  $stateProvider
    .state({
      name: 'login',
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController'
    });

  $stateProvider
    .state({
      name: 'signup',
      url: '/signup',
      templateUrl: '/templates/signup.html',
      controller: 'SignupController'
    });

  $urlRouterProvider.when('', '/home');
}]);

manotes.run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {
  $rootScope.TEMPLATE_FOLDER = TEMPLATE_FOLDER;
  Auth.update();
}]);
