'use strict';
const fs = require('fs');
const path = require('path');

exports.init = function(localizedDirPath, localizedFilename) {
    fs.readFile(path.join(localizedDirPath, localizedFilename + '.json'), 'utf8', function(err, contents) {
        console.log(contents);
    });
};