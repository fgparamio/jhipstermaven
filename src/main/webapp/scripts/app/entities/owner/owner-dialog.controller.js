'use strict';

angular.module('jhipstermavenApp').controller('OwnerDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Owner', 'Car',
        function($scope, $stateParams, $uibModalInstance, entity, Owner, Car) {

        $scope.owner = entity;
        $scope.cars = Car.query();
        $scope.load = function(id) {
            Owner.get({id : id}, function(result) {
                $scope.owner = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('jhipstermavenApp:ownerUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.owner.id != null) {
                Owner.update($scope.owner, onSaveSuccess, onSaveError);
            } else {
                Owner.save($scope.owner, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
