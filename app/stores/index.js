var ErrorStore          = require("./error.jsx");
var UsersStore          = require("./users.jsx");

module.exports = {
    ErrorStore: new ErrorStore(),
    UsersStore: new UsersStore()
};
