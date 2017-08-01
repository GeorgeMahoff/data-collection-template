/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird')

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }
}

Repository.prototype.delete = function (id) {
    return Promise.resolve($.ajax({
        url: window.remoteURL + id,
        type: 'DELETE',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

Repository.prototype.insert = function (parameters) {

    var image = parameters["image"];
    var fd = new FormData();
    fd.append("file", image);

    return Promise.resolve($.ajax({
        url: window.remoteURL+parameters['id'],
        type: 'POST',
        headers: {
            "Authorization" : "APIToken " + $.cookie('token')
        },
        data: fd,
        cache: false,
        contentType: false,
        processData: false,
        xhr: function() {
            return $.ajaxSettings.xhr();
        },
        success: function() {
            $.notify({message: 'Image uploaded!'}, {allow_dismiss: true, type: 'success'});
        },
        error: function(data) {
            console.log(data)
        }
    }));
};

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

exports.createRepository = Repository;
