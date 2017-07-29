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
Action.prototype.run = function (parameters, solve) {

    var formJson = JSON.stringify(parameters);
    console.log(parameters);

    $.ajax({
        url: window.remoteURL+'/api/user/me',
        type: 'PUT',
        headers: {
            "Authorization" : "APIToken " + $.cookie("token"),
            "Content-Type" : "application/json"
        },
        data: formJson,
        success: function(data) {
            console.log(data);
            $.notify({message: 'Update successful!'}, {allow_dismiss: true, type: 'success'});
            solve({
                event: 'ev-user-update-success', // success
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
