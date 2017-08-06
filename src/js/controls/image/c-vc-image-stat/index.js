/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.output = {
            id: options.input.id,
            campaign: options.input.campaign,
            selected: options.input.selected
        };
        var annotationList = {
            canonical: options.input.selected.canonical,
            annotation: options.input.annotation
        };
        self.children.forEach(function (child){
            if (child === options.mask) {
                self.context.vms[child].init(annotationList);
            }
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'vc-image-stat';
ViewModel.prototype.children = [
    'list-annotation' // Annotation list
];

exports.register = function () {
    ko.components.register('c-vc-image-stat', {
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
