var connect     = require("connect");
var http        = require("http");
var serveStatic = require("serve-static");

var requestHandler = connect()
    .use(function (req, res, next) {
        if (req.url.indexOf("/assets/") === -1) {
            req.url = "/";
        }
        next();
    })
    .use(serveStatic("builds/web.prod"));
var listeningHandler = function () {
    console.log("Server listening at http://0.0.0.0:8080");
};
http.createServer()
    .on("request", requestHandler)
    .on("listening", listeningHandler)
    .listen(8080, "0.0.0.0");
