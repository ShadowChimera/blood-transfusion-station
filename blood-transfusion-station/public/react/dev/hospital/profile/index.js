import { Header } from '../../components/header.js'
import { SideBar } from '../../components/profile-side-bar.js'
import { UserInfo } from './tabs-content/user-info.js'
import { MyRequests } from './tabs-content/my-requests.js'

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
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
                // {
                //     link: '/about/donation',
                //     text: 'Про донорство',
                //     type: 'link',
                // },
            ],
            profileNav: [
                {
                    link: '/send-blood-request',
                    text: 'Подати запит',
                    type: 'link button secondary tcolor',
                },
                {
                    link: '/profile',
                    text: 'Особистий кабінет',
                    type: 'link',
                    isActive: true,
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
                        link: '/my-requests',
                        icon: 'water_drop',
                        text: 'Мої запити',
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

    handleLinkForTestClick(event, link, id) {
        event.preventDefault()
        console.log(link)
    }

    handleTestClick(event, test) {
        // event.preventDefault()
        console.log(test)
    }

    render() {
        let mainContent = <UserInfo />

        switch (this.state.sideBar.activeTab) {
            case '/profile':
                mainContent = <UserInfo />
                break
            case '/my-requests':
                mainContent = <MyRequests />
                break
        }

        return (
            <div className="body">
                <Header
                    navItems={this.state.mainNav}
                    profileNavItems={this.state.profileNav}
                />
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
