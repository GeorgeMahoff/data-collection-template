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

Repository.prototype.find = function (fields, project) {
    return Promise.resolve($.ajax({
        url: window.remoteURL + '/api/campaign',
        type: 'GET',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

Repository.prototype.getStatistic = function (id) {
    return Promise.resolve($.ajax({
        url: window.remoteURL + '/api/campaign',
        type: 'GET',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

exports.createRepository = Repository;
