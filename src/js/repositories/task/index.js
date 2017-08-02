/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }
}

Repository.prototype.findById = function (id) {
    return Promise.resolve($.ajax({
        url: window.remoteURL + id,
        type: 'GET',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
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

Repository.prototype.getStatistic = function (statisticURL) {
    return Promise.resolve($.ajax({
        url: window.remoteURL + statisticURL,
        type: 'GET',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

exports.createRepository = Repository;
