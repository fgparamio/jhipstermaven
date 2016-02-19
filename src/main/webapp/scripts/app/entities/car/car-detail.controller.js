'use strict';

angular.module('jhipstermavenApp')
    .controller('CarDetailController', function ($scope, $rootScope, $stateParams, entity, Car, Owner) {
        $scope.car = entity;
        $scope.load = function (id) {
            Car.get({id: id}, function(result) {
                $scope.car = result;
            });
        };
        var unsubscribe = $rootScope.$on('jhipstermavenApp:carUpdate', function(event, result) {
            $scope.car = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
