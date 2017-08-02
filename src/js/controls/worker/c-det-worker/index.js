/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['worker'];
    self.context = params.context;
    self.status = ko.observable('');
    self.item = ko.observable(undefined);
    self.camStatus = ko.observable(undefined);

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'det-worker';

ViewModel.prototype.fields = {
    id: 1
    ,'annotator': 1
    ,'fullname': 1
    ,'selector': 1
    ,'annotatorButton': 1
    ,'selectorButton': 1

};

ViewModel.prototype.waitForStatusChange = function () {
    return this._computing ||
           this._initializing ||
           Promise.resolve();
};

ViewModel.prototype.switchSelectionState = function() {
    var self = this;
    var url = self.item()['selection'];

    var action = self.item()['selector']==='Yes' ? self._repository.disableForTask : self._repository.enableForTask;

    action(url).then(function () {
        self.trigger('ev-list-worker');
    })
};

ViewModel.prototype.switchAnnotationState = function() {
    var self = this;
    var url = self.item()['annotation'];
    var action = self.item()['annotator']==='Yes' ? self._repository.disableForTask : self._repository.enableForTask;

    action(url).then(function () {
        self.trigger('ev-list-worker');
    })
};

ViewModel.prototype._compute = function() {
    if (this._computing) {
        this._computing.cancel();
    }
    var self = this;
    this._computing = this._repository.findById(this.filters.id, this.fields).then(function (item) {
        item['selectorButton'] = item['selector']? "Disable for " : "Enable for ";
        item['selector'] = item['selector']? "Yes" : "No";
        item['annotatorButton'] = item['annotator']? "Disable for " : "Enable for ";
        item['annotator'] = item['annotator']? "Yes" : "No";
        self.item(item);
        self.status('computed');
        self._computing = undefined;
    });
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = options;
    this.filters = options.selected || {};
    this.camStatus = options.campaign.status;
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
    ko.components.register('c-det-worker', {
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
