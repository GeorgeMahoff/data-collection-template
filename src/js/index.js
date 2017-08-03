/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    repositories = require('./repositories'),
    controls = require('./controls'),
    events = require('./events'),
    actions = require('./actions'),
    Promise = require('bluebird');

Promise.config({cancellation: true});

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.cutURLTail = function () {
    var str = this.substr(this.lastIndexOf('/')) + '$';
    return this.replace( new RegExp(str), '' );
};

controls.register();

function ApplicationViewModel() {
    window.APIkey = "068b24c9-2a09-4fc4-b2ba-a34818944179";
    window.remoteURL = "http://awt.ifmledit.org";

    var repos = repositories.createRepositories({});
    this.context = {
        repositories: repos,
        events: events.createEvents({}),
        actions: actions.createActions({repositories: repos}),
        vms: {},
        runningActionsByContainer: {}
    };
}

var application = new ApplicationViewModel();

ko.applyBindings(application);

application.context.top.init();
