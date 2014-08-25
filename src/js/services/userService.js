module.exports = ['userRepository', 'repositoryService', '$rootScope', 'storageService', function (repository, repositoryService, $rootScope, storageService) {
    'use strict';

    var self = {},
        currentUser,
        getCurrentUser = function () {
            if (!currentUser) {
                currentUser = storageService.load('currentUser');
            }
            return currentUser;
        };

    self.loadCurrentUser = function (callback, skipBroadcast) {
        if (!skipBroadcast) {
            $rootScope.$broadcast('user.loadCurrentUser.started');
        }
        var user = getCurrentUser(), err;
        if (user) {
            if (callback) {
                callback(undefined, user);
            }
            if (!skipBroadcast) {
                $rootScope.$broadcast('user.loadCurrentUser.done', user);
            }
        } else {
            err = new Error('Failed to load user');
            console.error(err.message, err);
            if (callback) {
                callback(err);
            }
            if (!skipBroadcast) {
                $rootScope.$broadcast('user.loadCurrentUser.failed', 500);
            }
        }
        return self;
    };
    self.login = function (credentials, callback, skipBroadcast) {
        credentials.username = credentials.username ? credentials.username.toLowerCase() : undefined;
        repositoryService
            .withFunction(repository.login)
            .regular(
                {
                    tag: 'user.login',
                    username: credentials.username,
                    password: credentials.password

                },
                function (err, data) {
                    if (!err) {
                        storageService.save('currentUser', data, credentials.rememberMe === true);
                    }
                    if (callback) {
                        callback(err, data);
                    }
                },
                skipBroadcast
            );
        return self;
    };
    self.logout = function (callback, skipBroadcast) {
        var user = getCurrentUser();
        if (user) {
            repositoryService
                .withFunction(repository.logout)
                .regular(
                    {
                        tag: 'user.logout',
                        accessToken: user.accessToken

                    },
                    function (err, data) {
                        if (!err) {
                            currentUser = undefined;
                            storageService.remove('currentUser');
                        }
                        if (callback) {
                            callback(err, data);
                        }
                    },
                    skipBroadcast
                );
        }
        return self;
    };

    return self;
}];