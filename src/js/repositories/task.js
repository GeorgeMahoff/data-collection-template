/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    ko = require('knockout');

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

Repository.prototype.findWithStatistics = function (global) {
    var self = this;
    return Promise.resolve(
        self.find().then(function (items) {
            return Promise.resolve(
                items.tasks.forEach(function (item) {
                    return Promise.resolve(
                        self.findById(item.id).then(function (details) {
                            return Promise.resolve(
                                self.getStatistic(details.statistics).then(
                                    function (stat) {
                                        var task = ko.observable({
                                            campaign: details.campaign,
                                            id: item.id,
                                            type: item.type,
                                            available: stat.available > 0 ? "Yes":"No"
                                        });
                                        global.push(task);
                                    }
                                )
                            )
                        })
                    )
                }))
        })
    );
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
    return Promise.resolve(
        Promise.resolve(
            $.ajax({
                url: window.remoteURL + taskURL,
                type: 'GET',
                headers: {
                    "Authorization": "APIToken " + $.cookie("token")
                }
            }).complete(function(data) {
                return data
            })
        ).then(function (item) {
            return item;
        }).catch(function () {
            return undefined;
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
