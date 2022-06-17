function Input(props) {
    let className = 'input '

    if (props.className) {
        className += props.className
    }

    return (
        <div className="input-container">
            <span className="material-symbols-outlined">{props.icon}</span>
            <input
                type={props.type}
                name={props.name}
                className={className}
                value={props.value}
                placeholder={props.placeholder}
                onChange={(event) => props.onInputChange(event, props.name)}
            />
        </div>
    )
}

export class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            formItems: this.props.formItems,
        }
    }

    handleInputChange(event, inputName) {
        const newFormItems = {}

        for (let key in this.props.formItems) {
            newUserInfo[key] = this.props.formItems[key]
        }

        newFormItems[inputName] = event.target.value

        this.setState({
            formItems: newFormItems,
        })
    }

    renderFormItem(name, data) {
        switch (data.type) {
            default:
                return (
                    <Input
                        name={name}
                        className={data.className}
                        type={data.type}
                        icon={data.icon}
                        value={data.value}
                        placeholder={data.placeholder}
                    />
                )
        }
    }

    render() {
        const formItems = []

        for (let name in this.state.formItems) {
            formItems.push(
                this.renderFormItem(name, this.state.formItems[name])
            )
        }

        return (
            <form
                method={this.props.method}
                action={this.props.action}
                className="form"
            >
                <header className="header">{this.props.header}</header>
                {formItems}
            </form>
        )
    }
}
