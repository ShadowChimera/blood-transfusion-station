import { Header } from '../../components/header.js'
import { SideBar } from '../../components/profile-side-bar.js'
import { UserInfo } from './tabs-content/user-info.js'
import { MyRestrictions } from './tabs-content/my-restrictions.js'
import { MyDonations } from './tabs-content/my-donations.js'
import { MyTests } from './tabs-content/my-tests.js'

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
                {
                    link: '/about/donation',
                    text: 'Про донорство',
                    type: 'link',
                },
            ],
            profileNav: [
                {
                    link: '/appointment',
                    text: 'Записатися',
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
            toOpenId: null,
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

        this.setState({
            sideBar: {
                activeTab: '/my-tests',
                tabs: this.state.sideBar.tabs,
            },
            toOpenId: id,
        })
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
            case '/my-restrictions':
                mainContent = <MyRestrictions />
                break
            case '/my-donations':
                mainContent = (
                    <MyDonations
                        onLinkClick={(event, link, id) =>
                            this.handleLinkForTestClick(event, link, id)
                        }
                    />
                )
                break
            case '/my-tests':
                mainContent = (
                    <MyTests
                        testId={this.state.toOpenId}
                        onTestClick={(event, test) =>
                            this.handleTestClick(event, test)
                        }
                    />
                )
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
