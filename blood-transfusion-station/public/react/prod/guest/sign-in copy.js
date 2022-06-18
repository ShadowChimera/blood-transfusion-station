var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Header } from '../components/header.js';

function Input(props) {
    var className = 'input ';

    if (props.className) {
        className += props.className;
    }

    return React.createElement(
        'div',
        { className: 'input-container', type: props.type },
        React.createElement(
            'span',
            { className: 'material-symbols-outlined' },
            props.icon
        ),
        React.createElement('input', {
            type: props.type,
            name: props.name,
            className: className,
            value: props.value,
            placeholder: props.placeholder,
            onChange: function onChange(event) {
                return props.onChange(event, props.name);
            }
        }),
        React.createElement(
            'span',
            { className: 'unit' },
            props.unit
        )
    );
}

function Option(props) {
    var className = 'list__item option';

    return React.createElement(
        'li',
        {
            className: className,
            onClick: function onClick(event) {
                return props.onClick(event, props.value);
            }
        },
        React.createElement(
            'div',
            { name: props.name },
            props.value
        )
    );
}

var Select = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.state = {
            isActive: false,
            selected: _this.props.value,
            options: _this.props.options
        };
        return _this;
    }

    _createClass(Select, [{
        key: 'handleClick',
        value: function handleClick(event) {
            this.setState({
                isActive: !this.state.isActive
            });
        }
    }, {
        key: 'handleOptionClick',
        value: function handleOptionClick(event, value) {
            this.setState({
                selected: value
            });

            this.props.onChange(event, value);
        }
    }, {
        key: 'renderOption',
        value: function renderOption(name, value) {
            var _this2 = this;

            return React.createElement(Option, {
                name: name,
                value: value,
                onClick: function onClick(event, value) {
                    return _this2.handleOptionClick(event, value);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var options = this.props.options.map(function (option) {
                return _this3.renderOption(option.name, option.value);
            });

            var active = '';

            if (this.state.isActive) {
                active = ' active';
            }

            return React.createElement(
                'div',
                {
                    className: 'select' + active,
                    onClick: function onClick(event) {
                        return _this3.handleClick(event);
                    }
                },
                React.createElement(
                    'div',
                    { className: 'input-container' + active },
                    React.createElement(
                        'span',
                        { className: 'material-symbols-outlined' },
                        this.props.icon
                    ),
                    React.createElement('input', {
                        type: 'text',
                        name: this.props.name,
                        className: 'input',
                        value: this.state.selected,
                        placeholder: this.props.placeholder,
                        onChange: function onChange(event) {
                            return _this3.props.onChange(event, _this3.props.name);
                        },
                        readOnly: true
                    })
                ),
                React.createElement(
                    'ul',
                    { className: 'list secondary select__inner' },
                    options
                )
            );
        }
    }]);

    return Select;
}(React.Component);

var Question = function (_React$Component2) {
    _inherits(Question, _React$Component2);

    function Question() {
        _classCallCheck(this, Question);

        return _possibleConstructorReturn(this, (Question.__proto__ || Object.getPrototypeOf(Question)).apply(this, arguments));
    }

    _createClass(Question, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                { className: 'list__item question' },
                React.createElement(
                    'div',
                    { className: 'title' },
                    this.props.question
                ),
                React.createElement(
                    'div',
                    { className: 'answer-options-container' },
                    React.createElement(
                        'label',
                        { className: 'label' },
                        React.createElement('input', {
                            type: 'radio',
                            name: this.props.name,
                            id: 'answer-yes',
                            'class': 'input-radio'
                        }),
                        React.createElement(
                            'span',
                            { 'class': 'label-text' },
                            '\u0422\u0430\u043A'
                        )
                    ),
                    React.createElement(
                        'label',
                        { className: 'label' },
                        React.createElement('input', {
                            type: 'radio',
                            name: this.props.name,
                            id: 'answer-no',
                            'class': 'input-radio'
                        }),
                        React.createElement(
                            'span',
                            { 'class': 'label-text' },
                            '\u041D\u0456'
                        )
                    )
                )
            );
        }
    }]);

    return Question;
}(React.Component);

