/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self._repository = self.context.repositories['task'];

    self.status = ko.observable('');
    self.line = ko.observable('');
    self.image = ko.observable('');
    self.width = ko.observable('');

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'form-annotation-session';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype.clear = function () {
    this.line('');
};

ViewModel.prototype.sendResult = function () {
    var self = this;
    self.status('computing');
    console.log(self.line());
    console.log(self.status());
    var packet = {
        'skyline': self.line()
    };
    self._repository.sendResult(packet, self.input.session).then(function () {
        self.trigger('ev-task-session');
    })
};

ViewModel.prototype._compute = function () {
    var self = this;
    self._repository.getNextInstance(this.input.session).then(function (item) {
        console.log(item);
        if (item){
            self.image(window.remoteURL + item.image);
            self.width(item.size);
            self.status('computed');
        } else {
            self.trigger('ev-list-task-selected')
        }
    })
};

ViewModel.prototype.init = function (options) {
    options = options || {};
    console.log(options);
    this.input = options || {};
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
    ko.components.register('c-form-annotation-session', {
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
