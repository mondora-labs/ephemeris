var BPromise   = require("bluebird");
var sh         = require("execSync");
var gulp       = require("gulp");
var gp         = require("gulp-load-plugins")();
var webpack    = require("webpack");

var buildTestIndex = function (target) {
    sh.run("mkdir -p builds/" + target + "/test/");
    return new BPromise(function (resolve, reject) {
        gulp.src("test/main.html")
        .pipe(gp.plumber(reject))
        .pipe(gp.rename("index.html"))
        .pipe(gulp.dest("builds/" + target + "/test/"))
        .on("end", resolve);
    });
};

var buildTestScripts = function (target) {
    sh.run("mkdir -p builds/" + target + "/test/");
    return new BPromise(function (resolve, reject) {
        webpack({
            entry: {
                test: "./test/main.jsx"
            },
            output: {
                filename: "builds/" + target + "/test/index.js"
            },
            module: {
                loaders: [{
                    test: /\.jsx$/,
                    loader: "jsx-loader"
                }]
            }
        }, function (err, stats) {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    });
};

var buildVendorScripts = function (target) {
    sh.run("mkdir -p builds/" + target + "/test/");
    return new BPromise(function (resolve, reject) {
        gulp.src("node_modules/mocha/mocha.js")
        .pipe(gulp.dest("builds/" + target + "/test/"))
        .on("end", resolve);
    });
};

var buildVendorStyles = function (target) {
    sh.run("mkdir -p builds/" + target + "/test/");
    return new BPromise(function (resolve, reject) {
        gulp.src("node_modules/mocha/mocha.css")
        .pipe(gulp.dest("builds/" + target + "/test/"))
        .on("end", resolve);
    });
};

buildTestIndex("web.dev");
buildTestScripts("web.dev");
buildVendorScripts("web.dev");
buildVendorStyles("web.dev");
