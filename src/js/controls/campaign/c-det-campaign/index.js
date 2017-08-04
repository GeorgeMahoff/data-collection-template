/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['campaign'];
    self.context = params.context;
    self.status = ko.observable('');
    self.item = ko.observable(undefined);
    self.statistics = ko.observable(undefined);

    self.trigger = function (id) {
        self.context.events[id](self.context, self.item());
    };
}

ViewModel.prototype.id = 'det-campaign';

ViewModel.prototype.waitForStatusChange = function () {
    return this._computing ||
           this._initializing ||
           Promise.resolve();
};

ViewModel.prototype.startCampaign = function () {
    var self = this;

    this._repository.start(this.item().execution).then(function () {
        self.context.events['ev-list-campaign-selected'](self.context, {id: self.item().id});
    });
};

ViewModel.prototype.stopCampaign = function () {
    var self = this;

    this._repository.stop(this.item().execution).then(function () {
        self.context.events['ev-list-campaign-selected'](self.context, {id: self.item().id});
    });
};

ViewModel.prototype._compute = function() {
    if (this._computing) {
        this._computing.cancel();
    }
    var self = this;
    this._computing = this._repository.findById(this.filters.id).then(function (item) {
        self.item(item);
        if(item.status === 'ended') {
            self._repository.getStatistic(item.statistics).then(function (stat) {
                self.statistics(stat);
                self.status('computed');
                self._computing = undefined;
            })
        } else {
            self.status('computed');
            self._computing = undefined;
        }
    });
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.filters = options.input || {};
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
    ko.components.register('c-det-campaign', {
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
