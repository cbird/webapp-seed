/*globals angular*/
module.exports = (function () {
    'use strict';

    angular.module('{{APPNAME}}.directives', [])
        .directive('hello', require('./hello'));
}());