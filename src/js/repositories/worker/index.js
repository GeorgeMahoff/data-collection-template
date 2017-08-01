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

Repository.prototype.find = function (campaignId) {
    return Promise.resolve($.ajax({
        url: window.remoteURL + campaignId,
        type: 'GET',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

// Same for annotation/selection
Repository.prototype.enableForTask = function (taskUrl) {
    return Promise.resolve($.ajax({
        url: window.remoteURL + taskUrl,
        type: 'POST',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

// Same for annotation/selection
Repository.prototype.disableForTask = function (taskUrl) {
    return Promise.resolve($.ajax({
        url: window.remoteURL + taskUrl,
        type: 'DELETE',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

exports.createRepository = Repository;
