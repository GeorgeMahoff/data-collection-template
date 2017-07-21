/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'id' : data['id']
        };
        var promise = context.actions['act-change-annotation']({filters: packet});
        context.runningActionsByContainer['vc-worker-details'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['vc-worker-details'].splice(
                context.runningActionsByContainer['vc-worker-details'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
