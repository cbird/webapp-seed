module.exports = ['$rootScope', function ($rootScope) {
    'use strict';

    var self = {};

    self.withFunction = function (repositoryFunction) {
        self.func = repositoryFunction;
        return self;
    };
    self.regular = function (params, callback, skipBroadcast) {
        var errors, i;
        if (!self.func) {
            errors = errors || [];
            errors.push(new Error('No repository function found'));
        }
        if (!params.tag) {
            errors = errors || [];
            errors.push(new Error('Missing argument params.tag'));
        }
        if (errors) {
            for (i = 0; i < errors.length; i += 1) {
                console.error(errors[i].message, errors[i]);
            }
            if (callback) {
                callback(errors[0], 500);
            }
            if (!skipBroadcast) {
                $rootScope.$broadcast(params.tag + '.failed', 500);
            }
            return self;
        }
        if (!skipBroadcast && !params.$$started) {
            $rootScope.$broadcast(params.tag + '.started');
        }
        self.func(params, function (err, data) {
            if (err) {
                console.error(err.message, err);
                if (callback) {
                    callback(err, data);
                }
                if (!skipBroadcast) {
                    $rootScope.$broadcast(params.tag + '.failed', data);
                }
                return;
            }
            if (callback) {
                callback(err, data);
            }
            if (!skipBroadcast) {
                $rootScope.$broadcast(params.tag + '.done', data);
            }
        });
        return self;
    };
    self.authorized = function (userService, params, callback, skipBroadcast) {
        var errors, i;
        if (!userService || !userService.loadCurrentUser) {
            errors = errors || [];
            errors.push(new Error('Expected a userService with function loadCurrentUser'));
        }
        if (!self.func) {
            errors = errors || [];
            errors.push(new Error('No repository function found'));
        }
        if (!params.tag) {
            errors = errors || [];
            errors.push(new Error('Missing argument params.tag'));
        }
        if (errors) {
            for (i = 0; i < errors.length; i += 1) {
                console.error(errors[i].message, errors[i]);
            }
            if (callback) {
                callback(errors[0], 500);
            }
            if (!skipBroadcast) {
                $rootScope.$broadcast(params.tag + '.failed', 500);
            }
            return self;
        }
        if (!skipBroadcast) {
            $rootScope.$broadcast(params.tag + '.started');
            params.$$started = true;
        }
        userService.loadCurrentUser(function (err, data) {
            if (err) {
                console.error(err.message, err);
                if (callback) {
                    callback(err, data);
                }
                if (!skipBroadcast) {
                    $rootScope.$broadcast(params.tag + '.failed', data);
                }
                return;
            }
            params.token = data.token;
            self.regular(params, callback, skipBroadcast);
        }, true);
        return self;
    };

    return self;
}];