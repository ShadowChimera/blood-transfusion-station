var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Header } from '../../components/header.js';
import { SideBar } from '../../components/profile-side-bar.js';
import { UserInfo } from './tabs-content/user-info.js';
import { MyRestrictions } from './tabs-content/my-restrictions.js';
import { MyDonations } from './tabs-content/my-donations.js';
import { MyTests } from './tabs-content/my-tests.js';

var Profile = function (_React$Component) {
    _inherits(Profile, _React$Component);

    function Profile(props) {
        _classCallCheck(this, Profile);

        var _this = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));

        _this.state = {
            mainNav: [{
                link: '/',
                text: '??????????????',
                type: 'link'
            }, {
                link: '/about/station',
                text: '?????? ??????????',
                type: 'link'
            }, {
                link: '/about/donation',
                text: '?????? ??????????????????',
                type: 'link'
            }],
            profileNav: [{
                link: '/appointment',
                text: '????????????????????',
                type: 'link button secondary tcolor'
            }, {
                link: '/profile',
                text: '?????????????????? ??????????????',
                type: 'link',
                isActive: true
            }],
            sideBar: {
                activeTab: '/profile',
                tabs: [{
                    link: '/profile',
                    icon: 'person',
                    text: '??????????????',
                    isActive: true
                }, {
                    link: '/my-restrictions',
                    icon: 'block',
                    text: '?????? ??????????????????'
                }, {
                    link: '/my-donations',
                    icon: 'water_drop',
                    text: '?????? ??????????????'
                }, {
                    link: '/my-tests',
                    icon: 'science',
                    text: '?????? ??????????????'
                }, {
                    link: '/notifications-settings',
                    icon: 'notifications',
                    text: '????????????????????????'
                }]
            },
            toOpenId: null
        };
        return _this;
    }

    _createClass(Profile, [{
        key: 'handleTabClick',
        value: function handleTabClick(event, link) {
            event.preventDefault();

            this.setState({
                sideBar: {
                    activeTab: link,
                    tabs: this.state.sideBar.tabs
                }
            });
        }
    }, {
        key: 'handleLinkForTestClick',
        value: function handleLinkForTestClick(event, link, id) {
            event.preventDefault();
            console.log(link);

            this.setState({
                sideBar: {
                    activeTab: '/my-tests',
                    tabs: this.state.sideBar.tabs
                },
                toOpenId: id
            });
        }
    }, {
        key: 'handleTestClick',
        value: function handleTestClick(event, test) {
            // event.preventDefault()
            console.log(test);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var mainContent = React.createElement(UserInfo, null);

            switch (this.state.sideBar.activeTab) {
                case '/profile':
                    mainContent = React.createElement(UserInfo, null);
                    break;
                case '/my-restrictions':
                    mainContent = React.createElement(MyRestrictions, null);
                    break;
                case '/my-donations':
                    mainContent = React.createElement(MyDonations, {
                        onLinkClick: function onLinkClick(event, link, id) {
                            return _this2.handleLinkForTestClick(event, link, id);
                        }
                    });
                    break;
                case '/my-tests':
                    mainContent = React.createElement(MyTests, {
                        testId: this.state.toOpenId,
                        onTestClick: function onTestClick(event, test) {
                            return _this2.handleTestClick(event, test);
                        }
                    });
                    break;
            }

            return React.createElement(
                'div',
                { className: 'body' },
                React.createElement(Header, {
                    navItems: this.state.mainNav,
                    profileNavItems: this.state.profileNav
                }),
                React.createElement(SideBar, {
                    tabs: this.state.sideBar.tabs,
                    activeTab: this.state.sideBar.activeTab,
                    onClick: function onClick(event, link) {
                        return _this2.handleTabClick(event, link);
                    }
                }),
                React.createElement(
                    'div',
                    { className: 'main-content profile' },
                    mainContent
                )
            );
        }
    }]);

    return Profile;
}(React.Component);

// ========================================

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Profile, null));