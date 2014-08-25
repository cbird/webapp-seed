/*globals window, angular*/
module.exports = [function () {
    'use strict';

    var self = {},
        shouldProceed = function (map) {
            var k;
            for (k in map) {
                if (map.hasOwnProperty(k) && (map[k] === undefined || map[k] === null)) {
                    return false;
                }
            }
            if (!window.localStorage) {
                console.error('Local storage is not supported!');
            }
            if (!window.sessionStorage) {
                console.error('Session storage is not supported!');
            }
            if (!window.sessionStorage && !window.localStorage) {
                return false;
            }
            return true;
        };

    self.save = function (name, data, persist) {
        if (!shouldProceed({name: name, data: data})) {
            return;
        }
        if (persist && window.localStorage) {
            window.localStorage.setItem(name, (typeof data === 'object') ? angular.toJson(data) : data);
        }
        if (window.sessionStorage) {
            window.sessionStorage.setItem(name, (typeof data === 'object') ? angular.toJson(data) : data);
        }
    };
    self.load = function (name) {
        if (!shouldProceed({name: name})) {
            return;
        }
        var data;
        if (window.sessionStorage) {
            data = window.sessionStorage.getItem(name);
        }
        if (!data && window.localStorage) {
            data = window.localStorage.getItem(name);
        }
        if (data) {
            try {
                data = JSON.parse(data);
            } catch (e) {
                console.error('Error when parsing json', e);
            }
        }
        return data;
    };
    self.remove = function (name) {
        if (!shouldProceed({name: name})) {
            return;
        }
        if (window.sessionStorage) {
            window.sessionStorage.removeItem(name);
        }
        if (window.localStorage) {
            window.localStorage.removeItem(name);
        }
    };

    return self;
}];