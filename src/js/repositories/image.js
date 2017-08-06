/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    ko = require('knockout');

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

    var images = parameters["image"];

    return Promise.resolve(
        function () {
            var acc = [];
            for(var i=0; i<images.length; i++){
                var fd = new FormData();
                fd.append("images", images[i]);
                acc.push(Promise.resolve($.ajax({
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
                    }
                })))
            }
            return acc
        }()
    );
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

Repository.prototype.findWithStatistics = function (campaignId, global, threshold) {
    var self = this;
    return Promise.resolve(
        self.find(campaignId).then(function (items) {
            return Promise.resolve(
                items.images.forEach(function (item) {
                    return Promise.resolve(
                        self.findById(item.id).then(function (details) {
                            return Promise.resolve(
                                self.getStatistic(details.statistics).then(
                                    function (stat) {
                                        var img = ko.observable({
                                            accepted: stat.selection.accepted >= threshold,
                                            id: item.id,
                                            canonical: window.remoteURL + item.canonical
                                        });
                                        global.push(img);
                                    }
                                )
                            )
                        })
                    )
                }))
        })
    );
};

Repository.prototype.getStatistic = function (statisticsURL) {
    return Promise.resolve($.ajax({
        url: window.remoteURL + statisticsURL,
        type: 'GET',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        }
    }));
};

exports.createRepository = Repository;
