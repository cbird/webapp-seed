module.exports = ['$timeout', function ($timeout) {
    'use strict';
    var self = {},
        mockData = [
            {
                token: '4c05f5e04307f68e5e52fcd644262a15',
                email: 'test@test.com',
                password: 'abc123',
                username: 'jimhen',
                firstName: 'Jimi',
                lastName: 'Hendrix'
            },
            {
                token: '71fe0a4aba31c5695f907733ec072dac',
                email: 'test2@test.com',
                password: 'abc123',
                username: 'bobdyl',
                firstName: 'Bob',
                lastName: 'Dylan'
            }
        ],
        getRandomMs = function () {
            return Math.floor((Math.random() * 1500) + 500);
        };

    self.getUser = function (params, callback) {
        $timeout(function () {
            var i = 0, length = mockData.length, user;
            for (i = 0; i < length; i += 1) {
                if (mockData[i].token === params.token) {
                    user = mockData[i];
                    break;
                }
            }
            if (user) {
                callback(undefined, user);
            } else {
                callback(new Error('Could not find any user with token ' + params.token), 404);
            }
        }, getRandomMs());
        return self;
    };
    self.login = function (params, callback) {
        $timeout(function () {
            if (params.username === 'fail@test.com') {
                callback(new Error('Login failed'), 500);
                return;
            }
            var i, length, user;
            for (i = 0, length = mockData.length; i < length; i += 1) {
                if ((mockData[i].email === params.username || mockData[i].username === params.username) && mockData[i].password === params.password) {
                    user = {
                        token: mockData[i].token,
                        email: mockData[i].email,
                        username: mockData[i].username,
                        firstName: mockData[i].firstName,
                        lastName: mockData[i].lastName
                    };
                    break;
                }
            }
            if (user) {
                callback(undefined, user);
            } else {
                callback(new Error('Login failed'), 401);
            }
        }, getRandomMs());
        return self;
    };
    self.logout = function (params, callback) {
        $timeout(function () {
            console.log('User with token ' + params.token + ' has logged out');
            callback(undefined, true);
        }, getRandomMs());
        return self;
    };

    return self;
}];