export var Form = function (_React$Component3) {
    _inherits(Form, _React$Component3);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this5 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this5.state = {
            formItems: _this5.props.formItems,
            inputs: {
                email: '',
                password: ''
            }
        };
        return _this5;
    }

    _createClass(Form, [{
        key: 'handleInputChange',
        value: function handleInputChange(event, inputName) {
            var newInputs = {};

            for (var input in this.state.inputs) {
                newInputs[input] = this.state.inputs[input];
            }

            newInputs[inputName] = event.target.value;

            this.setState({
                inputs: newInputs
            });
        }
    }, {
        key: 'renderFormItem',
        value: function renderFormItem(name, data) {
            switch (data.type) {
                default:
                    return React.createElement(Input, {
                        name: name,
                        className: data.className,
                        type: data.type,
                        icon: data.icon,
                        value: data.value,
                        placeholder: data.placeholder
                    });
            }
        }
    }, {
        key: 'handleConfirmClick',
        value: function handleConfirmClick(event) {
            event.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            return React.createElement(
                'form',
                {
                    method: this.props.method,
                    action: this.props.action,
                    className: 'form auth'
                },
                React.createElement(
                    'header',
                    { className: 'header' },
                    this.props.header
                ),
                React.createElement(Input, {
                    type: 'email',
                    name: 'email',
                    placeholder: '\u041F\u043E\u0448\u0442\u0430 \u0430\u0431\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D',
                    onChange: function onChange(event, inputName) {
                        return _this6.handleInputChange(event, inputName);
                    }
                }),
                React.createElement(Input, {
                    type: 'password',
                    name: 'password',
                    placeholder: '\u041F\u0430\u0440\u043E\u043B\u044C',
                    onChange: function onChange(event, inputName) {
                        return _this6.handleInputChange(event, inputName);
                    }
                }),
                React.createElement(
                    'div',
                    { className: 'control-buttons space-between' },
                    React.createElement(
                        'a',
                        { href: '/sign-up', className: 'link' },
                        React.createElement(
                            'span',
                            { className: 'button-text' },
                            '\u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044F'
                        )
                    ),
                    React.createElement(
                        'a',
                        {
                            href: '/profile',
                            className: 'button flat',
                            name: 'confirm',
                            onClick: function onClick(event) {
                                return props.onConfirmClick(event);
                            }
                        },
                        React.createElement(
                            'span',
                            { className: 'material-symbols-outlined' },
                            'login'
                        ),
                        React.createElement(
                            'span',
                            { className: 'button-text' },
                            '\u0423\u0432\u0456\u0439\u0442\u0438'
                        )
                    )
                )
            );
        }
    }]);

    return Form;
}(React.Component);

var SignIn = function (_React$Component4) {
    _inherits(SignIn, _React$Component4);

    function SignIn(props) {
        _classCallCheck(this, SignIn);

        var _this7 = _possibleConstructorReturn(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call(this, props));

        _this7.state = {
            form: {
                method: 'POST',
                action: '/api/donor/appointment/make-appointment',
                header: 'Вхід'
            },
            mainNav: [{
                link: '/',
                text: 'Головна',
                type: 'link'
            }, {
                link: '/about/station',
                text: 'Про центр',
                type: 'link'
            }, {
                link: '/about/donations',
                text: 'Про донорство',
                type: 'link'
            }],
            profileNav: [{
                link: '/sign-in',
                text: 'Вхід',
                type: 'link button secondary tcolor',
                isActive: true
            }, {
                link: '/sign-up',
                text: 'Реєстрація',
                type: 'button flat'
            }]
        };
        return _this7;
    }

    _createClass(SignIn, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'body' },
                React.createElement(Header, {
                    navItems: this.state.mainNav,
                    profileNavItems: this.state.profileNav
                }),
                React.createElement(
                    'div',
                    { className: 'center' },
                    React.createElement(
                        'div',
                        { className: 'container flex' },
                        React.createElement(Form, {
                            method: this.state.form.method,
                            action: this.state.form.action,
                            header: this.state.form.header
                        })
                    )
                )
            );
        }
    }]);

    return SignIn;
}(React.Component);

// ========================================

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(SignIn, null));