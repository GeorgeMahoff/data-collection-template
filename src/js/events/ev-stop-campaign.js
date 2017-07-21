/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'id' : data['id']
        };
        var promise = context.actions['act-stop-campaign']({filters: packet});
        context.runningActionsByContainer['vc-campaign-details'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['vc-campaign-details'].splice(
                context.runningActionsByContainer['vc-campaign-details'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
