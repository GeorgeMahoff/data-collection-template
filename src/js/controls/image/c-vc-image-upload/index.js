/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.campaign = ko.observable({});

    self.init = function (options) {
        options = options || {};
        self.output = options.input;
        self.campaign(options.input.campaign);
        self.children.forEach(function (child){
            self.context.vms[child].init(self.output);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'vc-image-upload';
ViewModel.prototype.children = [
    'form-image-upload' // uploadImage
];

exports.register = function () {
    ko.components.register('c-vc-image-upload', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
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
