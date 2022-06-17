var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Header(props) {
    var usernameElement = React.createElement(
        "div",
        { className: "username" },
        props.username
    );

    var avatar = React.createElement(
        "div",
        { className: "avatar" },
        React.createElement(
            "span",
            { className: "material-symbols-outlined" },
            "person"
        )
    );

    if (props.avatarSrc) {
        avatar = React.createElement(
            "div",
            { className: "avatar" },
            React.createElement("img", null)
        );
    }

    return React.createElement(
        "header",
        { className: "profile__header", id: "profile-header-root" },
        avatar,
        usernameElement,
        React.createElement(
            "div",
            { className: "address-container" },
            React.createElement(
                "div",
                { className: "label" },
                "\u0410\u0434\u0440\u0435\u0441"
            ),
            props.address
        )
    );
}

function ContactsSection(props) {
    return React.createElement(
        "section",
        { className: "section" },
        React.createElement(
            "h1",
            { className: "title" },
            "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F"
        ),
        React.createElement(
            "ul",
            { className: "list" },
            React.createElement(
                "li",
                { className: "list__item" },
                React.createElement(
                    "div",
                    { className: "input-container" },
                    React.createElement(
                        "span",
                        { className: "material-symbols-outlined" },
                        "mail"
                    ),
                    React.createElement("input", {
                        type: "email",
                        name: "email",
                        className: "input",
                        value: props.email,
                        placeholder: "\u041F\u043E\u0448\u0442\u0430 \u0437\u0430\u0432\u0456\u0434\u0443\u0432\u0430\u0447\u0430 \u043B\u0456\u043A\u0430\u0440\u043D\u0456",
                        onChange: function onChange(event) {
                            return props.onInputChange(event, 'email');
                        }
                    })
                )
            ),
            React.createElement(
                "li",
                { className: "list__item" },
                React.createElement(
                    "div",
                    { className: "input-container" },
                    React.createElement(
                        "span",
                        { className: "material-symbols-outlined" },
                        "phone"
                    ),
                    React.createElement("input", {
                        type: "phone",
                        name: "phone",
                        className: "input",
                        value: props.phone,
                        placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u0437\u0430\u0432\u0456\u0434\u0443\u0432\u0430\u0447\u0430 \u043B\u0456\u043A\u0430\u0440\u043D\u0456",
                        onChange: function onChange(event) {
                            return props.onInputChange(event, 'phone');
                        }
                    })
                )
            )
        )
    );
}

function PasswordSection(props) {
    return React.createElement(
        "section",
        { className: "section" },
        React.createElement(
            "h1",
            { className: "title" },
            "\u0417\u043C\u0456\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044E"
        ),
        React.createElement(
            "ul",
            { className: "list" },
            React.createElement(
                "li",
                { className: "list__item" },
                React.createElement(
                    "div",
                    { className: "input-container" },
                    React.createElement(
                        "span",
                        { className: "material-symbols-outlined" },
                        "lock_open"
                    ),
                    React.createElement("input", {
                        type: "password",
                        name: "old-password",
                        className: "input",
                        placeholder: "\u0421\u0442\u0430\u0440\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C",
                        value: props.oldPassword,
                        onChange: function onChange(event) {
                            return props.onInputChange(event, 'oldPassword');
                        }
                    })
                )
            ),
            React.createElement(
                "li",
                { className: "list__item" },
                React.createElement(
                    "div",
                    { className: "input-container" },
                    React.createElement(
                        "span",
                        { className: "material-symbols-outlined" },
                        "lock"
                    ),
                    React.createElement("input", {
                        type: "password",
                        name: "password",
                        className: "input",
                        placeholder: "\u041D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C",
                        value: props.password,
                        onChange: function onChange(event) {
                            return props.onInputChange(event, 'password');
                        }
                    })
                )
            ),
            React.createElement(
                "li",
                { className: "list__item" },
                React.createElement(
                    "div",
                    { className: "input-container" },
                    React.createElement(
                        "span",
                        { className: "material-symbols-outlined" },
                        "lock"
                    ),
                    React.createElement("input", {
                        type: "password",
                        name: "repeat-password",
                        className: "input",
                        placeholder: "\u041F\u043E\u0432\u0442\u043E\u0440 \u043F\u0430\u0440\u043E\u043B\u044E",
                        value: props.repeatPassword,
                        onChange: function onChange(event) {
                            return props.onInputChange(event, 'repeatPassword');
                        }
                    })
                )
            )
        )
    );
}

