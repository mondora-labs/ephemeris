var React  = require("react");
var Router = require("react-router");

var Link = Router.Link;

var Header = React.createClass({
    mixins: [Router.State],
    render: function () {
        return (
            <header className="ac-header">
            </header>
        );
    }
});

module.exports = Header;
