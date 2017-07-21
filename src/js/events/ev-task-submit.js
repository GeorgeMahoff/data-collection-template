/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'skyline' : data['skyline']
            ,'status' : data['accepted']
        };
        var promise = context.actions['act-submit-result-next']({filters: packet});
        context.runningActionsByContainer['vc-task-session'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['vc-task-session'].splice(
                context.runningActionsByContainer['vc-task-session'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
