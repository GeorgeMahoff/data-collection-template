/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'fullname' : data['fullname']
            ,'type' : data['type']
            ,'password' : data['password']
            ,'username' : data['username']
        };
        var promise = context.actions['act-user-register']({filters: packet});
        context.runningActionsByContainer['vc-signup'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['vc-signup'].splice(
                context.runningActionsByContainer['vc-signup'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
