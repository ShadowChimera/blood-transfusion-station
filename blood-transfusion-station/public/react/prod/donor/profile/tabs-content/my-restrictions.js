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
function ListItem(props) {
    return React.createElement(
        "li",
        { className: "list__item", onClick: function onClick(event) {
                return props.onClick(event);
            } },
        React.createElement(
            "div",
            { className: "name" },
            props.name
        )
    );
}

var SelectionMenu = function (_React$Component2) {
    _inherits(SelectionMenu, _React$Component2);

    function SelectionMenu(props) {
        _classCallCheck(this, SelectionMenu);

        var _this3 = _possibleConstructorReturn(this, (SelectionMenu.__proto__ || Object.getPrototypeOf(SelectionMenu)).call(this, props));

        _this3.state = {
            currentSection: null,
            selected: []
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
        value: function handleRestrictionClick(event, name) {
            var newSelected = this.state.selected.slice();

            if (newSelected.includes(name)) {
                newSelected.splice(newSelected.indexOf(name), 1);
            } else {
                newSelected.push(name);
            }

            this.setState({
                selected: newSelected
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

            return React.createElement(ListItem, {
                name: name,
                onClick: function onClick(event) {
                    return _this5.handleRestrictionClick(event, name);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            var list = null;
            var title = null;

            var curSection = this.state.currentSection;

            if (curSection) {
                list = this.restrictions[curSection].map(function (restriction) {
                    return _this6.renderListItem(restriction.name);
                });
                title = curSection;
            } else {
                list = Object.keys(this.restrictions).map(function (section) {
                    return _this6.renderSectionItem(section);
                });
                title = 'Оберіть секцію';
            }

            return React.createElement(
                "ul",
                { className: "list restrictions" },
                React.createElement(
                    "header",
                    { className: "restrictions__header" },
                    title
                ),
                list
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
            restrictions: [{
                name: 'Гепатит А',
                remainingTime: '7 місяців',
                startTime: '15.01.2022',
                endTime: '15.01.2023'
            }, {
                name: 'Лазерна операція на очах',
                remainingTime: '3 дні',
                startTime: '17.05.2022',
                endTime: '18.06.2022'
            }]
        };
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
        key: "render",
        value: function render() {
            var _this8 = this;

            if (this.state.addMode) {
                return React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(SelectionMenu, null)
                );
            }

            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(History, {
                    restrictions: this.state.restrictions,
                    onAddClick: function onAddClick(event) {
                        return _this8.handleAddClick(event);
                    },
                    onRemoveClick: function onRemoveClick(event, name) {
                        return _this8.handleRemoveClick(event, name);
                    }
                }),
                React.createElement(ControlPanel, {
                    onAddClick: function onAddClick(event) {
                        return _this8.handleAddClick(event);
                    }
                })
            );
        }
    }]);

    return MyRestrictions;
}(React.Component);