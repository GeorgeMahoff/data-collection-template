/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.active = ko.observable(undefined);

    self.init = function (options) {
        options = options || {};
        // console.log('body inited');
        // params.context.actions['act-check-auth']();

        // // context.runningActionsByContainer['project-body'].push(promise);
        // promise.then(function (result) {
        //     context.runningActionsByContainer['project-body'].splice(
        //         context.runningActionsByContainer['project-body'].indexOf(promise), 1
        //     );
        //     if (result.event) {
        //         context.events[result.event](context, result.data);
        //     }
        // });
        self.trigger("ev-body-init");
        // $.ajax({
        //     url: window.remoteURL + '/api/user/me',
        //     type: 'GET',
        //     // async: false,
        //     headers: {
        //         "Authorization" : "APIToken " + $.cookie("token")
        //     },
        //     success: function() {
        //         self.defaultChild = 'vc-authed-block';
        //     },
        //     error: function() {
        //         self.defaultChild = 'vc-auth-block';
        //     }
        // }).complete(function () {
        //     self.active(self.defaultChild);
        //     if (self.defaultChild && options.mask !== self.defaultChild) {
        //         self.context.vms[self.defaultChild].init(options);
        //     }
        // })
    };

    self.landmark = function (id) {
        self.active(id);
        self.context.vms[id].init();
    };
    self.trigger = function (id) {
        // console.log("triggers inited")
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'project-body';
exports.register = function () {
    ko.components.register('c-project-body', {
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
