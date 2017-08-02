/*jslint node: true, nomen: true */
"use strict";

exports.createEvents = function (options) {
    return {
        'ev-auth-failure': require('./auth/ev-auth-failure').createEvent(options)
        ,'ev-auth-success': require('./auth/ev-auth-success').createEvent(options)
        ,'ev-body-init' : require('./auth/ev-body-init').createEvent(options)
        ,'ev-logout-success': require('./auth/ev-logout-success').createEvent(options)
        ,'ev-user-update-success': require('./auth/ev-user-update-success').createEvent(options)
        ,'ev-user-update-submit': require('./auth/ev-user-update-submit').createEvent(options)
        ,'ev-edit-campaign': require('./campaign/ev-edit-campaign').createEvent(options)
        ,'ev-logout': require('./auth/ev-logout').createEvent(options)
        ,'ev-edit-account': require('./auth/ev-edit-account').createEvent(options)
        ,'ev-list-task-selected': require('./ev-list-task-selected').createEvent(options)
        ,'ev-task-session': require('./ev-task-session').createEvent(options)
        ,'ev-task-statistic': require('./ev-task-statistic').createEvent(options)
        ,'ev-signup-submit': require('./auth/ev-signup-submit').createEvent(options)
        ,'ev-to-upload-image': require('./image/ev-to-upload-image').createEvent(options)
        ,'ev-to-image-statistic': require('./image/ev-to-image-statistic').createEvent(options)
        ,'ev-image-selected': require('./image/ev-image-selected').createEvent(options)
        ,'ev-list-worker': require('./worker/ev-list-worker').createEvent(options)
        ,'ev-create-new-campaign': require('./campaign/ev-create-new-campaign').createEvent(options)
        ,'ev-list-campaign-selected': require('./campaign/ev-list-campaign-selected').createEvent(options)
        ,'ev-campaign-statistic': require('./campaign/ev-campaign-statistic').createEvent(options)
        ,'ev-campaign-images': require('./image/ev-campaign-images').createEvent(options)
        ,'ev-campaign-workers': require('./worker/ev-campaign-workers').createEvent(options)
        ,'ev-login-success': require('./auth/ev-login-success').createEvent(options)
        ,'ev-login-form-submit': require('./auth/ev-login-form-submit').createEvent(options)
        ,'ev-register-success': require('./auth/ev-register-success').createEvent(options)
        ,'ev-submit-result-failure': require('./ev-submit-result-failure').createEvent(options)
        ,'ev-submit-result-success': require('./ev-submit-result-success').createEvent(options)
        ,'ev-start-session-success': require('./ev-start-session-success').createEvent(options)
        ,'ev-start-session-failure': require('./ev-start-session-failure').createEvent(options)
        ,'ev-task-submit': require('./ev-task-submit').createEvent(options)
    };
};
