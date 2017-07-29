/**
 * Created by GeorgeMahoff on 29/07/2017.
 */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'fullname' : data['fullname'],
            'username' : data['username'],
            'type' : data['type']
        };

        if (!context.vms['vc-mainapp']) {
            context.top.active('vc-mainapp');
            context.vms['vc-mainapp'].init({mask: 'project-body'});
        }
        if (!context.vms['vc-authed-block']) {
            context.vms['project-body'].active('vc-authed-block');
            context.vms['vc-authed-block'].init({
                mask: 'det-user-info',
                role: packet['type']
            });
        }

        // context.vms['xor-authed-role-block'].init({input: packet['type']});
        context.vms['det-user-info'].init({input: packet});
    };
};
