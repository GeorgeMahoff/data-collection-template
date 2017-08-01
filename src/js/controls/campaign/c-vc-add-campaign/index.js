/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.isEdit = ko.observable(false);
    self.campaignId = {};

    self.init = function (options) {
        if (options !== undefined) {
            self.isEdit(options.input['isEdit']);
            self.campaignId = {id:options.input['id']};
        }
        options = options || {};
        self.children.forEach(function (child){
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, self.campaignId);
    };
}

ViewModel.prototype.id = 'vc-add-campaign';
ViewModel.prototype.children = [
    'form-new-campaign' // newCampaign
];

exports.register = function () {
    ko.components.register('c-vc-add-campaign', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    });
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};
