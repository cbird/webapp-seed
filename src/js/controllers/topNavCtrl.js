module.exports = ['$scope', '$location', function ($scope, $location) {
    'use strict';

    //*** Functions *****************

    $scope.matchesPath = function (path) {
        return $location.$$path === path;
    };

    //*** Listeners *****************

    //todo
}];