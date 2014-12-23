//////////////////
// Deoendencies //
//////////////////

var BPromise    = require("bluebird");
var connect     = require("connect");
var inject      = require("connect-inject");
var WebSocket   = require("faye-websocket");
var fs          = require("fs");
var http        = require("http");
var _           = require("lodash");
var serveStatic = require("serve-static");



//////////
// Info //
//////////

var info = require("./info.js");



//////////////////
// Server setup //
//////////////////

var reqHandler = connect()
    .use(function (req, res, next) {
        if (req.url.indexOf("/assets/") === -1) {
            req.url = "/";
        }
        next();
    })
    .use(inject({
        snippet: "<script>" + fs.readFileSync("scripts/reload.js") + "</script>"
    }))
    .use(serveStatic("builds/web.dev"));

var ws = {
    sockets: {},
    broadcast: function (msg) {
        msg = JSON.stringify(msg);
        _.forEach(ws.sockets, function (socket) {
            socket.send(msg);
        });
    }
};

var wsHandler = function (req, sock, body) {
    if (WebSocket.isWebSocket(req)) {
        var id = _.uniqueId();
        info.clientConnect();
        ws.sockets[id] = new WebSocket(req, sock, body).on("close", function () {
            delete ws.sockets[id];
            info.clientDisconnect();
        });
    }
};

http.createServer()
    .on("request", reqHandler)
    .on("upgrade", wsHandler)
    .on("listening", info.serverStart)
    .listen(8080);



//////////////////////////////
// Rebuilding and reloading //
//////////////////////////////

var build = require("./build.js");
var watch = require("./watch.js");

_.keys(build).forEach(function (key) {
    var doBuild = function () {
        info.taskStart(key);
        return build[key]("web.dev")
            .then(function () {
                info.taskEnd(key);
            })
            .catch(function (err) {
                info.taskError(key, err);
            });
    };
    doBuild();
    watch[key]().on("change", function () {
        doBuild().then(function () {
            ws.broadcast({
                action: "reload"
            });
        });
    });
});
