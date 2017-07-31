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

    var image = parameters["image"];

    var fd = new FormData();
    fd.append("file", image);
    $.ajax({
        url: window.remoteURL+parameters['url'],
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
        },
        success: function(data) {
            console.log(data);
        },
        error: function(data) {
            console.log(data)
        }
    });
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    // $.notify({message: 'uploadImage'}, {allow_dismiss: true, type: 'success'});
    // solve({
    //     event: 'ev-upload-image-success', // success
    //     data: {
    //     }
    // });
    // THIS CAN BE REMOVED (END)
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
