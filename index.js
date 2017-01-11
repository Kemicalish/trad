'use strict';
const path = require('path');
const request = require('request');
const protocol = (window.location.href.split('/') || ['http:'])[0];
const _ = require('lodash');
let texts = {};
let root = null;

exports.init = function (localizationRoot) {
    root = localizationRoot.replace(/https?:/, '');
};

exports.load = filename => new Promise((resolve, reject) => {
    request(path.join(protocol + root, filename + '.json'), function (error, response, body) {
        if (!error && response.statusCode === 200) {
            texts = _.chain(body)
                .map(entry => [entry.id, entry.value])
                .fromPairs()
                .value();
            resolve(texts);
        } else if (error) {
            reject(error);
        } else {
            reject(response);
        }
        
    });
});

exports.get = function (txtId) {
    return texts[txtId];
};
