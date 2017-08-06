/*jslint node: true, nomen: true */
"use strict";

exports.createRepositories = function (options) {
    var repositories = {};
    repositories['task'] = require('./task').createRepository(options);
    repositories['image'] = require('./image').createRepository(options);
    repositories['worker'] = require('./worker').createRepository(options);
    repositories['campaign'] = require('./campaign').createRepository(options);
    repositories['user'] = require('./user').createRepository(options);
    return repositories;
};