function ControlPanel(props) {
    return React.createElement(
        "div",
        { className: "control-buttons" },
        React.createElement(
            "button",
            {
                className: "button flat",
                name: "reset",
                onClick: function onClick(event) {
                    return props.onResetClick(event);
                }
            },
            React.createElement(
                "span",
                { className: "material-symbols-outlined" },
                "restart_alt"
            ),
            React.createElement(
                "span",
                { className: "button-text" },
                "\u0421\u043A\u0438\u043D\u0443\u0442\u0438"
            )
        ),
        React.createElement(
            "button",
            {
                className: "button flat",
                name: "save",
                onClick: function onClick(event) {
                    return props.onSaveClick(event);
                }
            },
            React.createElement(
                "span",
                { className: "material-symbols-outlined" },
                "upgrade"
            ),
            React.createElement(
                "span",
                { className: "button-text" },
                "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438"
            )
        )
    );
}

export var UserInfo = function (_React$Component) {
    _inherits(UserInfo, _React$Component);

    function UserInfo(props) {
        _classCallCheck(this, UserInfo);

        var _this = _possibleConstructorReturn(this, (UserInfo.__proto__ || Object.getPrototypeOf(UserInfo)).call(this, props));

        _this.state = {
            isEditable: false,
            userInfo: {
                username: '',
                phone: '',
                email: '',
                address: '',
                oldPassword: '',
                password: '',
                repeatPassword: ''
            },
            backup: {}
        };

        _this.loadUserInfo();
        return _this;
    }

    _createClass(UserInfo, [{
        key: "loadUserInfo",
        value: function loadUserInfo() {
            var _this2 = this;

            fetch('/api/hospital/user-info/get-user-info', {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);

                data.result.oldPassword = '';
                data.result.password = '';
                data.result.repeatPassword = '';

                var backup = {};

                for (var key in data.result) {
                    backup[key] = data.result[key];
                }

                _this2.setState({
                    userInfo: data.result,
                    backup: backup
                });
            });
        }
    }, {
        key: "handleInputChange",
        value: function handleInputChange(event, inputName) {
            var curUserInfo = this.state.userInfo;

            var newUserInfo = {};

            for (var key in curUserInfo) {
                newUserInfo[key] = curUserInfo[key];
            }

            newUserInfo[inputName] = event.target.value;

            this.setState({
                userInfo: newUserInfo
            });
        }
    }, {
        key: "handleResetClick",
        value: function handleResetClick(event) {
            var newUserInfo = {};
            for (var key in this.state.backup) {
                newUserInfo[key] = this.state.backup[key];
            }

            this.setState({
                userInfo: newUserInfo
            });
        }
    }, {
        key: "handleSaveClick",
        value: function handleSaveClick(event) {
            console.log('saving...');
            var newBackup = {};

            for (var key in this.state.userInfo) {
                newBackup[key] = this.state.userInfo[key];
            }

            this.setState({
                backup: newBackup
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(Header, {
                    username: this.state.userInfo.username,
                    address: this.state.userInfo.address,
                    onInputChange: function onInputChange(event, inputName) {
                        _this3.handleInputChange(event, inputName);
                    }
                }),
                React.createElement(ContactsSection, {
                    email: this.state.userInfo.email,
                    phone: this.state.userInfo.phone,
                    onInputChange: function onInputChange(event, inputName) {
                        _this3.handleInputChange(event, inputName);
                    }
                }),
                React.createElement(PasswordSection, {
                    oldPassword: this.state.userInfo.oldPassword,
                    password: this.state.userInfo.password,
                    repeatPassword: this.state.userInfo.repeatPassword,
                    onInputChange: function onInputChange(event, inputName) {
                        _this3.handleInputChange(event, inputName);
                    }
                }),
                React.createElement(ControlPanel, {
                    onResetClick: function onResetClick(event) {
                        _this3.handleResetClick(event);
                    },
                    onSaveClick: function onSaveClick(event) {
                        _this3.handleSaveClick(event);
                    }
                })
            );
        }
    }]);

    return UserInfo;
}(React.Component);