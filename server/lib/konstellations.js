var path = require('path');
var fs = require('fs');
var glob = require('glob');
var Q = require('q')


var createKonstellationObject = function (kConfig, filePath) {

    var filePathNormalized = path.normalize(filePath);
    var filePathNormalizedAndSplit = filePathNormalized.split(path.sep);

    if (filePathNormalizedAndSplit.length < 3) {
        var error = 'Expected path ' + filePath + ' to have 3 part format';
        console.error(error);
        throw new Error(error);
    }

    var dirIndex = filePathNormalizedAndSplit.length-3,
        konstIndex = filePathNormalizedAndSplit.length-2,
        indexIndex = filePathNormalizedAndSplit.length-1;
    var filePathInfo = {
        fontPagesDir: filePathNormalizedAndSplit[dirIndex],
        konstellationDir: filePathNormalizedAndSplit[konstIndex],
        indexFile: filePathNormalizedAndSplit[indexIndex]
    };

    var konstellationDirSplit = filePathInfo.konstellationDir.split('-', 1);
    var numString = konstellationDirSplit[0];
    var konstellationName = filePathInfo.konstellationDir.slice(numString.length + 2);
    var number = parseInt(numString, 10);
    if (isNaN(number)) {
        var error = 'Expected ' + numString + ' to be a number!';
        console.error(error);
        throw new Error(error);
    };

    var route = kConfig.fontsBaseRoute + '/' + filePathInfo.konstellationDir + '/' + filePathInfo.indexFile;
    var fontInfo = {
        konstellationNumString: numString,
        konstellationNumber: number,
        konstellation: filePathInfo.konstellationDir,
        konstellationName: konstellationName,
        konstellationPath: filePath,
        konstellationRoute: route
    };
    return fontInfo;
};


module.exports.getFonts = function (kConfig) {
    var deferred = Q.defer();
    console.log('kConfig: ' + JSON.stringify(kConfig));
    console.log('FONT GLOB: ' + kConfig.glob());
    glob(kConfig.glob(), undefined, function (error, fontPaths) {
        var fonts = [];
        if (error) {
            console.err('err', error);
            deferred.reject(new Error(error));
        } else {
            for (var i = 0; i < fontPaths.length; i++) {
                fonts.push(createKonstellationObject(kConfig, fontPaths[i]));
            }
            if (!fonts.length) {
                console.err('NO FONTS FOUND');
            }
            deferred.resolve(fonts);
        }
    });
    return deferred.promise;
}