import { logo } from './logo.js'

function Tab(props) {
    let icon = ''

    if (props.icon) {
        icon = <span className="material-symbols-outlined">{props.icon}</span>
    }

    let className = 'link'

    if (props.isActive) {
        className += ' active'
    }

    const key = `tab__${props.link}`

    return (
        <li key={key} className="list__item">
            <a
                href={props.link}
                className={className}
                onClick={(event) => {
                    if (props.onClick) {
                        props.onClick(event, props.link)
                    }
                }}
            >
                {icon}
                <span className="link-text">{props.text}</span>
            </a>
        </li>
    )
}

export class SideBar extends React.Component {
    renderTab(tab, activeTab, onClick) {
        let isActive = false
        if (tab.link === activeTab) {
            isActive = true
        }

        return (
            <Tab
                link={tab.link}
                isActive={isActive}
                icon={tab.icon}
                text={tab.text}
                onClick={(event, link) => onClick(event, link)}
            />
        )
    }

    render() {
        const tabs = this.props.tabs.map((tab) => {
            const onClick = this.props.onClick
            return this.renderTab(tab, this.props.activeTab, onClick)
        })

        return (
            <aside className="side-bar">
                {logo}
                <ul className="list">
                    {tabs}

                    <li key="spacer" className="spacer"></li>
                    <li key="logoutButton" className="list__item">
                        <button
                            name="logout"
                            className="button secondary scolor"
                        >
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                            <span className="button-text">Вихід</span>
                        </button>
                    </li>
                </ul>
            </aside>
        )
    }
}
