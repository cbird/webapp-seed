module.exports = function () {
    'use strict';

    return {
        restrict: 'E',
        scope: {
            ngModel: '='
        },
        templateUrl: 'partials/directives/hello.html',
        replace: true
    };
};