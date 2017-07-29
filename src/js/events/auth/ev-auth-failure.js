/**
 * Created by GeorgeMahoff on 29/07/2017.
 */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['vc-mainapp']) {
            context.top.active('vc-mainapp');
            context.vms['vc-mainapp'].init({mask: 'project-body'});
        }
        if (!context.vms['vc-auth-block']) {
            context.vms['project-body'].active('vc-auth-block');
            context.vms['vc-auth-block'].init({mask: 'vc-login'});
            context.vms['vc-login'].init();
        }
    };
};
