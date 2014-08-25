/*globals angular*/
module.exports = (function () {
    'use strict';

    angular.module('{{APPNAME}}.controllers', [])
        .controller('TopNavCtrl', require('./topNavCtrl'))
        .controller('AboutCtrl', require('./aboutCtrl'))
        .controller('ContactCtrl', require('./contactCtrl'))
        .controller('HomeCtrl', require('./homeCtrl'));
}());