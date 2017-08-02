/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action() {}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:
    // parameters['password']
    // parameters['username']

    var formJson = JSON.stringify(parameters);

    // admin admin123

    $.ajax({
        url: window.remoteURL+'/api/auth',
        type: 'POST',
        headers: {
            "Authorization" : "APIKey " + window.APIkey,
            "Content-Type" : "application/json"
        },
        data: formJson,
        success: function(data) {
            $.cookie("token",data["token"]);
            $.notify({message: 'Login successful!'}, {allow_dismiss: true, type: 'success'});
            solve({
                event: 'ev-login-success', // success
                data: {
                    'username': parameters['username']
                }
            });
        },
        error: function(data) {}
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
