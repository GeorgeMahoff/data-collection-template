/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self._repository = params.context.repositories['campaign'];
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});
    self.isEdit = ko.observable(undefined);

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'form-new-campaign';

ViewModel.prototype.createNewCampaign = function () {
    var self = this;
    var packet = {
        packet: self.output
    };
    if (this.isEdit()){
        packet.url = self.url;
        this._repository.update(packet)
            .then(function() {
                self.context.events['ev-list-campaign-selected'](self.context, {id: self.url});
            })
            .catch(function (e) {
                self.errors(e.responseJSON.error)
            });
    }else {
        this._repository.insert(packet)
            .then(function(data) {
                self.context.events['ev-list-campaign-selected'](self.context, {id: data});
            })
            .catch(function (e) {
                var json = e.responseJSON || {};
                self.errors(json.error)
            });
    }
};

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        id: this.input['id'],
        'annotation_replica': this.input['annotation_replica'],
        'annotation_size': this.input['annotation_size'],
        'name': this.input['name'],
        'selection_replica': this.input['selection_replica'],
        'threshold': this.input['threshold']
    };
    var self = this,
        fields = {
            'annotation_replica': ko.observable(this.input['annotation_replica']),
            'annotation_size': ko.observable(this.input['annotation_size']),
            'name': ko.observable(this.input['name']),
            'selection_replica': ko.observable(this.input['selection_replica']),
            'threshold': ko.observable(this.input['threshold'])
        },
        errors = {
            'annotation_replica': ko.observable(this.input['annotation_replica-error']),
            'annotation_size': ko.observable(this.input['annotation_size-error']),
            'name': ko.observable(this.input['name-error']),
            'selection_replica': ko.observable(this.input['selection_replica-error']),
            'threshold': ko.observable(this.input['threshold-error'])
        };
    fields['annotation_replica'].subscribe(function (value) {
        self.output['annotation_replica'] = value;
    });
    fields['annotation_size'].subscribe(function (value) {
        self.output['annotation_size'] = value;
    });
    fields['name'].subscribe(function (value) {
        self.output['name'] = value;
    });
    fields['selection_replica'].subscribe(function (value) {
        self.output['selection_replica'] = value;
    });
    fields['threshold'].subscribe(function (value) {
        self.output['threshold'] = value;
    });
    this.fields(fields);
    this.errors(errors);
    this.url = this.input['id'];
    this.isEdit(!!this.url);
    // this.isEdit(!!this.input['id']);
    this.status('computed');
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.isEdit(undefined);
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

exports.register = function () {
    ko.components.register('c-form-new-campaign', {
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
