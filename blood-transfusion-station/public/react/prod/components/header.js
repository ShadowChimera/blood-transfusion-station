var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { logo } from './logo.js';

function NavItem(props) {
    var key = "navItem__" + props.link;

    return React.createElement(
        "li",
        { key: key, className: "list__item" },
        React.createElement(
            "a",
            { href: props.link, className: "link" },
            props.text
        )
    );
}

var Nav = function (_React$Component) {
    _inherits(Nav, _React$Component);

    function Nav() {
        _classCallCheck(this, Nav);

        return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).apply(this, arguments));
    }

    _createClass(Nav, [{
        key: "renderNavItem",
        value: function renderNavItem(nav) {
            return React.createElement(NavItem, { link: nav.link, text: nav.text });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var navItems = this.props.navItems.map(function (nav) {
                return _this2.renderNavItem(nav);
            });

            return React.createElement(
                "nav",
                { className: "main-nav" },
                React.createElement(
                    "ul",
                    { className: "list info-nav" },
                    navItems
                ),
                React.createElement(
                    "ul",
                    { className: "list profile-nav" },
                    React.createElement(
                        "li",
                        { key: "navItem__profile", className: "list__item" },
                        React.createElement(
                            "a",
                            { href: "#", className: "link active" },
                            "\u041E\u0441\u043E\u0431\u0438\u0441\u0442\u0438\u0439 \u043A\u0430\u0431\u0456\u043D\u0435\u0442"
                        )
                    )
                )
            );
        }
    }]);

    return Nav;
}(React.Component);

export var Header = function (_React$Component2) {
    _inherits(Header, _React$Component2);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "header",
                { className: "main-header" },
                logo,
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(Nav, { navItems: this.props.navItems })
                )
            );
        }
    }]);

    return Header;
}(React.Component);