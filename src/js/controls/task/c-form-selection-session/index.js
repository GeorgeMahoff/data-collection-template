/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self._repository = self.context.repositories['task'];
    self.image = ko.observable('');
    self.status = ko.observable('');

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'form-selection-session';

ViewModel.prototype.sendAccept = function () {
    this.sendResult(true);
};

ViewModel.prototype.sendReject = function () {
    this.sendResult(false);
};

ViewModel.prototype.sendResult = function (bool) {
    var self = this;
    self.status('computing');
    var packet = {
        'accepted': bool
    };
    self._repository.sendResult(packet, self.input.session).then(function () {
        self.trigger('ev-task-session');
    })
};

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    var self = this;
    self._repository.getNextInstance(this.input.session).then(function (item) {
        if (item){
            self.image(window.remoteURL + item.image);
            self.status('computed');
        } else {
            self.trigger('ev-list-task-selected')
        }
    });
};

ViewModel.prototype.init = function (options) {
    options = options || {};
    this.input = options;
    this.output = this.input;
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-form-selection-session', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};
