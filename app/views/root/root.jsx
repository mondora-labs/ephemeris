var Fluxxor = require("fluxxor");
var React   = require("react");
var Router  = require("react-router");

var FluxMixin       = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Root = React.createClass({
    mixins: [
        FluxMixin,
        StoreWatchMixin(
            "ErrorStore",
            "UsersStore"
        )
    ],
    getStateFromFlux: function () {
        return {
            error: this.props.flux.store("ErrorStore").getError(),
            users: this.props.flux.store("UsersStore").getUsers()
        };
    },
    render: function () {
        return (
            <Router.RouteHandler
                flux={this.props.flux}
                error={this.state.error}
                users={this.state.users}
            />
        );
    }
});

module.exports = Root;
