var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function HistoryItem(props) {
    var link = "/my-tests?test-id=" + props.testId;

    // const components = props.components.map((component) => {
    //     return <div>component</div>
    // })

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
            { className: "blood-group" },
            props.bloodGroup
        ),
        React.createElement(
            "div",
            { className: "blood-component" },
            props.component
        ),
        React.createElement(
            "div",
            { className: "count" },
            props.count
        ),
        React.createElement(
            "div",
            { className: "status" },
            props.status
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
        value: function renderHistoryItems(request) {
            return React.createElement(HistoryItem, {
                date: request.date,
                bloodGroup: request.bloodGroup,
                component: request.component,
                count: request.count,
                status: request.status
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var historyItems = this.props.requests.map(function (request) {
                return _this2.renderHistoryItems(request);
            });

            return React.createElement(
                "ul",
                { className: "list history h-5 h-secondary" },
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
                            "\u0413\u0440\u0443\u043F\u0430 \u043A\u0440\u043E\u0432\u0456"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "header__item" },
                        React.createElement(
                            "div",
                            { className: "value" },
                            "\u041A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "header__item" },
                        React.createElement(
                            "div",
                            { className: "value" },
                            "\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "header__item" },
                        React.createElement(
                            "div",
                            { className: "value" },
                            "\u0421\u0442\u0430\u0442\u0443\u0441"
                        )
                    )
                ),
                historyItems
            );
        }
    }]);

    return History;
}(React.Component);

export var MyRequests = function (_React$Component2) {
    _inherits(MyRequests, _React$Component2);

    function MyRequests(props) {
        _classCallCheck(this, MyRequests);

        var _this3 = _possibleConstructorReturn(this, (MyRequests.__proto__ || Object.getPrototypeOf(MyRequests)).call(this, props));

        _this3.state = {
            requests: []
        };

        _this3.loadRequests();
        return _this3;
    }

    _createClass(MyRequests, [{
        key: "handleLinkClick",
        value: function handleLinkClick(event, link, id) {
            this.props.onLinkClick(event, link, id);
        }
    }, {
        key: "loadRequests",
        value: function loadRequests() {
            var _this4 = this;

            fetch('/api/hospital/blood-requests/get-blood-requests', {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);

                _this4.setState({
                    requests: data.result
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(History, { requests: this.state.requests })
            );
        }
    }]);

    return MyRequests;
}(React.Component);