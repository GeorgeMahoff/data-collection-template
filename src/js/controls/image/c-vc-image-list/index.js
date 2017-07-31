/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        this.output = options.input['campaign'];
        options = options || {};
        console.log("vc det");
        console.log(options);
        self.children.forEach(function (child){
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, this.output);
    };
}

ViewModel.prototype.id = 'vc-image-list';
ViewModel.prototype.children = [
    'list-image' // imageList
];

exports.register = function () {
    ko.components.register('c-vc-image-list', {
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
