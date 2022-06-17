import { logo } from './logo.js'

function NavItem(props) {
    const key = `navItem__${props.link}`

    let className = props.type
    let link = props.link

    if (props.isActive) {
        className += ' active'
        link = '#'
    }

    return (
        <li key={key} className="list__item">
            <a href={link} className={className}>
                {props.text}
            </a>
        </li>
    )
}

class Nav extends React.Component {
    renderNavItem(nav) {
        return (
            <NavItem
                link={nav.link}
                isActive={nav.isActive}
                text={nav.text}
                type={nav.type}
            />
        )
    }

    render() {
        const navItems = this.props.navItems.map((nav) => {
            nav.type = 'link'
            return this.renderNavItem(nav)
        })

        const profileNavItems = this.props.profileNavItems.map((nav) => {
            return this.renderNavItem(nav)
        })

        return (
            <nav className="main-nav">
                <ul className="list info-nav">{navItems}</ul>

                <ul className="list profile-nav">{profileNavItems}</ul>
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
                    <Nav
                        navItems={this.props.navItems}
                        profileNavItems={this.props.profileNavItems}
                    />
                </div>
            </header>
        )
    }
}
