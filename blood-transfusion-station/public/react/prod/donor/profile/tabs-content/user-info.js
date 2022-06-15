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

    if (props.isEditable) {
        usernameElement = React.createElement("input", {
            type: "text",
            name: "username",
            className: "input secondary username",
            value: props.username,
            placeholder: "\u0412\u0430\u0448\u0435 \u0456\u043C'\u044F",
            onChange: function onChange(event) {
                return props.onInputChange(event, 'username');
            }
        });
    }

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

    var bloodGroup = React.createElement(
        "div",
        { className: "helper" },
        "\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E"
    );

    if (props.bloodGroup) {
        bloodGroup = React.createElement(
            "ul",
            { id: "blood-group", className: "list" },
            React.createElement(
                "li",
                { className: "list__item" },
                React.createElement(
                    "span",
                    { className: "value" },
                    props.bloodGroup.group
                )
            ),
            React.createElement(
                "li",
                { className: "list__item" },
                React.createElement(
                    "span",
                    { className: "value" },
                    props.bloodGroup.rh
                )
            ),
            React.createElement(
                "li",
                { className: "list__item" },
                React.createElement(
                    "span",
                    { className: "value" },
                    props.bloodGroup.kell
                )
            )
        );
    }

    return React.createElement(
        "header",
        { className: "profile__header", id: "profile-header-root" },
        avatar,
        usernameElement,
        React.createElement(
            "div",
            { className: "blood-group-container" },
            React.createElement(
                "div",
                { className: "label" },
                "\u0413\u0440\u0443\u043F\u0430 \u043A\u0440\u043E\u0432\u0456"
            ),
            bloodGroup
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
                        placeholder: "\u041F\u043E\u0448\u0442\u0430",
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
                        placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
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
                avatarSrc: props.avatarSrc,
                bloodGroup: props.bloodGroup,
                phone: '',
                email: '',
                oldPassword: '',
                password: '',
                repeatPassword: ''
            },
            backup: {}
        };

        for (var key in _this.state.userInfo) {
            _this.state.backup[key] = _this.state.userInfo[key];
        }
        return _this;
    }

    _createClass(UserInfo, [{
        key: "handleInputChange",
        value: function handleInputChange(event, inputName) {
            var curUserInfo = this.state.userInfo;
            var newUserInfo = {
                username: curUserInfo.username,
                avatarSrc: curUserInfo.avatarSrc,
                bloodGroup: curUserInfo.bloodGroup,
                phone: this.state.userInfo.phone,
                email: this.state.userInfo.email,
                oldPassword: this.state.userInfo.oldPassword,
                password: this.state.userInfo.password,
                repeatPassword: this.state.userInfo.repeatPassword
            };
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
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(Header, {
                    isEditable: this.state.isEditable,
                    username: this.state.userInfo.username,
                    avatarSrc: this.state.userInfo.avatarSrc,
                    bloodGroup: this.state.userInfo.bloodGroup,
                    onInputChange: function onInputChange(event, inputName) {
                        _this2.handleInputChange(event, inputName);
                    }
                }),
                React.createElement(ContactsSection, {
                    email: this.state.userInfo.email,
                    phone: this.state.userInfo.phone,
                    onInputChange: function onInputChange(event, inputName) {
                        _this2.handleInputChange(event, inputName);
                    }
                }),
                React.createElement(PasswordSection, {
                    oldPassword: this.state.userInfo.oldPassword,
                    password: this.state.userInfo.password,
                    repeatPassword: this.state.userInfo.repeatPassword,
                    onInputChange: function onInputChange(event, inputName) {
                        _this2.handleInputChange(event, inputName);
                    }
                }),
                React.createElement(ControlPanel, {
                    onResetClick: function onResetClick(event) {
                        _this2.handleResetClick(event);
                    },
                    onSaveClick: function onSaveClick(event) {
                        _this2.handleSaveClick(event);
                    }
                })
            );
        }
    }]);

    return UserInfo;
}(React.Component);