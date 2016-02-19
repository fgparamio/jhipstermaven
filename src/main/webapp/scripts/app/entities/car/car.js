'use strict';

angular.module('jhipstermavenApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('car', {
                parent: 'entity',
                url: '/cars',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'jhipstermavenApp.car.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/car/cars.html',
                        controller: 'CarController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('car');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('car.detail', {
                parent: 'entity',
                url: '/car/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'jhipstermavenApp.car.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/car/car-detail.html',
                        controller: 'CarDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('car');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Car', function($stateParams, Car) {
                        return Car.get({id : $stateParams.id});
                    }]
                }
            })
            .state('car.new', {
                parent: 'car',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/car/car-dialog.html',
                        controller: 'CarDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    brand: null,
                                    concessionaire: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('car', null, { reload: true });
                    }, function() {
                        $state.go('car');
                    })
                }]
            })
            .state('car.edit', {
                parent: 'car',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/car/car-dialog.html',
                        controller: 'CarDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Car', function(Car) {
                                return Car.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('car', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('car.delete', {
                parent: 'car',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/car/car-delete-dialog.html',
                        controller: 'CarDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Car', function(Car) {
                                return Car.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('car', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
