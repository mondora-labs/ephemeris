var React           = require("react");
var Router          = require("react-router");
var TransitionGroup = require("react/lib/ReactCSSTransitionGroup");

var Header     = require("../../components/header/header.jsx");
var ErrorModal = require("../../components/error-modal/error-modal.jsx");

var PostLogin = React.createClass({
    mixins: [
        Router.State
    ],
    render: function () {
        return (
            <div className="av-post-login">
                <Header />
                <TransitionGroup component="div" className="app-content" transitionName="swipe-view">
                    <Router.RouteHandler
                        key={this.getRoutes().reverse()[0].name}
                        flux={this.props.flux}
                        users={this.props.users}
                    />
                </TransitionGroup>
                <ErrorModal error={this.props.error} flux={this.props.flux} />
            </div>
        );
    }
});

module.exports = PostLogin;
