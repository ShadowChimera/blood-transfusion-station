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

export class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            formItems: this.props.formItems,
            groups: {
                group0: {
                    bloodGroup: '',
                    bloodRh: '',
                    bloodKell: '',
                    component: '',
                    count: '',
                },
            },
        }

        this.bloodOptions = {
            group: [
                { name: 'group1', value: 'O (I)' },
                { name: 'group2', value: 'A (II)' },
                { name: 'group3', value: 'B (III)' },
                { name: 'group4', value: 'AB (IV)' },
            ],
            rh: [
                { name: 'rh+', value: 'Rh+' },
                { name: 'rh-', value: 'Rh-' },
            ],
            kell: [
                { name: 'kell+', value: 'Kell+' },
                { name: 'kell-', value: 'Kell-' },
            ],
            components: [
                { name: 'plasma', value: 'Плазма' },
                { name: 'rbc', value: 'Еритроцити' },
                { name: 'wbc', value: 'Лейкоцити' },
                { name: 'platelets', value: 'Тромбоцити' },
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

        // const newFormItems = {}
        // for (let key in this.props.formItems) {
        //     newUserInfo[key] = this.props.formItems[key]
        // }
        // newFormItems[inputName] = event.target.value
        // this.setState({
        //     formItems: newFormItems,
        // })
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

    renderGroup(groupId, groupItems) {
        return (
            <div className="group" id={groupId}>
                <div className="wrapper">
                    <Select
                        name={'bloodGroup'}
                        options={this.bloodOptions.group}
                        icon={'water_drop'}
                        value={groupItems.bloodGroup}
                        placeholder={'Група'}
                        onChange={(event, name) =>
                            this.handleInputChange(event, groupId, name)
                        }
                    />
                    <Select
                        name={'bloodRh'}
                        options={this.bloodOptions.rh}
                        icon={'bloodtype'}
                        value={groupItems.bloodRh}
                        placeholder={'Резус'}
                        onChange={(event, name) =>
                            this.handleInputChange(event, groupId, name)
                        }
                    />
                    <Select
                        name={'bloodKell'}
                        options={this.bloodOptions.kell}
                        icon={'bloodtype'}
                        value={groupItems.bloodKell}
                        placeholder={'Kell'}
                        onChange={(event, name) =>
                            this.handleInputChange(event, groupId, name)
                        }
                    />
                </div>
                <div className="wrapper">
                    <Select
                        name={'component'}
                        options={this.bloodOptions.components}
                        icon={'gas_meter'}
                        value={groupItems.component}
                        placeholder={'Компонента'}
                        onChange={(event, name) =>
                            this.handleInputChange(event, groupId, name)
                        }
                    />
                    <Input
                        type="number"
                        name="count"
                        icon="scale"
                        value={groupItems.count}
                        placeholder="Кількість"
                        unit="л"
                        onChange={(event, name) =>
                            this.handleInputChange(event, groupId, name)
                        }
                    />
                </div>
            </div>
        )
    }

    handleAddClick(event) {
        event.preventDefault()
        const newGroups = {}
        const newId = `group${Object.keys(this.state.groups).length}`

        for (let group in this.state.groups) {
            const newGroup = {}
            for (let name in this.state.groups[group]) {
                newGroup[name] = this.state.groups[group][name]
            }

            newGroups[group] = newGroup
        }

        newGroups[newId] = {
            bloodGroup: '',
            bloodRh: '',
            bloodKell: '',
            component: '',
            count: '',
        }

        this.setState({
            groups: newGroups,
        })

        console.log(newGroups)
    }

    handleConfirmClick(event) {
        event.preventDefault()
    }

    render() {
        // const formItems = []

        // for (let name in this.state.formItems) {
        //     formItems.push(
        //         this.renderFormItem(name, this.state.formItems[name])
        //     )
        // }

        const groups = []

        for (let group in this.state.groups) {
            groups.push(this.renderGroup(group, this.state.groups[group]))
        }

        return (
            <form
                method={this.props.method}
                action={this.props.action}
                className="form"
            >
                <header className="header">{this.props.header}</header>
                {groups}
                <button
                    className="button simple round"
                    name="add"
                    onClick={(event) => this.handleAddClick(event)}
                >
                    <span className="material-symbols-outlined">add</span>
                </button>
                <div className="control-buttons">
                    <button
                        className="button flat"
                        name="confirm"
                        onClick={(event) => props.onConfirmClick(event)}
                    >
                        <span className="material-symbols-outlined">
                            upgrade
                        </span>
                        <span className="button-text">Подати запит</span>
                    </button>
                </div>
            </form>
        )
    }
}

class BloodRequest extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            form: {
                method: 'POST',
                action: '/api/hospital/blood-requests/send-blood-request',
                header: 'Запит на отримання крові',
                structure: {
                    bloodGroup: {
                        icon: 'bloodtype',
                        placeholder: 'Група крові',
                    },
                    count: {
                        icon: 'gas_meter',
                        placeholder: 'Кількість',
                    },
                },
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
            ],
            profileNav: [
                {
                    link: '/send-blood-request',
                    text: 'Подати запит',
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
                        formItems={this.state.form.structure}
                    />
                </div>
            </div>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<BloodRequest />)
