var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function HistoryItem(props) {
    return React.createElement(
        "li",
        { key: props.name, className: "list__item history__item" },
        React.createElement(
            "div",
            { className: "name" },
            props.name
        ),
        React.createElement(
            "div",
            { className: "remaining-time" },
            React.createElement(
                "span",
                { className: "material-symbols-outlined" },
                "timer"
            ),
            React.createElement(
                "span",
                { className: "value" },
                props.remainingTime
            )
        ),
        React.createElement(
            "div",
            { className: "start-time" },
            React.createElement(
                "span",
                { className: "material-symbols-outlined" },
                "event_upcoming"
            ),
            React.createElement(
                "span",
                { className: "value" },
                props.startTime
            )
        ),
        React.createElement(
            "div",
            { className: "end-time" },
            React.createElement(
                "span",
                { className: "material-symbols-outlined" },
                "event_available"
            ),
            React.createElement(
                "span",
                { className: "value" },
                props.endTime
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
                name: "add",
                onClick: function onClick(event) {
                    return props.onAddClick(event);
                }
            },
            React.createElement(
                "span",
                { className: "material-symbols-outlined" },
                "add"
            ),
            React.createElement(
                "span",
                { className: "button-text" },
                "\u0414\u043E\u0434\u0430\u0442\u0438 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F"
            )
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
        value: function renderHistoryItems(restriction) {
            return React.createElement(HistoryItem, {
                name: restriction.name,
                remainingTime: restriction.remainingTime,
                startTime: restriction.startTime,
                endTime: restriction.endTime
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var historyItems = this.props.restrictions.map(function (restriction) {
                return _this2.renderHistoryItems(restriction);
            });

            return React.createElement(
                "ul",
                { className: "list history" },
                React.createElement(
                    "header",
                    { className: "history__header history__item" },
                    React.createElement(
                        "div",
                        { className: "header__item" },
                        React.createElement(
                            "div",
                            { className: "value" },
                            "\u041D\u0430\u0437\u0432\u0430 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "header__item" },
                        React.createElement(
                            "div",
                            { className: "value" },
                            "\u0427\u0430\u0441, \u0449\u043E \u0437\u0430\u043B\u0438\u0448\u0438\u0432\u0441\u044F"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "header__item" },
                        React.createElement(
                            "div",
                            { className: "value" },
                            "\u041F\u043E\u0447\u0430\u0442\u043A\u043E\u0432\u0430 \u0434\u0430\u0442\u0430"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "header__item" },
                        React.createElement(
                            "div",
                            { className: "value" },
                            "\u041A\u0456\u043D\u0446\u0435\u0432\u0430 \u0434\u0430\u0442\u0430"
                        )
                    )
                ),
                historyItems
            );
        }
    }]);

    return History;
}(React.Component);

function SectionItem(props) {
    return React.createElement(
        "li",
        { className: "list__item", onClick: function onClick(event) {
                return props.onClick(event);
            } },
        React.createElement(
            "div",
            { className: "name" },
            props.name
        ),
        React.createElement(
            "span",
            { className: "material-symbols-outlined" },
            "chevron_right"
        )
    );
}

function getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '.' + mm + '.' + yyyy;
    return today;
}

function ListItem(props) {
    var className = 'list__item';
    var dateInput = '';

    if (props.isChecked) {
        className += ' checked';
        dateInput = React.createElement("input", {
            className: "input-datetime",
            type: "datetime",
            name: "startTime",
            value: getToday()
        });
    }

    return React.createElement(
        "li",
        {
            className: className,
            onClick: function onClick(event) {
                return props.onClick(event, props.name, getToday());
            }
        },
        React.createElement(
            "div",
            { className: "name" },
            props.name
        ),
        dateInput
    );
}

function SMControlPanel(props) {
    return React.createElement(
        "div",
        { className: "control-buttons" },
        React.createElement(
            "button",
            {
                className: "button flat",
                name: "cancel",
                onClick: function onClick(event) {
                    return props.onCancelClick(event);
                }
            },
            React.createElement(
                "span",
                { className: "material-symbols-outlined" },
                "close"
            ),
            React.createElement(
                "span",
                { className: "button-text" },
                "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438"
            )
        ),
        React.createElement(
            "button",
            {
                className: "button flat",
                name: "confirm",
                onClick: function onClick(event) {
                    return props.onConfirmClick(event);
                }
            },
            React.createElement(
                "span",
                { className: "material-symbols-outlined" },
                "check"
            ),
            React.createElement(
                "span",
                { className: "button-text" },
                "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438"
            )
        )
    );
}

function SelectionDisplay(props) {
    var list = [];

    var _loop = function _loop(restriction) {
        list.push(React.createElement(
            "li",
            { className: "list__item" },
            React.createElement(
                "div",
                { className: "wrapper" },
                React.createElement(
                    "div",
                    { className: "name" },
                    restriction
                ),
                React.createElement("input", {
                    className: "input-datetime",
                    type: "datetime",
                    name: "startTime",
                    value: props.selected[restriction]
                })
            ),
            React.createElement(
                "button",
                {
                    className: "button simple round",
                    name: "remove",
                    onClick: function onClick(event) {
                        return props.onRemoveClick(event, restriction);
                    }
                },
                React.createElement(
                    "span",
                    { className: "material-symbols-outlined" },
                    "delete"
                )
            )
        ));
    };

    for (var restriction in props.selected) {
        _loop(restriction);
    }

    return React.createElement(
        "ul",
        { className: "list side" },
        React.createElement(
            "header",
            { className: "header" },
            React.createElement(
                "span",
                { className: "header__text" },
                "\u041E\u0431\u0440\u0430\u043D\u0456 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F"
            )
        ),
        list
    );
}

var SelectionMenu = function (_React$Component2) {
    _inherits(SelectionMenu, _React$Component2);

    function SelectionMenu(props) {
        _classCallCheck(this, SelectionMenu);

        var _this3 = _possibleConstructorReturn(this, (SelectionMenu.__proto__ || Object.getPrototypeOf(SelectionMenu)).call(this, props));

        _this3.state = {
            currentSection: null,
            selected: {}
        };

        _this3.restrictions = {
            'Лікування зубів': [{
                name: 'Лікування зубів',
                duration: 'h24'
            }, {
                name: 'Видалення зуба',
                duration: 'w1'
            }, {
                name: 'Запалення прикореневих тканин зуба, запалення ясен',
                duration: 'w2'
            }, {
                name: 'Стоматит (запалення ротової порожнини)',
                duration: 'w2'
            }, {
                name: 'Амбулаторні стоматологічні операції',
                duration: 'm1'
            }],
            'Захворювання органів дихання': [{
                name: 'Бронхіт',
                duration: 'm1'
            }, {
                name: 'Бронхіальна астма',
                duration: 'm1'
            }, {
                name: 'Застуда (нежить, кашель, біль у горлі)',
                duration: 'w2'
            }, {
                name: 'Грип',
                duration: 'w2'
            }, {
                name: 'Запалення легенів',
                duration: 'm6'
            }, {
                name: '(Тільки) нежить',
                duration: 'w1'
            }, {
                name: 'Гайморіт',
                duration: 'm1'
            }, {
                name: 'Запалення мигдаликів, ангіна',
                duration: 'm1'
            }, {
                name: 'Туберкульоз',
                duration: 'y2'
            }],
            Пухлини: [{
                name: 'Доброякісна пухлина',
                duration: '~'
            }, {
                name: 'Злоякісна пухлина',
                duration: '-'
            }],
            'Захворювання сечостатевих органів': [{
                name: 'Простатит',
                duration: 'm1'
            }, {
                name: 'Цистит без лихоманки',
                duration: 'w2'
            }, {
                name: 'Цистит з лихоманкою (лікарняне лікування)',
                duration: 'm3'
            }, {
                name: 'Запалення яєчників та придатків',
                duration: 'm1'
            }, {
                name: 'Запалення ниркової балії',
                duration: 'm12'
            }],
            'Захворювання вуха': [{
                name: 'Негнійний отит',
                duration: 'w2'
            }, {
                name: 'Гнійний отит',
                duration: 'm1'
            }],
            'Шкірні захворювання': [{
                name: 'Гострий алергічний висип',
                duration: '~'
            }, {
                name: 'Прищі',
                duration: '~'
            }, {
                name: 'Атопічний дерматит',
                duration: '~'
            }, {
                name: 'Екзема',
                duration: '~'
            }, {
                name: 'Псоріаз',
                duration: '~'
            }, {
                name: 'Видалення рідної плями, папілом',
                duration: 'w2'
            }],
            'Інфекційні захворювання': [{
                name: 'Бореліоз',
                duration: 'm1'
            }, {
                name: 'Кліщовий енцефаліт',
                duration: 'y1'
            }, {
                name: 'Захворювання на гепатит А',
                duration: 'y1'
            }, {
                name: 'Захворювання на гепатит B',
                duration: '-'
            }, {
                name: 'Захворювання на гепатит C',
                duration: '-'
            }, {
                name: 'Сексуальний контакт з особою, яка перенесла гепатит В або С або носієм маркерів вірусу',
                duration: 'm4'
            }, {
                name: 'Побутовий домашній контакт із хворим на гепатит',
                duration: 'm4'
            }, {
                name: 'Герпес Зостер (перепоясуючий лишай)',
                duration: 'w2'
            }, {
                name: 'Простий герпес',
                duration: '1w'
            }, {
                name: 'ВІЛ (СНІД)',
                duration: '-'
            }, {
                name: 'Сексуальний контакт із ВІЛ-позитивною особою',
                duration: 'm4'
            }, {
                name: 'Носіння вірусу папіломи',
                duration: '~'
            }, {
                name: 'Мікоплазмова інфекція',
                duration: 'm4'
            }, {
                name: 'Токсоплазмоз',
                duration: 'm6'
            }, {
                name: 'Туберкульоз',
                duration: 'y2'
            }],
            'Операції та травми': [{
                name: 'Видалення апендикса',
                duration: 'm4'
            }, {
                name: 'Видалення жовчного міхура ',
                duration: 'm4'
            }, {
                name: 'Операції на хребті',
                duration: 'm4'
            }, {
                name: 'Операції на суглобах',
                duration: 'm4'
            }, {
                name: 'Ендоскопічні операції',
                duration: 'm4'
            }, {
                name: 'Видалення мигдаликів',
                duration: 'm2'
            }, {
                name: 'Операції на носі та придаткових пазухах носа',
                duration: 'm2'
            }, {
                name: 'Операції на очах (за виключенням лазера)',
                duration: 'm2'
            }, {
                name: 'Часткове видалення шлунка чи товстого кишечника',
                duration: '-'
            }, {
                name: 'Гінекологічні операції',
                duration: 'm6'
            }, {
                name: 'Відкриті операції у черевній порожнині',
                duration: 'm6'
            }, {
                name: 'Лазерна операція на очах',
                duration: 'm1'
            }, {
                name: 'Численні травми',
                duration: 'y1'
            }, {
                name: 'Видалення рідної плями, папілом',
                duration: 'm2'
            }, {
                name: 'Переломи кісток',
                duration: 'm4'
            }],
            'Вагітність і післяродовий період': [{
                name: 'Аборт',
                duration: 'm6'
            }, {
                name: 'Вагітність',
                duration: '/'
            }, {
                name: 'Годування груддю',
                duration: '/'
            }, {
                name: 'Пологи',
                duration: 'm6'
            }]
        };
        return _this3;
    }

    _createClass(SelectionMenu, [{
        key: "handleSectionClick",
        value: function handleSectionClick(event, name) {
            this.setState({
                currentSection: name
            });
        }
    }, {
        key: "handleRestrictionClick",
        value: function handleRestrictionClick(event, name, date) {
            if (event.target.tagName.toLowerCase() === 'input') {
                return;
            }

            var newSelected = {};

            for (var key in this.state.selected) {
                newSelected[key] = this.state.selected[key];
            }

            if (Object.keys(newSelected).includes(name)) {
                // newSelected.splice(newSelected.indexOf(name), 1)
                delete newSelected[name];
            } else {
                newSelected[name] = date;
            }

            this.setState({
                selected: newSelected
            });
        }
    }, {
        key: "handleConfirmClick",
        value: function handleConfirmClick(event) {
            fetch('/api/donor/restrictions/add-restrictions', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.selected)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
            });

            this.resetState();
            this.props.onConfirm(event);
        }
    }, {
        key: "handleCancelClick",
        value: function handleCancelClick(event) {
            this.resetState();
            this.props.onCancel(event);
        }
    }, {
        key: "handleBackClick",
        value: function handleBackClick(event) {
            this.setState({
                currentSection: null
            });
        }
    }, {
        key: "handleRemoveClick",
        value: function handleRemoveClick(event, restriction) {
            console.log(restriction);
            var newSelected = {};

            for (var key in this.state.selected) {
                if (key === restriction) {
                    continue;
                }

                newSelected[key] = this.state.selected[key];
            }

            this.setState({
                selected: newSelected
            });
        }
    }, {
        key: "resetState",
        value: function resetState() {
            this.setState({
                currentSection: null,
                selected: {}
            });
        }
    }, {
        key: "renderSectionItem",
        value: function renderSectionItem(name) {
            var _this4 = this;

            return React.createElement(SectionItem, {
                name: name,
                onClick: function onClick(event) {
                    return _this4.handleSectionClick(event, name);
                }
            });
        }
    }, {
        key: "renderListItem",
        value: function renderListItem(name) {
            var _this5 = this;

            var isChecked = false;

            if (Object.keys(this.state.selected).includes(name)) {
                isChecked = true;
            }

            return React.createElement(ListItem, {
                name: name,
                isChecked: isChecked,
                onClick: function onClick(event, name, date) {
                    return _this5.handleRestrictionClick(event, name, date);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            var list = null;
            var header = null;

            var curSection = this.state.currentSection;

            if (curSection) {
                list = this.restrictions[curSection].map(function (restriction) {
                    return _this6.renderListItem(restriction.name);
                });
                header = React.createElement(
                    "header",
                    { className: "header restrictions__header" },
                    React.createElement(
                        "button",
                        {
                            className: "button simple round",
                            name: "back",
                            onClick: function onClick(event) {
                                return _this6.handleBackClick(event);
                            }
                        },
                        React.createElement(
                            "span",
                            { className: "material-symbols-outlined" },
                            "arrow_back"
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: "header__text" },
                        curSection
                    )
                );
            } else {
                list = Object.keys(this.restrictions).map(function (section) {
                    return _this6.renderSectionItem(section);
                });
                header = React.createElement(
                    "header",
                    { className: "header restrictions__header" },
                    React.createElement(
                        "span",
                        { className: "header__text" },
                        "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0441\u0435\u043A\u0446\u0456\u044E"
                    )
                );
            }

            return React.createElement(
                "div",
                { className: "wrapper selection-menu" },
                React.createElement(
                    "div",
                    { className: "split" },
                    React.createElement(
                        "ul",
                        { className: "list secondary restrictions" },
                        header,
                        list
                    ),
                    React.createElement(SelectionDisplay, {
                        selected: this.state.selected,
                        onRemoveClick: function onRemoveClick(event, restriction) {
                            return _this6.handleRemoveClick(event, restriction);
                        }
                    })
                ),
                React.createElement(SMControlPanel, {
                    onCancelClick: function onCancelClick(event) {
                        return _this6.handleCancelClick(event);
                    },
                    onConfirmClick: function onConfirmClick(event) {
                        return _this6.handleConfirmClick(event);
                    }
                })
            );
        }
    }]);

    return SelectionMenu;
}(React.Component);

export var MyRestrictions = function (_React$Component3) {
    _inherits(MyRestrictions, _React$Component3);

    function MyRestrictions(props) {
        _classCallCheck(this, MyRestrictions);

        var _this7 = _possibleConstructorReturn(this, (MyRestrictions.__proto__ || Object.getPrototypeOf(MyRestrictions)).call(this, props));

        _this7.state = {
            addMode: false,
            restrictions: []
        };

        _this7.loadRestrictions();
        return _this7;
    }

    _createClass(MyRestrictions, [{
        key: "handleAddClick",
        value: function handleAddClick(event) {
            this.setState({
                addMode: true
            });
        }
    }, {
        key: "handleRemoveClick",
        value: function handleRemoveClick(event, name) {}
    }, {
        key: "handleCancelAdding",
        value: function handleCancelAdding(event) {
            this.setState({
                addMode: false
            });
        }
    }, {
        key: "handleConfirmAdding",
        value: function handleConfirmAdding(event) {
            this.loadRestrictions();
        }
    }, {
        key: "loadRestrictions",
        value: function loadRestrictions() {
            var _this8 = this;

            fetch('/api/donor/restrictions/get-restrictions', {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);

                _this8.setState({
                    addMode: false,
                    restrictions: data.result
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this9 = this;

            if (this.state.addMode) {
                return React.createElement(
                    "div",
                    { className: "container selection-menu-container" },
                    React.createElement(SelectionMenu, {
                        onCancel: function onCancel(event) {
                            return _this9.handleCancelAdding(event);
                        },
                        onConfirm: function onConfirm(event) {
                            _this9.handleConfirmAdding(event);
                        }
                    })
                );
            }

            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(History, {
                    restrictions: this.state.restrictions,
                    onAddClick: function onAddClick(event) {
                        return _this9.handleAddClick(event);
                    },
                    onRemoveClick: function onRemoveClick(event, name) {
                        return _this9.handleRemoveClick(event, name);
                    }
                }),
                React.createElement(ControlPanel, {
                    onAddClick: function onAddClick(event) {
                        return _this9.handleAddClick(event);
                    }
                })
            );
        }
    }]);

    return MyRestrictions;
}(React.Component);