function HistoryItem(props) {
    const link = `/my-tests?test-id=${props.testId}`
    return (
        <li key={props.name} className="list__item history__item">
            <div className="date">{props.date}</div>
            <div className="donation-type">{props.donationType}</div>
            <div className="test-result">
                <span className="test-result__text">{props.testResult}</span>
                <a
                    href={link}
                    className="link test-result__link"
                    onClick={(event) => {
                        props.onLinkClick(event, link, props.testId)
                    }}
                >
                    Докладніше
                </a>
            </div>
            <div className="details">{props.details}</div>
        </li>
    )
}

class History extends React.Component {
    renderHistoryItems(donation) {
        return (
            <HistoryItem
                date={donation.date}
                donationType={donation.donationType}
                testId={donation.date}
                testResult={donation.testResult}
                details={donation.details}
                onLinkClick={(event, link, id) =>
                    this.props.onLinkClick(event, link, id)
                }
            />
        )
    }

    render() {
        const historyItems = this.props.donations.map((donation) => {
            return this.renderHistoryItems(donation)
        })

        return (
            <ul className="list history h-secondary">
                <header className="history__header history__item">
                    <div className="header__item">
                        <div className="value">Дата</div>
                    </div>
                    <div className="header__item">
                        <div className="value">Тип донації</div>
                    </div>
                    <div className="header__item">
                        <div className="value">Аналіз крові</div>
                    </div>
                    <div className="header__item">
                        <div className="value">Подробиці</div>
                    </div>
                </header>

                {historyItems}
            </ul>
        )
    }
}

export class MyDonations extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            donations: [],
        }

        this.loadDonations()
    }

    handleLinkClick(event, link, id) {
        this.props.onLinkClick(event, link, id)
    }

    loadDonations() {
        fetch('/api/donor/donations/get-donations', {
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

                this.setState({
                    donations: data.result,
                })
            })
    }

    render() {
        return (
            <div className="container">
                <History
                    donations={this.state.donations}
                    onLinkClick={(event, link, id) =>
                        this.handleLinkClick(event, link, id)
                    }
                />
            </div>
        )
    }
}
