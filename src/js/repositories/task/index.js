/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }
}

Repository.prototype.findById = function (id) {
    return 1;
};

Repository.prototype.find = function () {
    return Promise.resolve($.ajax({
        url: window.remoteURL + '/api/task',
        type: 'GET',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

exports.createRepository = Repository;
