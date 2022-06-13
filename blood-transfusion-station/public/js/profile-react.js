'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header(props) {
        _classCallCheck(this, Header);

        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

        _this.state = {
            editMode: false,
            nameValue: 'Бабенко Олексій'
        };

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(Header, [{
        key: 'handleChange',
        value: function handleChange(event, inputName) {
            this.setState(_defineProperty({}, key, event.target.value));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var usernameElement = React.createElement(
                'div',
                { className: 'username' },
                this.state.nameValue
            );
            if (editMode) {
                usernameElement = React.createElement('input', {
                    type: 'text',
                    name: 'name',
                    id: 'input-name',
                    className: 'input secondary username',
                    placeholder: '\u0412\u0430\u0448\u0435 \u0456\u043C\'\u044F',
                    value: this.state.nameValue,
                    onChange: function onChange(event) {
                        _this2.handleChange(event, 'name');
                    }
                });
            }

            return React.createElement(
                'div',
                { className: 'profile__header__inner' },
                React.createElement('div', { className: 'avatar' }),
                usernameElement,
                React.createElement(
                    'ul',
                    { id: 'blood-group', className: 'list' },
                    React.createElement(
                        'li',
                        { className: 'list__item' },
                        React.createElement(
                            'span',
                            { className: 'value' },
                            'A (II)'
                        )
                    ),
                    React.createElement(
                        'li',
                        { className: 'list__item' },
                        React.createElement(
                            'span',
                            { className: 'value' },
                            'Rh+'
                        )
                    ),
                    React.createElement(
                        'li',
                        { className: 'list__item' },
                        React.createElement(
                            'span',
                            { className: 'value' },
                            'kell+'
                        )
                    )
                )
            );
        }
    }]);

    return Header;
}(React.Component);

// ========================================

var root = ReactDOM.createRoot(document.getElementById('profile-header-root'));
root.render(React.createElement(Header, null));