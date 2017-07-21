/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['act-logout']();
        context.runningActionsByContainer['vc-authed-block'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['vc-authed-block'].splice(
                context.runningActionsByContainer['vc-authed-block'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
