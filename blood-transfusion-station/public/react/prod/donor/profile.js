var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Header } from '../components/header.js';
import { SideBar } from '../components/profile-side-bar.js';

var Profile = function (_React$Component) {
    _inherits(Profile, _React$Component);

    function Profile(props) {
        _classCallCheck(this, Profile);

        var _this = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));

        _this.state = {
            mainNav: [{
                link: '/',
                text: 'Головна'
            }, {
                link: '/about/station',
                text: 'Про центр'
            }, {
                link: '/about/donation',
                text: 'Про донорство'
            }],
            sideBar: {
                tabs: [{
                    link: '/profile',
                    icon: 'person',
                    text: 'Профіль',
                    isActive: true
                }, {
                    link: '/my-restrictions',
                    icon: 'block',
                    text: 'Мої обмеження'
                }, {
                    link: '/my-donations',
                    icon: 'water_drop',
                    text: 'Мої донації'
                }, {
                    link: '/my-tests',
                    icon: 'science',
                    text: 'Мої аналізи'
                }, {
                    link: '/notifications-settings',
                    icon: 'notifications',
                    text: 'Повідомлення'
                }]
            }
        };
        return _this;
    }

    _createClass(Profile, [{
        key: 'handleTabClick',
        value: function handleTabClick(event, link) {
            event.preventDefault();

            var newTabs = this.state.sideBar.tabs.map(function (tab) {
                var newTab = {
                    link: tab.link,
                    icon: tab.icon,
                    text: tab.text
                };
                if (tab.link === link) {
                    newTab.isActive = true;
                }

                return newTab;
            });

            this.setState({
                sideBar: {
                    tabs: newTabs
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { className: 'body' },
                React.createElement(Header, { navItems: this.state.mainNav }),
                React.createElement(SideBar, {
                    tabs: this.state.sideBar.tabs,
                    onClick: function onClick(event, link) {
                        return _this2.handleTabClick(event, link);
                    }
                }),
                React.createElement('div', { className: 'main-content' })
            );
        }
    }]);

    return Profile;
}(React.Component);

// ========================================

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Profile, null));