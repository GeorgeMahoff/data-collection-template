/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'image' : data['image']
        };
        var promise = context.actions['act-upload-image']({filters: packet});
        context.runningActionsByContainer['vc-image-upload'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['vc-image-upload'].splice(
                context.runningActionsByContainer['vc-image-upload'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
