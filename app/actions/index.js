var R = require("ramda");

var actions = {};

actions = R.mixin(actions, require("./error.jsx"));
actions = R.mixin(actions, require("./users.jsx"));

module.exports = actions;
