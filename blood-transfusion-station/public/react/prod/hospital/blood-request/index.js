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

export var Form = function (_React$Component2) {
    _inherits(Form, _React$Component2);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this4 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this4.state = {
            formItems: _this4.props.formItems,
            groups: {
                group0: {
                    bloodGroup: '',
                    bloodRh: '',
                    bloodKell: '',
                    component: '',
                    count: ''
                }
            }
        };

        _this4.bloodOptions = {
            group: [{ name: 'group1', value: 'O (I)' }, { name: 'group2', value: 'A (II)' }, { name: 'group3', value: 'B (III)' }, { name: 'group4', value: 'AB (IV)' }],
            rh: [{ name: 'rh+', value: 'Rh+' }, { name: 'rh-', value: 'Rh-' }],
            kell: [{ name: 'kell+', value: 'Kell+' }, { name: 'kell-', value: 'Kell-' }],
            components: [{ name: 'plasma', value: 'Плазма' }, { name: 'rbc', value: 'Еритроцити' }, { name: 'wbc', value: 'Лейкоцити' }, { name: 'platelets', value: 'Тромбоцити' }]
        };
        return _this4;
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

            // const newFormItems = {}
            // for (let key in this.props.formItems) {
            //     newUserInfo[key] = this.props.formItems[key]
            // }
            // newFormItems[inputName] = event.target.value
            // this.setState({
            //     formItems: newFormItems,
            // })
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
        key: 'renderGroup',
        value: function renderGroup(groupId, groupItems) {
            var _this5 = this;

            return React.createElement(
                'div',
                { className: 'group', id: groupId },
                React.createElement(
                    'div',
                    { className: 'wrapper' },
                    React.createElement(Select, {
                        name: 'bloodGroup',
                        options: this.bloodOptions.group,
                        icon: 'water_drop',
                        value: groupItems.bloodGroup,
                        placeholder: 'Група',
                        onChange: function onChange(event, name) {
                            return _this5.handleInputChange(event, groupId, name);
                        }
                    }),
                    React.createElement(Select, {
                        name: 'bloodRh',
                        options: this.bloodOptions.rh,
                        icon: 'bloodtype',
                        value: groupItems.bloodRh,
                        placeholder: 'Резус',
                        onChange: function onChange(event, name) {
                            return _this5.handleInputChange(event, groupId, name);
                        }
                    }),
                    React.createElement(Select, {
                        name: 'bloodKell',
                        options: this.bloodOptions.kell,
                        icon: 'bloodtype',
                        value: groupItems.bloodKell,
                        placeholder: 'Kell',
                        onChange: function onChange(event, name) {
                            return _this5.handleInputChange(event, groupId, name);
                        }
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'wrapper' },
                    React.createElement(Select, {
                        name: 'component',
                        options: this.bloodOptions.components,
                        icon: 'gas_meter',
                        value: groupItems.component,
                        placeholder: 'Компонента',
                        onChange: function onChange(event, name) {
                            return _this5.handleInputChange(event, groupId, name);
                        }
                    }),
                    React.createElement(Input, {
                        type: 'number',
                        name: 'count',
                        icon: 'scale',
                        value: groupItems.count,
                        placeholder: '\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C',
                        unit: '\u043B',
                        onChange: function onChange(event, name) {
                            return _this5.handleInputChange(event, groupId, name);
                        }
                    })
                )
            );
        }
    }, {
        key: 'handleAddClick',
        value: function handleAddClick(event) {
            event.preventDefault();
            var newGroups = {};
            var newId = 'group' + Object.keys(this.state.groups).length;

            for (var group in this.state.groups) {
                var newGroup = {};
                for (var name in this.state.groups[group]) {
                    newGroup[name] = this.state.groups[group][name];
                }

                newGroups[group] = newGroup;
            }

            newGroups[newId] = {
                bloodGroup: '',
                bloodRh: '',
                bloodKell: '',
                component: '',
                count: ''
            };

            this.setState({
                groups: newGroups
            });

            console.log(newGroups);
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

            // const formItems = []

            // for (let name in this.state.formItems) {
            //     formItems.push(
            //         this.renderFormItem(name, this.state.formItems[name])
            //     )
            // }

            var groups = [];

            for (var group in this.state.groups) {
                groups.push(this.renderGroup(group, this.state.groups[group]));
            }

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
                groups,
                React.createElement(
                    'button',
                    {
                        className: 'button simple round',
                        name: 'add',
                        onClick: function onClick(event) {
                            return _this6.handleAddClick(event);
                        }
                    },
                    React.createElement(
                        'span',
                        { className: 'material-symbols-outlined' },
                        'add'
                    )
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
                            '\u041F\u043E\u0434\u0430\u0442\u0438 \u0437\u0430\u043F\u0438\u0442'
                        )
                    )
                )
            );
        }
    }]);

    return Form;
}(React.Component);

var BloodRequest = function (_React$Component3) {
    _inherits(BloodRequest, _React$Component3);

    function BloodRequest(props) {
        _classCallCheck(this, BloodRequest);

        var _this7 = _possibleConstructorReturn(this, (BloodRequest.__proto__ || Object.getPrototypeOf(BloodRequest)).call(this, props));

        _this7.state = {
            form: {
                method: 'POST',
                action: '/api/hospital/blood-requests/send-blood-request',
                header: 'Запит на отримання крові',
                structure: {
                    bloodGroup: {
                        icon: 'bloodtype',
                        placeholder: 'Група крові'
                    },
                    count: {
                        icon: 'gas_meter',
                        placeholder: 'Кількість'
                    }
                }
            },
            mainNav: [{
                link: '/',
                text: 'Головна',
                type: 'link'
            }, {
                link: '/about/station',
                text: 'Про центр',
                type: 'link'
            }],
            profileNav: [{
                link: '/send-blood-request',
                text: 'Подати запит',
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

    _createClass(BloodRequest, [{
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
                        header: this.state.form.header,
                        formItems: this.state.form.structure
                    })
                )
            );
        }
    }]);

    return BloodRequest;
}(React.Component);

// ========================================

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(BloodRequest, null));