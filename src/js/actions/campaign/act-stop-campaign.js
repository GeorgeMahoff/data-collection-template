/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action() {}

Action.prototype.run = function (parameters, solve) {
    $.ajax({
        url: window.remoteURL+parameters['execution'],
        type: 'DELETE',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        },
        success: function() {
            $.notify({message: 'Campaign stopped'}, {allow_dismiss: true, type: 'success'});
            solve({
                event: 'ev-start-campaign-success', // success
                data: {
                    'id': parameters['id']
                }
            });
        },
        error: function(data) {
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
