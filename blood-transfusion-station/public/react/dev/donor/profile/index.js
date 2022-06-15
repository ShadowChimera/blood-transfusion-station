import { Header } from '../../components/header.js'
import { SideBar } from '../../components/profile-side-bar.js'
import { UserInfo } from './tabs-content/user-info.js'
import { MyRestrictions } from './tabs-content/my-restrictions.js'

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mainNav: [
                {
                    link: '/',
                    text: 'Головна',
                },
                {
                    link: '/about/station',
                    text: 'Про центр',
                },
                {
                    link: '/about/donation',
                    text: 'Про донорство',
                },
            ],
            sideBar: {
                activeTab: '/profile',
                tabs: [
                    {
                        link: '/profile',
                        icon: 'person',
                        text: 'Профіль',
                        isActive: true,
                    },
                    {
                        link: '/my-restrictions',
                        icon: 'block',
                        text: 'Мої обмеження',
                    },
                    {
                        link: '/my-donations',
                        icon: 'water_drop',
                        text: 'Мої донації',
                    },
                    {
                        link: '/my-tests',
                        icon: 'science',
                        text: 'Мої аналізи',
                    },
                    {
                        link: '/notifications-settings',
                        icon: 'notifications',
                        text: 'Повідомлення',
                    },
                ],
            },
        }
    }

    handleTabClick(event, link) {
        event.preventDefault()

        this.setState({
            sideBar: {
                activeTab: link,
                tabs: this.state.sideBar.tabs,
            },
        })
    }

    render() {
        let mainContent = <UserInfo />

        switch (this.state.sideBar.activeTab) {
            case '/profile':
                mainContent = <UserInfo />
                break
            case '/my-restrictions':
                mainContent = <MyRestrictions />
                break
        }

        return (
            <div className="body">
                <Header navItems={this.state.mainNav} />
                <SideBar
                    tabs={this.state.sideBar.tabs}
                    activeTab={this.state.sideBar.activeTab}
                    onClick={(event, link) => this.handleTabClick(event, link)}
                />
                <div className="main-content profile">{mainContent}</div>
            </div>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Profile />)
