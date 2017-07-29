/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action() {

}
Action.prototype.run = function (parameters, solve) {
    // Parameters:
    // parameters['fullname']
    // parameters['password']
    // parameters['role']
    // parameters['username']
    var formJson = JSON.stringify(parameters);

    $.ajax({
        url: window.remoteURL+'/api/user',
        type: 'POST',
        headers: {
            "Authorization" : "APIKey " + window.APIkey,
            "Content-Type" : "application/json"
        },
        data: formJson,
        success: function() {
            $.notify({message: 'Registration successful!'}, {allow_dismiss: true, type: 'success'});
            solve({
                event: 'ev-register-success', // success
                data: {
                    'username': parameters['username']
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
