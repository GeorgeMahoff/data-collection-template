/**
 * Created by GeorgeMahoff on 06/08/2017.
 */
"use strict";

var Promise = require('bluebird');


function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }
}

// login
Repository.prototype.findByCredentials = function (credentials) {

    var formJson = JSON.stringify(credentials);

    return Promise.resolve($.ajax({
        url: window.remoteURL+'/api/auth',
        type: 'POST',
        headers: {
            "Authorization" : "APIKey " + window.APIkey,
            "Content-Type" : "application/json"
        },
        data: formJson
    }));
};

Repository.prototype.insert = function (parameters) {

    var formJson = JSON.stringify(parameters);

    return Promise.resolve($.ajax({
        url: window.remoteURL+'/api/user',
        type: 'POST',
        headers: {
            "Authorization" : "APIKey " + window.APIkey,
            "Content-Type" : "application/json"
        },
        data: formJson
    }));
};

Repository.prototype.update = function (parameters) {
    var formJson = JSON.stringify(parameters);

    return Promise.resolve($.ajax({
        url: window.remoteURL+'/api/user/me',
        type: 'PUT',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token"),
            "Content-Type" : "application/json"
        },
        data: formJson
    }));
};

exports.createRepository = Repository;
