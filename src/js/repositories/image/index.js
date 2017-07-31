/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird')

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }
}

Repository.prototype.findById = function (id) {
    // TODO: implement the accessor to the datasource which returns a promise
    // TODO: remove this BEGIN
    return this.db.findOneAsync({id: id});
    // TODO: remove this END
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
