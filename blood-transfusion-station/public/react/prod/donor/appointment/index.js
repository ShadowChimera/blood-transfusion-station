var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Header } from '../../components/header.js';

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
            formItems: _this5.props.formItems
        };

        _this5.questions = {
            "Загальний стан здоров'я": ['Чи є у Вас температура, болі в горлі, простуда,  респіраторні захворювання,  ангіна?', 'Чи вживали Ви протягом останніх 48-ми годин алкоголь?', 'Чи видаляли Вам зуб протягом останніх 10-ти днів?', 'Чи приймали Ви протягом останнього місяця ліки?', 'Чи проводилися Вам щеплення?', 'Чим спостерігаєтесь Ви зараз у лікаря?'],
            'Протягом останнього року': ['Чи проколювали Вам вуха?', 'Чи робили Вам акупунктуру?', 'Чи робили Вам татуювання, пірсинг?'],
            'Протягом останніх шести місяців': ['Чи отримували Ви трансфузії компонентів крові або препаратів плазми?', 'Чи були у Вас хірургічні втручання?', 'Чи були Ви у контакті з хворими на гепатити, СНІД, інші венеричні хвороби?'],
            'Протягом останніх двох тижнів': ["Чи робили Вам ін'єкції ліків?"],
            'Чи спостерігається у Вас': ['Втрата ваги?',
            // 'Нічна пітливість?',
            'Запаморочення?', 'Чи були у Вас поїздки за кордон протягом останніх трьох років?',
            // 'Чи здавали Ви кров або її компоненти?',
            // 'Чи були усунення від донорства?',
            'Чи знаходилися Ви на диспансерному обліку?']
        };
        return _this5;
    }

    _createClass(Form, [{
        key: 'handleInputChange',
        value: function handleInputChange(event, group, inputName) {
            var newGroups = {};

            for (var _group in this.state.groups) {
                newGroups[_group] = {};

                for (var name in this.state.groups[_group]) {
                    newGroups[_group][name] = this.state.groups[_group][name];
                }
            }

            newGroups[group][inputName] = event.target.value;

            this.setState({
                groups: newGroups
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

            var questions = Object.keys(this.questions).map(function (sectionName, sIndex) {
                var section = [];
                section.push(React.createElement(
                    'div',
                    { className: 'section-title' },
                    sectionName
                ));
                section.push(_this6.questions[sectionName].map(function (question, qIndex) {
                    return React.createElement(Question, {
                        question: question,
                        name: sIndex + '-answer' + qIndex
                    });
                }));

                return section;
            });

            console.log(questions);

            return React.createElement(
                'form',
                {
                    method: this.props.method,
                    action: this.props.action,
                    className: 'form'
                },
                React.createElement(
                    'header',
                    { className: 'header' },
                    this.props.header
                ),
                React.createElement(
                    'ul',
                    { className: 'list questions-container' },
                    questions
                ),
                React.createElement(
                    'div',
                    { className: 'control-buttons' },
                    React.createElement(
                        'button',
                        {
                            className: 'button flat',
                            name: 'confirm',
                            onClick: function onClick(event) {
                                return props.onConfirmClick(event);
                            }
                        },
                        React.createElement(
                            'span',
                            { className: 'material-symbols-outlined' },
                            'upgrade'
                        ),
                        React.createElement(
                            'span',
                            { className: 'button-text' },
                            '\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044F'
                        )
                    )
                )
            );
        }
    }]);

    return Form;
}(React.Component);

var Appointment = function (_React$Component4) {
    _inherits(Appointment, _React$Component4);

    function Appointment(props) {
        _classCallCheck(this, Appointment);

        var _this7 = _possibleConstructorReturn(this, (Appointment.__proto__ || Object.getPrototypeOf(Appointment)).call(this, props));

        _this7.state = {
            form: {
                method: 'POST',
                action: '/api/donor/appointment/make-appointment',
                header: 'Запис на здачу крові'
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
                link: '/appointment',
                text: 'Записатися',
                type: 'link button secondary tcolor',
                isActive: true
            }, {
                link: '/profile',
                text: 'Особистий кабінет',
                type: 'link'
            }]
        };
        return _this7;
    }

    _createClass(Appointment, [{
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
                    { className: 'container flex' },
                    React.createElement(Form, {
                        method: this.state.form.method,
                        action: this.state.form.action,
                        header: this.state.form.header
                    })
                )
            );
        }
    }]);

    return Appointment;
}(React.Component);

// ========================================

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Appointment, null));