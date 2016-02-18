'use strict';

angular.module('jhipstermavenApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


