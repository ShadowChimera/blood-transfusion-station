import { Header } from '../components/header.js'

function Input(props) {
    let className = 'input '

    if (props.className) {
        className += props.className
    }

    return (
        <div className="input-container" type={props.type}>
            <span className="material-symbols-outlined">{props.icon}</span>
            <input
                type={props.type}
                name={props.name}
                className={className}
                value={props.value}
                placeholder={props.placeholder}
                onChange={(event) => props.onChange(event, props.name)}
            />
            <span className="unit">{props.unit}</span>
        </div>
    )
}

function Option(props) {
    let className = 'list__item option'

    return (
        <li
            className={className}
            onClick={(event) => props.onClick(event, props.value)}
        >
            <div name={props.name}>{props.value}</div>
        </li>
    )
}

class Select extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isActive: false,
            selected: this.props.value,
            options: this.props.options,
        }
    }

    handleClick(event) {
        this.setState({
            isActive: !this.state.isActive,
        })
    }

    handleOptionClick(event, value) {
        this.setState({
            selected: value,
        })

        this.props.onChange(event, value)
    }

    renderOption(name, value) {
        return (
            <Option
                name={name}
                value={value}
                onClick={(event, value) => this.handleOptionClick(event, value)}
            />
        )
    }

    render() {
        const options = this.props.options.map((option) => {
            return this.renderOption(option.name, option.value)
        })

        let active = ''

        if (this.state.isActive) {
            active = ' active'
        }

        return (
            <div
                className={'select' + active}
                onClick={(event) => this.handleClick(event)}
            >
                <div className={'input-container' + active}>
                    <span className="material-symbols-outlined">
                        {this.props.icon}
                    </span>
                    <input
                        type="text"
                        name={this.props.name}
                        className="input"
                        value={this.state.selected}
                        placeholder={this.props.placeholder}
                        onChange={(event) =>
                            this.props.onChange(event, this.props.name)
                        }
                        readOnly={true}
                    />
                </div>

                <ul className="list secondary select__inner">{options}</ul>
            </div>
        )
    }
}

class Question extends React.Component {
    render() {
        return (
            <li className="list__item question">
                <div className="title">{this.props.question}</div>
                <div className="answer-options-container">
                    <label className="label">
                        <input
                            type="radio"
                            name={this.props.name}
                            id="answer-yes"
                            class="input-radio"
                        />
                        <span class="label-text">Так</span>
                    </label>
                    <label className="label">
                        <input
                            type="radio"
                            name={this.props.name}
                            id="answer-no"
                            class="input-radio"
                        />
                        <span class="label-text">Ні</span>
                    </label>
                </div>
            </li>
        )
    }
}

export class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            formItems: this.props.formItems,
            inputs: {
                email: '',
                password: '',
            },
        }
    }

    handleInputChange(event, inputName) {
        const newInputs = {}

        for (let input in this.state.inputs) {
            newInputs[input] = this.state.inputs[input]
        }

        newInputs[inputName] = event.target.value

        this.setState({
            inputs: newInputs,
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

    handleConfirmClick(event) {
        event.preventDefault()
    }

    render() {
        return (
            <form
                method={this.props.method}
                action={this.props.action}
                className="form auth"
            >
                <header className="header">{this.props.header}</header>
                <Input
                    type="email"
                    name="email"
                    icon="mail"
                    placeholder="Пошта"
                    onChange={(event, inputName) =>
                        this.handleInputChange(event, inputName)
                    }
                />
                <Input
                    type="phone"
                    name="phone"
                    placeholder="Телефон"
                    icon="phone"
                    onChange={(event, inputName) =>
                        this.handleInputChange(event, inputName)
                    }
                />
                <Input
                    type="password"
                    name="password"
                    icon="lock"
                    placeholder="Пароль"
                    onChange={(event, inputName) =>
                        this.handleInputChange(event, inputName)
                    }
                />
                <Input
                    type="password"
                    name="repeat-password"
                    icon="lock"
                    placeholder="Повтор паролю"
                    onChange={(event, inputName) =>
                        this.handleInputChange(event, inputName)
                    }
                />

                <div className="control-buttons space-between">
                    <a href="/sign-up" className="link">
                        <span className="button-text">Авторизація</span>
                    </a>
                    <a
                        href="/profile"
                        className="button flat"
                        name="confirm"
                        onClick={(event) => props.onConfirmClick(event)}
                    >
                        <span className="material-symbols-outlined">
                            person_add
                        </span>
                        <span className="button-text">Зареєструватися</span>
                    </a>
                </div>
            </form>
        )
    }
}

class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            form: {
                method: 'POST',
                action: '/api/donor/appointment/make-appointment',
                header: 'Реєстрація',
            },
            mainNav: [
                {
                    link: '/',
                    text: 'Головна',
                    type: 'link',
                },
                {
                    link: '/about/station',
                    text: 'Про центр',
                    type: 'link',
                },
                {
                    link: '/about/donations',
                    text: 'Про донорство',
                    type: 'link',
                },
            ],
            profileNav: [
                {
                    link: '/sign-in',
                    text: 'Вхід',
                    type: 'link button secondary tcolor',
                    isActive: true,
                },
                {
                    link: '/sign-up',
                    text: 'Реєстрація',
                    type: 'button flat',
                },
            ],
        }
    }

    render() {
        return (
            <div className="body">
                <Header
                    navItems={this.state.mainNav}
                    profileNavItems={this.state.profileNav}
                />

                <div className="center">
                    <div className="container flex">
                        <Form
                            method={this.state.form.method}
                            action={this.state.form.action}
                            header={this.state.form.header}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<SignUp />)
