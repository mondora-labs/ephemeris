var Fluxxor   = require("fluxxor");
var Immutable = require("immutable");

var constants = require("../lib/constants.jsx");

var UsersStore = Fluxxor.createStore({
    initialize: function () {
        this.users = Immutable.Map();
        this.bindActions(
            constants.USER_INSERT, this.onUserInsert,
            constants.USER_REMOVE, this.onUserRemove
        );
    },
    onUserInsert: function (payload) {
        this.users = this.users.set(
            payload.userId,
            Immutable.fromJS(payload.user)
        );
        this.emit("change");
    },
    onUserRemove: function (payload) {
        this.users = this.users.set(
            payload.userId,
            null
        );
        this.emit("change");
    },
    getUserById: function (userId) {
        return this.users.get(userId);
    },
    getUsers: function () {
        return this.users;
    }
});

module.exports = UsersStore;
