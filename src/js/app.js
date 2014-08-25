/*globals require, angular, window, FastClick, Messenger*/
(function (window) {
    'use strict';

    require('./shortcuts');

    angular
        .module(
            '{{APPNAME}}',
            [
                'ui.bootstrap',
                'ngCookies',
                'ngResource',
                'ngRoute',
                '{{APPNAME}}.controllers',
                '{{APPNAME}}.directives',
                '{{APPNAME}}.filters',
                '{{APPNAME}}.services',
                '{{APPNAME}}.repositories'
            ]
        )
        .config(require('./config'))
        .run(require('./run'));

    // bootstrap
    window.document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(window.document.body);
        angular.bootstrap(window.document, ['{{APPNAME}}']);
    }, false);

}(window));