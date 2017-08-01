/*jslint node: true, nomen: true */
"use strict";

exports.createActions = function (options) {
    return {
        'act-logout': require('./auth/act-logout').createAction(options)
        ,'act-update-user': require('./auth/act-update-user').createAction(options)
        ,'act-change-annotation': require('./act-change-annotation').createAction(options)
        ,'act-change-selection': require('./act-change-selection').createAction(options)
        ,'act-submit-result-next': require('./act-submit-result-next').createAction(options)
        ,'act-login': require('./auth/act-login').createAction(options)
        ,'act-check-auth': require('./auth/act-check-auth').createAction(options)
        ,'act-user-register': require('./auth/act-user-register').createAction(options)
        ,'act-start-session-next': require('./act-start-session-next').createAction(options)
    };
};
