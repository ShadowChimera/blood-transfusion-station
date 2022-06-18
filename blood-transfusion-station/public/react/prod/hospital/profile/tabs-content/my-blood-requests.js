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
            { className: "donation-type" },
            props.donationType
        ),
        React.createElement(
            "div",
            { className: "test-result" },
            React.createElement(
                "span",
                { className: "test-result__text" },
                props.testResult
            ),
            React.createElement(
                "a",
                {
                    href: link,
                    className: "link test-result__link",
                    onClick: function onClick(event) {
                        props.onLinkClick(event, link, props.testId);
                    }
                },
                "\u0414\u043E\u043A\u043B\u0430\u0434\u043D\u0456\u0448\u0435"
            )
        ),
        React.createElement(
            "div",
            { className: "details" },
            props.details
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
        value: function renderHistoryItems(donation) {
            var _this2 = this;

            return React.createElement(HistoryItem, {
                date: donation.date,
                donationType: donation.donationType,
                testId: donation.testId,
                testResult: donation.testResult,
                details: donation.details,
                onLinkClick: function onLinkClick(event, link, id) {
                    return _this2.props.onLinkClick(event, link, id);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var historyItems = this.props.donations.map(function (donation) {
                return _this3.renderHistoryItems(donation);
            });

            return React.createElement(
                "ul",
                { className: "list history h-secondary" },
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
                            "\u0422\u0438\u043F \u0434\u043E\u043D\u0430\u0446\u0456\u0457"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "header__item" },
                        React.createElement(
                            "div",
                            { className: "value" },
                            "\u0410\u043D\u0430\u043B\u0456\u0437 \u043A\u0440\u043E\u0432\u0456"
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

export var MyDonations = function (_React$Component2) {
    _inherits(MyDonations, _React$Component2);

    function MyDonations(props) {
        _classCallCheck(this, MyDonations);

        var _this4 = _possibleConstructorReturn(this, (MyDonations.__proto__ || Object.getPrototypeOf(MyDonations)).call(this, props));

        _this4.state = {
            donations: []
        };

        _this4.loadDonations();
        return _this4;
    }

    _createClass(MyDonations, [{
        key: "handleLinkClick",
        value: function handleLinkClick(event, link, id) {
            this.props.onLinkClick(event, link, id);
        }
    }, {
        key: "loadDonations",
        value: function loadDonations() {
            var _this5 = this;

            fetch('/api/donor/donations/get-donations', {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);

                _this5.setState({
                    donations: data.result
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(History, {
                    donations: this.state.donations,
                    onLinkClick: function onLinkClick(event, link, id) {
                        return _this6.handleLinkClick(event, link, id);
                    }
                })
            );
        }
    }]);

    return MyDonations;
}(React.Component);