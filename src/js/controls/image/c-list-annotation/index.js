/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.src = ko.observable('');
    self.items = ko.observableArray([]);

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
}

ViewModel.prototype.id = 'list-annotation';

ViewModel.prototype.init = function (options) {
    var self = this;
    options = options || {};

    this.output = undefined;
    self.src("url("+options.canonical+")");
    self.items(options.annotation);

    this.status('ready');
};

exports.register = function () {
    ko.components.register('c-list-annotation', {
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
