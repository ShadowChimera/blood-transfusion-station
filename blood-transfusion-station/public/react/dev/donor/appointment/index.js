import { Header } from '../../components/header.js'

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
        }

        this.questions = {
            "Загальний стан здоров'я": [
                'Чи є у Вас температура, болі в горлі, простуда,  респіраторні захворювання,  ангіна?',
                'Чи вживали Ви протягом останніх 48-ми годин алкоголь?',
                'Чи видаляли Вам зуб протягом останніх 10-ти днів?',
                'Чи приймали Ви протягом останнього місяця ліки?',
                'Чи проводилися Вам щеплення?',
                'Чим спостерігаєтесь Ви зараз у лікаря?',
            ],
            'Протягом останнього року': [
                'Чи проколювали Вам вуха?',
                'Чи робили Вам акупунктуру?',
                'Чи робили Вам татуювання, пірсинг?',
            ],
            'Протягом останніх шести місяців': [
                'Чи отримували Ви трансфузії компонентів крові або препаратів плазми?',
                'Чи були у Вас хірургічні втручання?',
                'Чи були Ви у контакті з хворими на гепатити, СНІД, інші венеричні хвороби?',
            ],
            'Протягом останніх двох тижнів': ["Чи робили Вам ін'єкції ліків?"],
            'Чи спостерігається у Вас': [
                'Втрата ваги?',
                // 'Нічна пітливість?',
                'Запаморочення?',
                'Чи були у Вас поїздки за кордон протягом останніх трьох років?',
                // 'Чи здавали Ви кров або її компоненти?',
                // 'Чи були усунення від донорства?',
                'Чи знаходилися Ви на диспансерному обліку?',
            ],
        }
    }

    handleInputChange(event, group, inputName) {
        const newGroups = {}

        for (let group in this.state.groups) {
            newGroups[group] = {}

            for (let name in this.state.groups[group]) {
                newGroups[group][name] = this.state.groups[group][name]
            }
        }

        newGroups[group][inputName] = event.target.value

        this.setState({
            groups: newGroups,
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
        const questions = Object.keys(this.questions).map(
            (sectionName, sIndex) => {
                const section = []
                section.push(<div className="section-title">{sectionName}</div>)
                section.push(
                    this.questions[sectionName].map((question, qIndex) => {
                        return (
                            <Question
                                question={question}
                                name={`${sIndex}-answer${qIndex}`}
                            />
                        )
                    })
                )

                return section
            }
        )

        console.log(questions)

        return (
            <form
                method={this.props.method}
                action={this.props.action}
                className="form"
            >
                <header className="header">{this.props.header}</header>
                <ul className="list questions-container">{questions}</ul>
                <div className="control-buttons">
                    <button
                        className="button flat"
                        name="confirm"
                        onClick={(event) => props.onConfirmClick(event)}
                    >
                        <span className="material-symbols-outlined">
                            upgrade
                        </span>
                        <span className="button-text">Записатися</span>
                    </button>
                </div>
            </form>
        )
    }
}

class Appointment extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            form: {
                method: 'POST',
                action: '/api/donor/appointment/make-appointment',
                header: 'Запис на здачу крові',
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
                    link: '/appointment',
                    text: 'Записатися',
                    type: 'link button secondary tcolor',
                    isActive: true,
                },
                {
                    link: '/profile',
                    text: 'Особистий кабінет',
                    type: 'link',
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

                <div className="container flex">
                    <Form
                        method={this.state.form.method}
                        action={this.state.form.action}
                        header={this.state.form.header}
                    />
                </div>
            </div>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Appointment />)
