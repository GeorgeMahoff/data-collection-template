/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action() { // add "options" parameters if needed
    // TODO: Global Initialization
    /*
    example:
    this.collection = options.repositories.mail;
    */
}
Action.prototype.run = function (parameters, solve) { // add "onCancel" parameters if needed
    // Parameters:

    $.ajax({
        url: window.remoteURL+'/api/auth',
        type: 'DELETE',
        headers: {
            "Authorization" : "APIToken " + $.cookie('token')
        },
        success: function(data) {
            $.removeCookie('token');
            $.notify({message: 'Logout successful!'}, {allow_dismiss: true, type: 'success'});
            solve({
                event: 'ev-logout-success'
            });
        },
        error: function(data) {
            console.log(data);
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
