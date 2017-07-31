/*jslint node: true, nomen: true */
"use strict";

exports.createActions = function (options) {
    return {
        'act-logout': require('./auth/act-logout').createAction(options)
        ,'act-update-user': require('./auth/act-update-user').createAction(options)
        ,'act-change-annotation': require('./act-change-annotation').createAction(options)
        ,'act-delete-image': require('./image/act-delete-image').createAction(options)
        ,'act-upload-image': require('./image/act-upload-image').createAction(options)
        ,'act-stop-campaign': require('./campaign/act-stop-campaign').createAction(options)
        ,'act-start-campaign': require('./campaign/act-start-campaign').createAction(options)
        ,'act-change-selection': require('./act-change-selection').createAction(options)
        ,'act-submit-result-next': require('./act-submit-result-next').createAction(options)
        ,'act-login': require('./auth/act-login').createAction(options)
        ,'act-check-auth': require('./auth/act-check-auth').createAction(options)
        ,'act-user-register': require('./auth/act-user-register').createAction(options)
        ,'act-start-session-next': require('./act-start-session-next').createAction(options)
        ,'act-create-new-campaign': require('./campaign/act-create-new-campaign').createAction(options)
        ,'act-edit-campaign': require('./campaign/act-edit-campaign').createAction(options)
    };
};
