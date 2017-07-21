/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'fullname' : data['fullname']
            ,'password' : data['password']
        };
        var promise = context.actions['act-update-user']({filters: packet});
        context.runningActionsByContainer['vc-edit-account'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['vc-edit-account'].splice(
                context.runningActionsByContainer['vc-edit-account'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
