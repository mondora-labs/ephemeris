//////////////////
// Dependencies //
//////////////////

var gulp = require("gulp");



//////////////////////////////////
// App files watching functions //
//////////////////////////////////

var watchAppIndex = function () {
    return gulp.watch("app/main.html");
};

var watchAppScripts = function () {
    return gulp.watch(["app/**/*.jsx", "deps.json", "app/**/*.js"]);
};

var watchAppStyles = function () {
    return gulp.watch("app/**/*.scss");
};

var watchVendorStyles = function () {
    return gulp.watch("deps.json");
};

var watchVendorFonts = function () {
    return gulp.watch("deps.json");
};



////////////
// Export //
////////////

module.exports = {
    appIndex:     watchAppIndex,
    appScripts:   watchAppScripts,
    appStyles:    watchAppStyles,
    vendorStyles: watchVendorStyles,
    vendorFonts:  watchVendorFonts
};
