var React   = require("react");
var Router  = require("react-router");

// Flux
var flux = require("./singletons/flux.js");

// Routing
var DefaultRoute = Router.DefaultRoute;
var Route        = Router.Route;
var Views        = require("./views");

var routes = (
    <Route handler={Views.Root}>
        <Route name="postLogin" path="/" handler={Views.PostLogin}>
            <Route name="calendar" path="calendar/" handler={Views.Calendar} addHandlerKey={true} />
        </Route>
        <Route name="login" path="/login" handler={Views.Login} />
        <DefaultRoute handler={Views.Login} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler flux={flux} />, document.body);
});

window.React = React;
