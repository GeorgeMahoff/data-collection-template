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
        if (!context.vms['vc-manager-body']) {
            context.vms['xor-authed-role-block'].active('vc-manager-body');
            context.vms['vc-manager-body'].init({mask: 'xor-manager-workflow'});
        }
        if (!context.vms['vc-campaign-statistic']) {
            context.vms['xor-manager-workflow'].active('vc-campaign-statistic');
            context.vms['vc-campaign-statistic'].init({mask: 'det-campaign-stat'});
        }
        data = data || {};
        var packet = {
            'id' : data['id']
        };
        context.vms['det-campaign-stat'].init({input: packet});
    };
};
