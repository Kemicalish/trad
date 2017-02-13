'use strict';

var path = require('path');
var request = require('request');
var protocol = (window.location.href.split('/') || ['http:'])[0];
var _ = require('lodash');
var texts = {};
var root = null;
console.log('protocol', protocol);

var init = function init(localizationRoot) {
    root = localizationRoot.replace(/https?:/, '');
    console.log(root);
};

var load = function load(filename) {
    return new Promise(function (resolve, reject) {
        var fullPath = protocol + root + '/' + filename + '.json';
        request({
            url: fullPath,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                texts = _.chain(body).map(function (entry) {
                    return [entry.id, entry.value];
                }).fromPairs().value();
                resolve(texts);
            } else if (error) {
                reject(error);
            } else {
                reject(response);
            }
        });
    });
};

var get = function get(txtId) {
    return texts[txtId];
};

module.exports = {
    init: init,
    load: load,
    get: get
};