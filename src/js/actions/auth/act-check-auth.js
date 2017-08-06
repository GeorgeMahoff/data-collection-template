/**
 * Created by GeorgeMahoff on 29/07/2017.
 */
"use strict";

var Promise = require('bluebird');

function Action() {}

Action.prototype.run = function (parameters, solve) {
    $.ajax({
        url: window.remoteURL + '/api/user/me',
        type: 'GET',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token")
        },
        success: function(data) {
            solve({
                event: 'ev-auth-success',
                data: {
                    'fullname': data["fullname"],
                    'username': data["username"],
                    'type': data["type"]
                }
            });
        },
        error: function() {
            solve({
                event: 'ev-auth-failure'
            });
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
