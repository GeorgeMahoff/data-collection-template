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

Repository.prototype.startSession = function (taskURL) {
    return Promise.resolve($.ajax({
        url: window.remoteURL + taskURL,
        type: 'POST',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

Repository.prototype.getNextInstance = function (taskURL) {
    return Promise.resolve($.ajax({
        url: window.remoteURL + taskURL,
        type: 'GET',
        headers: {
            "Authorization": "APIToken " + $.cookie("token")
        }
    }));
};

Repository.prototype.sendResult = function (packet, taskURL) {
    var formJson = JSON.stringify(packet);
    return Promise.resolve($.ajax({
        url: window.remoteURL + taskURL,
        type: 'PUT',
        headers: {
            "Authorization": "APIToken " + $.cookie("token"),
            "Content-Type" : "application/json"
        },
        data: formJson
    }));
};

exports.createRepository = Repository;
