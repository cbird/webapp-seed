/*global angular*/
module.exports = ['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    'use strict';

    $routeProvider.when('/',
        {
            templateUrl: '/partials/home.html',
            controller: 'HomeCtrl'
        });

    $routeProvider.when('/about',
        {
            templateUrl: '/partials/about.html',
            controller: 'AboutCtrl'
        });

    $routeProvider.when('/contact',
        {
            templateUrl: '/partials/contact.html',
            controller: 'ContactCtrl'
        });

    //all other routes redirects to /
    $routeProvider.otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true).hashPrefix('!');
}];
