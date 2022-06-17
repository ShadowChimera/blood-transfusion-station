var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function HistoryItem(props) {
    var link = "/my-tests?test-id=" + props.testId;
    return React.createElement(
        "li",
        { key: props.name, className: "list__item history__item" },
        React.createElement(
            "div",
            { className: "date" },
            props.date
        ),
        React.createElement(
            "div",
            { className: "express-test" },
            props.expressTest
        ),
        React.createElement(
            "div",
            { className: "lab-test" },
            props.labTest
        ),
        React.createElement(
            "div",
            { className: "details" },
            React.createElement(
                "button",
                {
                    className: "button secondary",
                    name: "open",
                    onClick: function onClick(event) {
                        return props.onTestClick(event, props.fullTest, props.date);
                    }
                },
                React.createElement(
                    "span",
                    { className: "material-symbols-outlined" },
                    "info"
                ),
                React.createElement(
                    "span",
                    { className: "button-text" },
                    "\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438"
                )
            )
        )
    );
}

var History = function (_React$Component) {
    _inherits(History, _React$Component);

    function History() {
        _classCallCheck(this, History);

        return _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).apply(this, arguments));
    }

    _createClass(History, [{
        key: "renderHistoryItems",
        value: function renderHistoryItems(test) {
            var _this2 = this;

            return React.createElement(HistoryItem, {
                date: test.date,
                expressTest: test.expressTest,
                labTest: test.labTest,
                fullTest: test.fullTest,
                onTestClick: function onTestClick(event, test, title) {
                    return _this2.props.onTestClick(event, test, title);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var historyItems = this.props.tests.map(function (test) {
                return _this3.renderHistoryItems(test);
            });

            return React.createElement(
                "ul",
                { className: "list history h-tertiary" },
                React.createElement(
                    "header",
                    { className: "history__header history__item" },
                    React.createElement(
                        "div",
                        { className: "header__item" },
                        React.createElement(
                            "div",
                            { className: "value" },
                            "\u0414\u0430\u0442\u0430"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "header__item" },
                        React.createElement(
                            "div",
                            { className: "value" },
                            "\u0415\u043A\u0441\u043F\u0440\u0435\u0441-\u0442\u0435\u0441\u0442"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "header__item" },
                        React.createElement(
                            "div",
                            { className: "value" },
                            "\u041B\u0430\u0431\u043E\u0440\u0430\u0442\u043E\u0440\u043D\u0438\u0439 \u0442\u0435\u0441\u0442"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "header__item" },
                        React.createElement(
                            "div",
                            { className: "value" },
                            "\u041F\u043E\u0434\u0440\u043E\u0431\u0438\u0446\u0456"
                        )
                    )
                ),
                historyItems
            );
        }
    }]);

    return History;
}(React.Component);

var Table = function (_React$Component2) {
    _inherits(Table, _React$Component2);

    function Table() {
        _classCallCheck(this, Table);

        return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
    }

    _createClass(Table, [{
        key: "renderColumn",
        value: function renderColumn(data) {
            var isHeader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (isHeader) {
                return React.createElement(
                    "th",
                    { className: "column" },
                    data
                );
            }

            return React.createElement(
                "td",
                { className: "column" },
                data
            );
        }
    }, {
        key: "renderRow",
        value: function renderRow(data) {
            var _this5 = this;

            var isHeader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var content = data.map(function (columnData) {
                return _this5.renderColumn(columnData, isHeader);
            });

            var className = 'row';

            if (isHeader) {
                className = 'header';
            }

            return React.createElement(
                "tr",
                { className: className },
                content
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            var header = this.renderRow(this.props.header, true);

            var content = this.props.data.map(function (rowData) {
                return _this6.renderRow(rowData);
            });

            return React.createElement(
                "table",
                { className: "table" },
                header,
                content
            );
        }
    }]);

    return Table;
}(React.Component);

var Test = function (_React$Component3) {
    _inherits(Test, _React$Component3);

    function Test(props) {
        _classCallCheck(this, Test);

        var _this7 = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

        _this7.state = JSON.parse(_this7.props.test);
        return _this7;
    }

    _createClass(Test, [{
        key: "loadTest",
        value: function loadTest() {
            var _this8 = this;

            fetch('/api/donor/donations/get-test-info', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ testId: this.props.testId })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                _this8.setState(data.result);
            });
        }
    }, {
        key: "handleBackClick",
        value: function handleBackClick(event) {
            this.props.onBackClick(event);
        }
    }, {
        key: "render",
        value: function render() {
            var _this9 = this;

            return React.createElement(
                "div",
                { className: "table-container" },
                React.createElement(
                    "header",
                    { className: "header control-header" },
                    React.createElement(
                        "button",
                        {
                            className: "button simple round",
                            name: "back",
                            onClick: function onClick(event) {
                                return _this9.handleBackClick(event);
                            }
                        },
                        React.createElement(
                            "span",
                            { className: "material-symbols-outlined" },
                            "arrow_back"
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: "header__text" },
                        this.props.title
                    )
                ),
                React.createElement(
                    "section",
                    { className: "section" },
                    React.createElement(
                        "h1",
                        { className: "title" },
                        "\u0415\u043A\u0441\u043F\u0440\u0435\u0441-\u0442\u0435\u0441\u0442"
                    ),
                    React.createElement(Table, {
                        header: this.state.express.header,
                        data: this.state.express.data
                    })
                ),
                React.createElement(
                    "section",
                    { className: "section" },
                    React.createElement(
                        "h1",
                        { className: "title" },
                        "\u041B\u0430\u0431\u043E\u0440\u0430\u0442\u043E\u0440\u043D\u0438\u0439-\u0442\u0435\u0441\u0442"
                    ),
                    React.createElement(Table, {
                        header: this.state.lab.header,
                        data: this.state.lab.data
                    })
                )
            );
        }
    }]);

    return Test;
}(React.Component);

export var MyTests = function (_React$Component4) {
    _inherits(MyTests, _React$Component4);

    function MyTests(props) {
        _classCallCheck(this, MyTests);

        var _this10 = _possibleConstructorReturn(this, (MyTests.__proto__ || Object.getPrototypeOf(MyTests)).call(this, props));

        _this10.state = {
            showTestInfo: false,
            testToShow: {},
            tests: []
        };

        _this10.loadTests();
        return _this10;
    }

    _createClass(MyTests, [{
        key: "handleTestClick",
        value: function handleTestClick(event, test) {
            var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            event.preventDefault();

            this.setState({
                showTestInfo: true,
                testToShow: {
                    title: title,
                    test: test
                }
            });

            // this.props.onTestClick(event, test)
        }
    }, {
        key: "handleBackClick",
        value: function handleBackClick(event) {
            this.setState({
                showTestInfo: false,
                testToShow: null
            });
        }
    }, {
        key: "loadTests",
        value: function loadTests() {
            var _this11 = this;

            fetch('/api/donor/donations/get-tests', {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);

                _this11.setState({
                    tests: data.result
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this12 = this;

            var content = '';
            if (this.state.showTestInfo) {
                content = React.createElement(Test, {
                    test: this.state.testToShow.test,
                    title: this.state.testToShow.title,
                    onBackClick: function onBackClick(event) {
                        return _this12.handleBackClick(event);
                    }
                });
            } else {
                content = React.createElement(History, {
                    tests: this.state.tests,
                    onTestClick: function onTestClick(event, test, title) {
                        return _this12.handleTestClick(event, test, title);
                    }
                });
            }

            return React.createElement(
                "div",
                { className: "container" },
                content
            );
        }
    }]);

    return MyTests;
}(React.Component);