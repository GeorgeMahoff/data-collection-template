/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['image'];
    self.context = params.context;
    self.status = ko.observable('');
    self.item = ko.observable(undefined);
    self.camStatus = ko.observable(undefined);

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'det-image';

ViewModel.prototype.fields = {
    id: 1
    ,'canonical': 1
    ,'statistics': 1
};

ViewModel.prototype.waitForStatusChange = function () {
    return this._computing ||
           this._initializing ||
           Promise.resolve();
};


ViewModel.prototype._compute = function() {
    if (this._computing) {
        this._computing.cancel();
    }
    var self = this;
    this._computing = this._repository.findById(this.filters.id, this.fields).then(function (item) {
        item['canonical']=window.remoteURL+item['canonical'];
        self.item(item);
        self.status('computed');
        self._repository.getStatistic(item.statistics).then(function (stat) {
            console.log("STAT")
            console.log(stat);
        });
        self._computing = undefined;
    });
};

ViewModel.prototype.deleteImage = function() {
    var self = this;
    this._repository.delete(self.item().id).then(function () {
        self.context.events['ev-campaign-images'](self.context, self.output);
    });
};

ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = {
        id: options.id,
        campaign: options.campaign
    };
    this.camStatus(options.campaign.status === "ready");
    this.filters = options.selected || {};
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
    ko.components.register('c-det-image', {
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
