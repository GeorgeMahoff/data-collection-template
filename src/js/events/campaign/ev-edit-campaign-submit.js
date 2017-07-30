/**
 * Created by GeorgeMahoff on 30/07/2017.
 */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            packet: {
                annotation_replica: data['annotation_replica'],
                annotation_size: data['annotation_size'],
                name: data['name'],
                selection_replica: data['selection_replica'],
                threshold: data['threshold']
            },
            url: data['id']

        };

        var promise = context.actions['act-edit-campaign']({filters: packet});
        context.runningActionsByContainer['vc-add-campaign'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['vc-add-campaign'].splice(
                context.runningActionsByContainer['vc-add-campaign'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};