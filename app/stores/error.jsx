var Fluxxor = require("fluxxor");

var constants = require("../lib/constants.jsx");

var ErrorStore = Fluxxor.createStore({
    initialize: function () {
        this.error = null;
        this.bindActions(
            constants.ERROR_THROW, this.onErrorThrow,
            constants.ERROR_CLEAR, this.onErrorClear
        );
    },
    onErrorThrow: function (payload) {
        this.error = payload;
        this.emit("change");
    },
    onErrorClear: function (payload) {
        this.error = null;
        this.emit("change");
    },
    getError: function () {
        return this.error;
    }
});

module.exports = ErrorStore;
