/*globals angular*/
module.exports = (function () {
    'use strict';
    angular.module('{{APPNAME}}.repositories', [])
        .factory('userRepository', require('./mocks/userRepository'));
}());