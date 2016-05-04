'use strict';

var DemoApp = angular.module('DemoApp', ['ui.router', 'ngResource', 'ui.select2', 'ui.bootstrap', 'restangular']).
    config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
        $stateProvider
            .state('Home', {
                url: "/",
                templateUrl: "/Partials/home.html"
            }).state('Customers', {
                url: "/customers",
                abstract: true,
                template: "<div ui-view></div>"
            }).state('Customers.default', {
                url: "",
                templateUrl: "/Partials/customers.html",
                controller: 'CustomerController',
                controllerAs: 'vm'
            }).state('Customers.new', {
                url: "/new",
                templateUrl: "/Partials/customer-detail.html",
                controller: 'CustomerDetailsController',
                controllerAs: 'vm'
            }).state('Customers.details', {
                url: "/{id}",
                templateUrl: "/Partials/customer-detail.html",
                controller: 'CustomerDetailsController',
                controllerAs: 'vm'
            });


        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);

DemoApp.run(['$rootScope', '$state', function ($rootScope, $state) {
  
}]);

DemoApp.controller("CustomerController", ['$scope', '$resource', '$location', function ($scope, $resource, $location) {

    var Product = $resource('/api/customers/:id', {}, {
        GET: { method: 'GET', params: { id: '@id' } },
        DELETE: { method: 'DELETE', params: { id: '@id' } },
        PUT: { method: 'PUT', params: { id: '@Id' } }
    });

    var vm = this;

    Product.GET(function (data) {
        vm.customers = data;
        console.log(data);
    });

    vm.showcustomerInDetail = function (customer) {
        console.log(customer);
        $location.path('customers/' + customer.Id);
        //console.log(product);
    };


}]);

DemoApp.controller("CustomerDetailsController", ['$scope', '$resource', '$stateParams', '$state', '$location', function ($scope, $resource, $stateParams, $state, $location) {

    this.$state = $state;

    console.log($state);

    var Customer = $resource('/api/customers/:id', {}, {
        GET: { method: 'GET', params: { id: '@id' } },
        DELETE: { method: 'DELETE', params: { id: '@id' } },
        PUT: { method: 'PUT', params: { id: '@Id' } },
        POST: { method: 'POST' }
    });

    var vm = this;

    if( typeof $stateParams.id !== "undefined")
        Customer.GET({ id: $stateParams.id }, function (data) {
        vm.customerDetail = data;
        console.log(data);
    });

    vm.addNew = function (customer) {
        Customer.POST(customer, function () {
            vm.loadCustomerList();
        });
    }

    vm.loadCustomerList = function () {
        $location.path("/customers");
    };



}]);