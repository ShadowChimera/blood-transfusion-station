function HistoryItem(props) {
    const link = `/my-tests?test-id=${props.testId}`

    // const components = props.components.map((component) => {
    //     return <div>component</div>
    // })

    return (
        <li key={props.name} className="list__item history__item">
            <div className="date">{props.date}</div>
            <div className="blood-group">{props.bloodGroup}</div>
            <div className="blood-component">{props.component}</div>
            <div className="count">{props.count}</div>
            <div className="status">{props.status}</div>
        </li>
    )
}

class History extends React.Component {
    renderHistoryItems(request) {
        return (
            <HistoryItem
                date={request.date}
                bloodGroup={request.bloodGroup}
                component={request.component}
                count={request.count}
                status={request.status}
            />
        )
    }

    render() {
        const historyItems = this.props.requests.map((request) => {
            return this.renderHistoryItems(request)
        })

        return (
            <ul className="list history h-5 h-secondary">
                <header className="history__header history__item">
                    <div className="header__item">
                        <div className="value">Дата</div>
                    </div>
                    <div className="header__item">
                        <div className="value">Група крові</div>
                    </div>
                    <div className="header__item">
                        <div className="value">Компонента</div>
                    </div>
                    <div className="header__item">
                        <div className="value">Кількість</div>
                    </div>
                    <div className="header__item">
                        <div className="value">Статус</div>
                    </div>
                </header>

                {historyItems}
            </ul>
        )
    }
}

export class MyRequests extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            requests: [],
        }

        this.loadRequests()
    }

    handleLinkClick(event, link, id) {
        this.props.onLinkClick(event, link, id)
    }

    loadRequests() {
        fetch('/api/hospital/blood-requests/get-blood-requests', {
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
                    requests: data.result,
                })
            })
    }

    render() {
        return (
            <div className="container">
                <History requests={this.state.requests} />
            </div>
        )
    }
}
