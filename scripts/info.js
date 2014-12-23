//////////////////
// Dependencies //
//////////////////

var chalk      = require("chalk");
var changeCase = require("change-case");
var clear      = require("cli-clear");
var _          = require("lodash");
var moment     = require("moment");



//////////////////////
// Drawing function //
//////////////////////

var textBox = function (text, width, alignment, paddingChar) {
    if (text.length > width) {
        return text.slice(0, width);
    }
    var padding = new Array((width - text.length) + 1).join(paddingChar || " ");
    if (alignment === "right") {
        return padding + text;
    }
    if (alignment === "center") {
        var paddingLeft;
        var paddingRight;
        if (padding.length % 2) {
            paddingLeft = (padding.length + 1) / 2;
            paddingRight = (padding.length - 1) / 2;
        } else {
            paddingLeft = padding.length / 2;
            paddingRight = padding.length / 2;
        }
        return paddingLeft + text + paddingRight;
    }
    return text + padding;
};

var printServerInfo = function () {
    if (!info.server.startedAt) {
        console.log(chalk.bgYellow.white.bold(" starting server "));
        console.log();
        return;
    }
    var infoLine = " ";
    infoLine += chalk.green.bold(info.server.startedAt.format("HH:mm:ss"));
    infoLine += " server started at ";
    infoLine += chalk.blue.bold("http://localhost:8080");
    console.log(infoLine);
    console.log();
};

var printTasksInfo = function () {
    var maxLength = _.reduce(info.tasks, function (acc, task) {
        return Math.max(task.name.length, acc);
    }, 0);
    _.forEach(info.tasks, function (task) {

        var style = chalk.bold.white;
        if (task.status === "started") {
            style = style.bgYellow;
        } else if (task.status === "ended") {
            style = style.bgGreen;
        } else if (task.status === "errored") {
            style = style.bgRed;
        } else {
            style = style.bgBlue;
        }
        name = " " + textBox(task.name, maxLength) + " ";
        name = style(name);

        var message = " ";
        if (task.status === "started") {
            message += "building";
        } else if (task.status === "ended") {
            var delta = task.endedAt.valueOf() - task.startedAt.valueOf();
            message += "last built at " + task.endedAt.format("HH:mm:ss") + " in " + delta + "ms";
        } else if (task.status === "errored") {
            message += chalk.red(task.error.plugin) + " failed: " + chalk.red(task.error.message.trim());
        }

        console.log(name + message);
    });
};


var draw = function () {
    clear();
    printServerInfo();
    printTasksInfo();
    console.log();
    console.log("press ctrl-c to quit");
};



////////////////////////////
// Info-setting functions //
////////////////////////////

var info = {
    tasks: {},
    server: {
        connectedClients: 0
    }
};

var serverStart = function () {
    info.server.startedAt = moment();
    draw();
};

var clientConnect = function () {
    info.server.connectedClients += 1;
    draw();
};

var clientDisconnect = function () {
    info.server.connectedClient -= 1;
    draw();
};

var taskStart = function (task) {
    if (!info[task]) {
        info.tasks[task] = {
            name: changeCase.sentenceCase(task)
        };
    }
    _.extend(info.tasks[task], {
        status: "started",
        startedAt: moment()
    });
    draw();
};

var taskEnd = function (task) {
    if (!info.tasks[task]) {
        info.tasks[task] = {
            name: changeCase.sentenceCase(task)
        };
    }
    _.extend(info.tasks[task], {
        status: "ended",
        endedAt: moment()
    });
    draw();
};

var taskError = function (task, err) {
    if (!info.tasks[task]) {
        info.tasks[task] = {
            name: changeCase.sentenceCase(task)
        };
    }
    _.extend(info.tasks[task], {
        status: "errored",
        erroredAt: moment(),
        error: err
    });
    draw();
};



////////////
// Export //
////////////

module.exports = {
    serverStart:      serverStart,
    clientConnect:    clientConnect,
    clientDisconnect: clientDisconnect,
    taskStart:        taskStart,
    taskEnd:          taskEnd,
    taskError:        taskError
};
