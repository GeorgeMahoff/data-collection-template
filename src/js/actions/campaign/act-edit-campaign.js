/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action() {
}
Action.prototype.run = function (parameters, solve) {
    var url = parameters['url'];
    var packet = parameters['packet'];

    packet['annotation_replica'] = Number(packet['annotation_replica']);
    packet['annotation_size'] = Number(packet['annotation_size']);
    packet['selection_replica'] = Number(packet['selection_replica']);
    packet['threshold'] = Number(packet['threshold']);

    var formJson = JSON.stringify(packet);

    $.ajax({
        url: window.remoteURL+url,
        type: 'PUT',
        headers: {
            "Authorization" : "APIToken " + $.cookie('token'),
            "Content-Type" : "application/json"
        },
        data: formJson,
        success: function(data, textStatus, request) {
            solve({
                event: 'ev-create-campaign-success', // success
                data: url
            });
        },
        error: function(data) {
            console.log(data)
        }
    });
};

exports.createAction = function (options) {
    var action = new Action(options);
    return function (data) {
        return new Promise(function (solve, reject, onCancel) {
            var parameters = (data && data.filters) || {};
            action.run(parameters, solve, onCancel);
        });
    };
};
