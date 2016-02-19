'use strict';

angular.module('jhipstermavenApp')
	.controller('OwnerDeleteController', function($scope, $uibModalInstance, entity, Owner) {

        $scope.owner = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Owner.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
