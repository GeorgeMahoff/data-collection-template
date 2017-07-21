/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['act-start-session-next']();
        context.runningActionsByContainer['vc-task-details'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['vc-task-details'].splice(
                context.runningActionsByContainer['vc-task-details'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
