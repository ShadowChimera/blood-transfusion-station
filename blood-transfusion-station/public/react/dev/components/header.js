import { logo } from './logo.js'

function NavItem(props) {
    const key = `navItem__${props.link}`

    return (
        <li key={key} className="list__item">
            <a href={props.link} className="link">
                {props.text}
            </a>
        </li>
    )
}

class Nav extends React.Component {
    renderNavItem(nav) {
        return <NavItem link={nav.link} text={nav.text} />
    }

    render() {
        const navItems = this.props.navItems.map((nav) => {
            return this.renderNavItem(nav)
        })

        return (
            <nav className="main-nav">
                <ul className="list info-nav">{navItems}</ul>

                <ul className="list profile-nav">
                    <li key="navItem__profile" className="list__item">
                        <a href="#" className="link active">
                            Особистий кабінет
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export class Header extends React.Component {
    render() {
        return (
            <header className="main-header">
                {logo}

                <div className="container">
                    <Nav navItems={this.props.navItems} />
                </div>
            </header>
        )
    }
}
