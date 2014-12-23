var React  = require("react");
var Router = require("react-router");

var Link = Router.Link;

var Header = React.createClass({
    mixins: [Router.State],
    render: function () {
        return (
            <header className="ac-header">
                <Link to="upload">
                    Upload
                </Link>
                <Link to="unsorted">
                    Unsorted
                </Link>
            </header>
        );
    }
});

module.exports = Header;
