/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['image'];
    self.context = params.context;
    self.status = ko.observable('');

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };

    self.onUpload = function (vm, evt) {
        self.output['image'] = evt.target.files[0];
    };
}

ViewModel.prototype.id = 'form-image-upload';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'url': this.input['url']
    };
    this.status('computed');
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.input = options.input || {};
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

ViewModel.prototype.uploadImage = function() {
    var self = this;
    console.log(self.output);
    this._repository.insert(self.output).then(function () {
        var packet = {
            'image': self.output['url']
        };
        self.context.events['ev-campaign-images'](self.context, packet);
    });
};

exports.register = function () {
    ko.components.register('c-form-image-upload', {
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
