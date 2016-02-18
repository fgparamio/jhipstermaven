 'use strict';

angular.module('jhipstermavenApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-jhipstermavenApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-jhipstermavenApp-params')});
                }
                return response;
            }
        };
    });
