/*jslint node: true, nomen: true */
"use strict";

exports.createActions = function (options) {
    return {
        'act-logout': require('./act-logout').createAction(options)
        ,'act-update-user': require('./act-update-user').createAction(options)
        ,'act-change-annotation': require('./act-change-annotation').createAction(options)
        ,'act-delete-image': require('./act-delete-image').createAction(options)
        ,'act-upload-image': require('./act-upload-image').createAction(options)
        ,'act-stop-campaign': require('./act-stop-campaign').createAction(options)
        ,'act-start-campaign': require('./act-start-campaign').createAction(options)
        ,'act-change-selection': require('./act-change-selection').createAction(options)
        ,'act-submit-result-next': require('./act-submit-result-next').createAction(options)
        ,'act-login': require('./act-login').createAction(options)
        ,'act-user-register': require('./act-user-register').createAction(options)
        ,'act-start-session-next': require('./act-start-session-next').createAction(options)
        ,'act-create-new-campaign': require('./act-create-new-campaign').createAction(options)
    };
};
