function Header(props) {
    let usernameElement = <div className="username">{props.username}</div>

    if (props.isEditable) {
        usernameElement = (
            <input
                type="text"
                name="username"
                className="input secondary username"
                value={props.username}
                placeholder="Ваше ім'я"
                onChange={(event) => props.onInputChange(event, 'username')}
            />
        )
    }

    let avatar = (
        <div className="avatar">
            <span className="material-symbols-outlined">person</span>
        </div>
    )

    if (props.avatarSrc) {
        avatar = (
            <div className="avatar">
                <img />
            </div>
        )
    }

    let bloodGroup = <div className="helper">Не вказано</div>

    if (props.bloodGroup) {
        bloodGroup = (
            <ul id="blood-group" className="list">
                <li className="list__item">
                    <span className="value">{props.bloodGroup.group}</span>
                </li>
                <li className="list__item">
                    <span className="value">{props.bloodGroup.rh}</span>
                </li>
                <li className="list__item">
                    <span className="value">{props.bloodGroup.kell}</span>
                </li>
            </ul>
        )
    }

    return (
        <header className="profile__header" id="profile-header-root">
            {avatar}

            {usernameElement}
            <div className="blood-group-container">
                <div className="label">Група крові</div>
                {bloodGroup}
            </div>
        </header>
    )
}

function ContactsSection(props) {
    return (
        <section className="section">
            <h1 className="title">Контактна інформація</h1>
            <ul className="list">
                <li className="list__item">
                    <div className="input-container">
                        <span className="material-symbols-outlined">mail</span>
                        <input
                            type="email"
                            name="email"
                            className="input"
                            value={props.email}
                            placeholder="Пошта"
                            onChange={(event) =>
                                props.onInputChange(event, 'email')
                            }
                        />
                    </div>
                </li>
                <li className="list__item">
                    <div className="input-container">
                        <span className="material-symbols-outlined">phone</span>
                        <input
                            type="phone"
                            name="phone"
                            className="input"
                            value={props.phone}
                            placeholder="Телефон"
                            onChange={(event) =>
                                props.onInputChange(event, 'phone')
                            }
                        />
                    </div>
                </li>
            </ul>
        </section>
    )
}

function PasswordSection(props) {
    return (
        <section className="section">
            <h1 className="title">Зміна паролю</h1>

            <ul className="list">
                <li className="list__item">
                    <div className="input-container">
                        <span className="material-symbols-outlined">
                            lock_open
                        </span>
                        <input
                            type="password"
                            name="old-password"
                            className="input"
                            placeholder="Старий пароль"
                            value={props.oldPassword}
                            onChange={(event) =>
                                props.onInputChange(event, 'oldPassword')
                            }
                        />
                    </div>
                </li>
                <li className="list__item">
                    <div className="input-container">
                        <span className="material-symbols-outlined">lock</span>
                        <input
                            type="password"
                            name="password"
                            className="input"
                            placeholder="Новий пароль"
                            value={props.password}
                            onChange={(event) =>
                                props.onInputChange(event, 'password')
                            }
                        />
                    </div>
                </li>
                <li className="list__item">
                    <div className="input-container">
                        <span className="material-symbols-outlined">lock</span>
                        <input
                            type="password"
                            name="repeat-password"
                            className="input"
                            placeholder="Повтор паролю"
                            value={props.repeatPassword}
                            onChange={(event) =>
                                props.onInputChange(event, 'repeatPassword')
                            }
                        />
                    </div>
                </li>
            </ul>
        </section>
    )
}

function ControlPanel(props) {
    return (
        <div className="control-buttons">
            <button
                className="button flat"
                name="reset"
                onClick={(event) => props.onResetClick(event)}
            >
                <span className="material-symbols-outlined">restart_alt</span>
                <span className="button-text">Скинути</span>
            </button>
            <button
                className="button flat"
                name="save"
                onClick={(event) => props.onSaveClick(event)}
            >
                <span className="material-symbols-outlined">upgrade</span>
                <span className="button-text">Зберегти</span>
            </button>
        </div>
    )
}

export class UserInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isEditable: false,
            userInfo: {
                username: '',
                avatarSrc: '',
                bloodGroup: '',
                phone: '',
                email: '',
                oldPassword: '',
                password: '',
                repeatPassword: '',
            },
            backup: {},
        }

        this.loadUserInfo()
    }

    loadUserInfo() {
        fetch('/api/donor/user-info/get-user-info', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)

                data.result.oldPassword = ''
                data.result.password = ''
                data.result.repeatPassword = ''

                const backup = {}

                for (let key in data.result) {
                    backup[key] = data.result[key]
                }

                this.setState({
                    userInfo: data.result,
                    backup: backup,
                })
            })
    }

    handleInputChange(event, inputName) {
        const curUserInfo = this.state.userInfo

        const newUserInfo = {}

        for (let key in curUserInfo) {
            newUserInfo[key] = curUserInfo[key]
        }

        // const newUserInfo = {
        //     username: curUserInfo.username,
        //     avatarSrc: curUserInfo.avatarSrc,
        //     bloodGroup: curUserInfo.bloodGroup,
        //     phone: curUserInfo.phone,
        //     email: curUserInfo.email,
        //     oldPassword: curUserInfo.oldPassword,
        //     password: curUserInfo.password,
        //     repeatPassword: curUserInfo.repeatPassword,
        // }

        newUserInfo[inputName] = event.target.value

        this.setState({
            userInfo: newUserInfo,
        })
    }

    handleResetClick(event) {
        const newUserInfo = {}
        for (let key in this.state.backup) {
            newUserInfo[key] = this.state.backup[key]
        }

        this.setState({
            userInfo: newUserInfo,
        })
    }

    handleSaveClick(event) {
        console.log('saving...')
    }

    render() {
        return (
            <div className="container">
                <Header
                    isEditable={this.state.isEditable}
                    username={this.state.userInfo.username}
                    avatarSrc={this.state.userInfo.avatarSrc}
                    bloodGroup={this.state.userInfo.bloodGroup}
                    onInputChange={(event, inputName) => {
                        this.handleInputChange(event, inputName)
                    }}
                />
                <ContactsSection
                    email={this.state.userInfo.email}
                    phone={this.state.userInfo.phone}
                    onInputChange={(event, inputName) => {
                        this.handleInputChange(event, inputName)
                    }}
                />
                <PasswordSection
                    oldPassword={this.state.userInfo.oldPassword}
                    password={this.state.userInfo.password}
                    repeatPassword={this.state.userInfo.repeatPassword}
                    onInputChange={(event, inputName) => {
                        this.handleInputChange(event, inputName)
                    }}
                />
                <ControlPanel
                    onResetClick={(event) => {
                        this.handleResetClick(event)
                    }}
                    onSaveClick={(event) => {
                        this.handleSaveClick(event)
                    }}
                />
            </div>
        )
    }
}
