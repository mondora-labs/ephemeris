var constants = require("../lib/constants.jsx");

var userInsert = function (userId, user) {
    this.dispatch(constants.USER_INSERT, {
        userId: user._id,
        user: user
    });
};

var userRemove = function (userId) {
    this.dispatch(constants.USER_REMOVE, {
        userId: userId
    });
};

module.exports = {
    userInsert: userInsert,
    userRemove: userRemove
};
