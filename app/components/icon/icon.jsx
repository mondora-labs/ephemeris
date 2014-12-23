var React  = require("react");

var Icon = React.createClass({
    render: function () {
        var customClass = this.props.className ? this.props.className + " " : "";
        return (
            <i className={customClass + "fa fa-" + this.props.icon}></i>
        );
    }
});

module.exports = Icon;
