'use strict';
const path = require('path');
const request = require('request');
const protocol = (window.location.href.split('/') || ['http:'])[0];
const _ = require('lodash');
let texts = {};
let root = null;
console.log('protocol', protocol);

const init = function (localizationRoot) {
    root = localizationRoot.replace(/https?:/, '');
    console.log(root);
};

const load = filename => new Promise((resolve, reject) => {
    let fullPath = protocol + root + '/' + filename + '.json';
    request({
        url: fullPath,
        json: true
    }, function (error, response, body) {
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

const get = function (txtId) {
    return texts[txtId];
};

module.exports = {
    init,
    load,
    get
};

