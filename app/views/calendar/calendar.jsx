var moment    = require("moment");
var R         = require("ramda");
var React     = require("react");
var Bootstrap = require("react-bootstrap");
var SunCalc   = require("suncalc");

var Col   = Bootstrap.Col;
var Table = Bootstrap.Table;

var Components = require("../../components");

var colsNames = [
    "day",
    "sunrise",
    "sunset",
    "moonrise",
    "moonset",
    "apogee"
];

var getDayDetails = function (day) {
    var getHourAndMinute = function (date) {
        return moment(date).format("HH:mm");
    };
    var coords = {
        latitude: 47.554615,
        longitude: 7.59446
    };
    var sun = SunCalc.getTimes(day.toDate(), coords.latitude, coords.longitude);
    var moon = SunCalc.getMoonTimes(day.toDate(), coords.latitude, coords.longitude);
    var moonPos = SunCalc.getMoonPosition(day.toDate(), coords.latitude, coords.longitude);
    return {
        day: day.format("D"),
        sunrise: getHourAndMinute(sun.sunrise),
        sunset: getHourAndMinute(sun.sunset),
        moonrise: getHourAndMinute(moon.rise),
        moonset: getHourAndMinute(moon.set),
        apogee: moonPos.distance
    };
};

var getDaysDetails = function (dateInMonth) {
    var startOfMonth = dateInMonth.startOf("month");
    var getDay = function (el, idx) {
        console.log(idx);
        return getDayDetails(
            moment(startOfMonth).add(idx, "days")
        );
    };
    var m = new Array(startOfMonth.daysInMonth());
    return R.map.idx(getDay, m);
};

var getDayRow = function (dayDetail) {
    console.log(dayDetail);
    var cols = R.map(function (colName) {
        return (
            <td>
                {R.prop(colName, dayDetail)}
            </td>
        );
    }, colsNames);
    return (
        <tr>
            {cols}
        </tr>
    );
};

var getDaysRows = function (dayInMonth) {
    return R.map(
        getDayRow,
        getDaysDetails(dayInMonth)
    );
};

var Calendar = React.createClass({
    getInitialState: function () {
        return {
            month: 6,
            year: 2015
        };
    },
    getHeadRow: function () {
        var cells = colsNames.map(function (el) {
            return (
                <th key={el}>
                    {el}
                </th>
            );
        });
        return (
            <tr>
                {cells}
            </tr>
        );
    },
    getBodyRows: function () {
        return getDaysRows(
            moment().add(1, "month")
        );
    },
    render: function () {
        return (
            <div className="av-calendar">
                <Col xs={12}>
                    <Table responsive>
                        <thead>
                            {this.getHeadRow()}
                        </thead>
                        <tbody>
                            {this.getBodyRows()}
                        </tbody>
                    </Table>
                </Col>
            </div>
        );
    }
});

module.exports = Calendar;
