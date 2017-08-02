/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        data = data || {};

        var packet = {};
        if (data['campaign']) {
            packet = data;
        } else {
            packet = {
                'campaign': {
                    'name': data['name'],
                    'status': data['status'],
                    'id': data['id']
                },
                'id' : data['worker']
            };
        }
        if (!context.vms['vc-mainapp']) {
            context.top.active('vc-mainapp');
            context.vms['vc-mainapp'].init({mask: 'project-body'});
        }
        if (!context.vms['vc-authed-block']) {
            context.vms['project-body'].active('vc-authed-block');
            context.vms['vc-authed-block'].init({mask: 'xor-authed-role-block'});
        }
        if (!context.vms['vc-manager-body']) {
            context.vms['xor-authed-role-block'].active('vc-manager-body');
            context.vms['vc-manager-body'].init({mask: 'xor-manager-workflow'});
        }
        if (!context.vms['vc-worker-list']) {
            context.vms['xor-manager-workflow'].active('vc-worker-list');
            context.vms['vc-worker-list'].init({mask: 'list-workers', input: packet})
        }
    };
};
