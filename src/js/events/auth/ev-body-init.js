/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['act-check-auth']();
        context.runningActionsByContainer['project-body'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['project-body'].splice(
                context.runningActionsByContainer['project-body'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
