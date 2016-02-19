'use strict';

angular.module('jhipstermavenApp')
    .controller('OwnerDetailController', function ($scope, $rootScope, $stateParams, entity, Owner, Car) {
        $scope.owner = entity;
        $scope.load = function (id) {
            Owner.get({id: id}, function(result) {
                $scope.owner = result;
            });
        };
        var unsubscribe = $rootScope.$on('jhipstermavenApp:ownerUpdate', function(event, result) {
            $scope.owner = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
