'use strict';

manotesResources.factory('Login', ['$resource', '$rootScope','appConfig', function ($resource, $rootScope, appConfig) {
  return $resource('{0}/api/login'.format([appConfig.backendURL]),
    null,
    {update: {method: 'PUT'}});
}]);