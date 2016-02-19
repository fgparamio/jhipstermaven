'use strict';

angular.module('jhipstermavenApp')
	.controller('CarDeleteController', function($scope, $uibModalInstance, entity, Car) {

        $scope.car = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Car.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
