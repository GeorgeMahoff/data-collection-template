/*jslint node: true, nomen: true */
"use strict";

exports.createActions = function (options) {
    return {
        'act-logout': require('./auth/act-logout').createAction(options)
        ,'act-check-auth': require('./auth/act-check-auth').createAction(options)
    };
};
