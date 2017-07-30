/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action() {}
Action.prototype.run = function (parameters, solve) {

    parameters['annotation_replica'] = Number(parameters['annotation_replica']);
    parameters['annotation_size'] = Number(parameters['annotation_size']);
    parameters['selection_replica'] = Number(parameters['selection_replica']);
    parameters['threshold'] = Number(parameters['threshold']);

    var formJson = JSON.stringify(parameters);

    $.ajax({
        url: window.remoteURL+'/api/campaign',
        type: 'POST',
        headers: {
            "Authorization" : "APIToken " + $.cookie('token'),
            "Content-Type" : "application/json"
        },
        data: formJson,
        success: function(data, textStatus, request) {
            solve({
                event: 'ev-create-campaign-success', // success
                data: request.getResponseHeader("Location")
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
