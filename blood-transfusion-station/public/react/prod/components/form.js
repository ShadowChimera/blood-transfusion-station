var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Input(props) {
    var className = 'input ';

    if (props.className) {
        className += props.className;
    }

    return React.createElement(
        "div",
        { className: "input-container" },
        React.createElement(
            "span",
            { className: "material-symbols-outlined" },
            props.icon
        ),
        React.createElement("input", {
            type: props.type,
            name: props.name,
            className: className,
            value: props.value,
            placeholder: props.placeholder,
            onChange: function onChange(event) {
                return props.onInputChange(event, props.name);
            }
        })
    );
}

export var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.state = {
            formItems: _this.props.formItems
        };
        return _this;
    }

    _createClass(Form, [{
        key: "handleInputChange",
        value: function handleInputChange(event, inputName) {
            var newFormItems = {};

            for (var key in this.props.formItems) {
                newUserInfo[key] = this.props.formItems[key];
            }

            newFormItems[inputName] = event.target.value;

            this.setState({
                formItems: newFormItems
            });
        }
    }, {
        key: "renderFormItem",
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
        key: "render",
        value: function render() {
            var formItems = [];

            for (var name in this.state.formItems) {
                formItems.push(this.renderFormItem(name, this.state.formItems[name]));
            }

            return React.createElement(
                "form",
                {
                    method: this.props.method,
                    action: this.props.action,
                    className: "form"
                },
                React.createElement(
                    "header",
                    { className: "header" },
                    this.props.header
                ),
                formItems
            );
        }
    }]);

    return Form;
}(React.Component);