/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'password' : data['password']
            ,'username' : data['username']
        };
        var promise = context.actions['act-login']({filters: packet});
        context.runningActionsByContainer['vc-login'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['vc-login'].splice(
                context.runningActionsByContainer['vc-login'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
