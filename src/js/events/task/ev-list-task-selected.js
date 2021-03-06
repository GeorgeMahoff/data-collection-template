/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['vc-mainapp']) {
            context.top.active('vc-mainapp');
            context.vms['vc-mainapp'].init({mask: 'project-body'});
        }
        if (!context.vms['vc-authed-block']) {
            context.vms['project-body'].active('vc-authed-block');
            context.vms['vc-authed-block'].init({mask: 'xor-authed-role-block'});
        }
        if (!context.vms['vc-worker-main']) {
            context.vms['xor-authed-role-block'].active('vc-worker-main');
            context.vms['vc-worker-main'].init({mask: 'xor-worker-workflow'});
        }
        if (!context.vms['vc-task-details']) {
            context.vms['xor-worker-workflow'].active('vc-task-details');
            context.vms['vc-task-details'].init({mask: 'det-task'});
        }
        data = data || {};
        var packet = {
            'id' : data['id']
        };
        context.vms['det-task'].init({input: packet});
    };
};
