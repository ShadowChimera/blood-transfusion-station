'use strict'

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            editMode: false,
            nameValue: 'Бабенко Олексій',
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event, inputName) {
        this.setState({ [key]: event.target.value })
    }

    render() {
        let usernameElement = (
            <div className="username">{this.state.nameValue}</div>
        )
        if (editMode) {
            usernameElement = (
                <input
                    type="text"
                    name="name"
                    id="input-name"
                    className="input secondary username"
                    placeholder="Ваше ім'я"
                    value={this.state.nameValue}
                    onChange={(event) => {
                        this.handleChange(event, 'name')
                    }}
                />
            )
        }

        return (
            <div className="profile__header__inner">
                <div className="avatar"></div>
                {usernameElement}

                <ul id="blood-group" className="list">
                    <li className="list__item">
                        <span className="value">A (II)</span>
                    </li>
                    <li className="list__item">
                        <span className="value">Rh+</span>
                    </li>
                    <li className="list__item">
                        <span className="value">kell+</span>
                    </li>
                </ul>
            </div>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('profile-header-root'))
root.render(<Header />)
