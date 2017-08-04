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
        url: window.remoteURL + '/api/campaign',
        type: 'GET',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

Repository.prototype.insert = function (parameters) {
    parameters = parameters['packet'];
    parameters['annotation_replica'] = Number(parameters['annotation_replica']);
    parameters['annotation_size'] = Number(parameters['annotation_size']);
    parameters['selection_replica'] = Number(parameters['selection_replica']);
    parameters['threshold'] = Number(parameters['threshold']);

    var formJson = JSON.stringify(parameters);
    var locationHeader = undefined;

    return Promise.resolve(Promise.resolve($.ajax({
        url: window.remoteURL+'/api/campaign',
        type: 'POST',
        headers: {
            "Authorization" : "APIToken " + $.cookie('token'),
            "Content-Type" : "application/json"
        },
        data: formJson
    }).success(function(data, textStatus, request){
        locationHeader = request.getResponseHeader("Location");
    })).then(function () {
        return locationHeader
    }));
};

Repository.prototype.update = function (parameters) {
    var url = parameters['url'];
    var packet = parameters['packet'];

    packet['annotation_replica'] = Number(packet['annotation_replica']);
    packet['annotation_size'] = Number(packet['annotation_size']);
    packet['selection_replica'] = Number(packet['selection_replica']);
    packet['threshold'] = Number(packet['threshold']);

    var formJson = JSON.stringify(packet);

    return Promise.resolve($.ajax({
        url: window.remoteURL + url,
        type: 'PUT',
        headers: {
            "Authorization": "APIToken " + $.cookie('token'),
            "Content-Type": "application/json"
        },
        data: formJson
    }));
};

Repository.prototype.getStatistic = function (id) {
    return Promise.resolve($.ajax({
        url: window.remoteURL + id,
        type: 'GET',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

Repository.prototype.start = function (id) {
    return Promise.resolve($.ajax({
        url: window.remoteURL+id,
        type: 'POST',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

Repository.prototype.stop = function (id) {
    return Promise.resolve($.ajax({
        url: window.remoteURL+id,
        type: 'DELETE',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

exports.createRepository = Repository;
