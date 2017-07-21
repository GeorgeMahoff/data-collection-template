/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['vc-mainapp']) {
            context.top.active('vc-mainapp');
            context.vms['vc-mainapp'].init({mask: 'project-body'});
        }
        if (!context.vms['vc-auth-block']) {
            context.vms['project-body'].active('vc-auth-block');
            context.vms['vc-auth-block'].init({mask: 'xor-signup-register'});
        }
        if (!context.vms['vc-login']) {
            context.vms['xor-signup-register'].active('vc-login');
            context.vms['vc-login'].init({mask: 'form-login'});
        }
        data = data || {};
        var packet = {
            'username' : data['username']
        };
        context.vms['form-login'].init({input: packet});
    };
};
