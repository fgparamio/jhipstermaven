'use strict';

angular.module('jhipstermavenApp')
    .controller('CarController', function ($scope, $state, Car) {

        $scope.cars = [];
        $scope.loadAll = function() {
            Car.query(function(result) {
               $scope.cars = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.car = {
                brand: null,
                concessionaire: null,
                id: null
            };
        };
    });
