/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        console.log(data);

        data = data || {};
        var packet = {
            'id' : data['id'],
            'session': data['session']
        };

        var mask = data['type']==='selection'? "form-selection-session" : "form-annotation-session";

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

        context.vms['xor-worker-workflow'].active('vc-task-session');
        context.vms['vc-task-session'].init({mask: mask, input: packet});

    };
};
