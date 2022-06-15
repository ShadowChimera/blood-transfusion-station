var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { logo } from './logo.js';

function Tab(props) {
    var icon = '';

    if (props.icon) {
        icon = React.createElement(
            'span',
            { className: 'material-symbols-outlined' },
            props.icon
        );
    }

    var className = 'link';

    if (props.isActive) {
        className += ' active';
    }

    var key = 'tab__' + props.link;

    return React.createElement(
        'li',
        { key: key, className: 'list__item' },
        React.createElement(
            'a',
            {
                href: props.link,
                className: className,
                onClick: function onClick(event) {
                    if (props.onClick) {
                        props.onClick(event, props.link);
                    }
                }
            },
            icon,
            React.createElement(
                'span',
                { className: 'link-text' },
                props.text
            )
        )
    );
}

export var SideBar = function (_React$Component) {
    _inherits(SideBar, _React$Component);

    function SideBar() {
        _classCallCheck(this, SideBar);

        return _possibleConstructorReturn(this, (SideBar.__proto__ || Object.getPrototypeOf(SideBar)).apply(this, arguments));
    }

    _createClass(SideBar, [{
        key: 'renderTab',
        value: function renderTab(tab, activeTab, _onClick) {
            var isActive = false;
            if (tab.link === activeTab) {
                isActive = true;
            }

            return React.createElement(Tab, {
                link: tab.link,
                isActive: isActive,
                icon: tab.icon,
                text: tab.text,
                onClick: function onClick(event, link) {
                    return _onClick(event, link);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var tabs = this.props.tabs.map(function (tab) {
                var onClick = _this2.props.onClick;
                return _this2.renderTab(tab, _this2.props.activeTab, onClick);
            });

            return React.createElement(
                'aside',
                { className: 'side-bar' },
                logo,
                React.createElement(
                    'ul',
                    { className: 'list' },
                    tabs,
                    React.createElement('li', { key: 'spacer', className: 'spacer' }),
                    React.createElement(
                        'li',
                        { key: 'logoutButton', className: 'list__item' },
                        React.createElement(
                            'button',
                            { name: 'logout', className: 'button' },
                            React.createElement(
                                'span',
                                { className: 'material-symbols-outlined' },
                                'logout'
                            ),
                            React.createElement(
                                'span',
                                { className: 'button-text' },
                                '\u0412\u0438\u0445\u0456\u0434'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SideBar;
}(React.Component);