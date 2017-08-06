/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['vc-mainapp']) {
            context.top.active('vc-mainapp');
            context.vms['vc-mainapp'].init({mask: 'project-body'});
        }
        if (!context.vms['vc-edit-account']) {
            context.vms['project-body'].active('vc-edit-account');
        }

        var packet = {"fullname": data['fullname']};

        context.vms['vc-edit-account'].init({input:packet});
    };
};
