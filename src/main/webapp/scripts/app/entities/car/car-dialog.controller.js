'use strict';

angular.module('jhipstermavenApp').controller('CarDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Car', 'Owner',
        function($scope, $stateParams, $uibModalInstance, entity, Car, Owner) {

        $scope.car = entity;
        $scope.owners = Owner.query();
        $scope.load = function(id) {
            Car.get({id : id}, function(result) {
                $scope.car = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('jhipstermavenApp:carUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.car.id != null) {
                Car.update($scope.car, onSaveSuccess, onSaveError);
            } else {
                Car.save($scope.car, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
