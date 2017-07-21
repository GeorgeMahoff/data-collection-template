/*jslint node: true, nomen: true */
"use strict";

exports.createRepositories = function (options) {
    var repositories = {}
    repositories['user'] = require('./user').createRepository(options);
    repositories['task'] = require('./task').createRepository(options);
    repositories['taskstat'] = require('./taskstat').createRepository(options);
    repositories['campstat'] = require('./campstat').createRepository(options);
    repositories['image'] = require('./image').createRepository(options);
    repositories['worker'] = require('./worker').createRepository(options);
    repositories['imagestat'] = require('./imagestat').createRepository(options);
    repositories['campaign'] = require('./campaign').createRepository(options);
    return repositories;
};
