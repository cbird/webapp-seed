/*globals angular*/
module.exports = (function () {
    'use strict';
    angular.module('{{APPNAME}}.services', [])
        .factory('storageService', require('./storageService'))
        .factory('repositoryService', require('./repositoryService'))
        .factory('userService', require('./userService'));
}());