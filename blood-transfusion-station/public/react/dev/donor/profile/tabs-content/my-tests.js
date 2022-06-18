function HistoryItem(props) {
    const link = `/my-tests?test-id=${props.testId}`
    return (
        <li key={props.name} className="list__item history__item">
            <div className="date">{props.date}</div>
            <div className="express-test">{props.expressTest}</div>
            <div className="lab-test">{props.labTest}</div>
            <div className="details">
                <button
                    className="button secondary"
                    name="open"
                    onClick={(event) =>
                        props.onTestClick(event, props.fullTest, props.date)
                    }
                >
                    <span className="material-symbols-outlined">info</span>
                    <span className="button-text">Переглянути</span>
                </button>
            </div>
        </li>
    )
}

class History extends React.Component {
    renderHistoryItems(test) {
        return (
            <HistoryItem
                date={test.date}
                expressTest={test.expressTest}
                labTest={test.labTest}
                fullTest={test.fullTest}
                onTestClick={(event, test, title) =>
                    this.props.onTestClick(event, test, title)
                }
            />
        )
    }

    render() {
        const historyItems = this.props.tests.map((test) => {
            return this.renderHistoryItems(test)
        })

        return (
            <ul className="list history h-tertiary">
                <header className="history__header history__item">
                    <div className="header__item">
                        <div className="value">Дата</div>
                    </div>
                    <div className="header__item">
                        <div className="value">Експрес-тест</div>
                    </div>
                    <div className="header__item">
                        <div className="value">Лабораторний тест</div>
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

class Table extends React.Component {
    renderColumn(data, isHeader = false) {
        if (isHeader) {
            return <th className="column">{data}</th>
        }

        return <td className="column">{data}</td>
    }

    renderRow(data, isHeader = false) {
        const content = data.map((columnData) => {
            return this.renderColumn(columnData, isHeader)
        })

        let className = 'row'

        if (isHeader) {
            className = 'header'
        }

        return <tr className={className}>{content}</tr>
    }

    render() {
        const header = this.renderRow(this.props.header, true)

        const content = this.props.data.map((rowData) => {
            return this.renderRow(rowData)
        })

        return (
            <table className="table">
                {header}
                {content}
            </table>
        )
    }
}

class Test extends React.Component {
    constructor(props) {
        super(props)

        this.state = JSON.parse(this.props.test)
        // this.state = {
        //     express: {},
        //     lab: {},
        //     viruses: [],
        // }

        // console.log('Test')
        // console.log(this.props.testId)

        // this.loadTest()
    }

    loadTest() {
        fetch('/api/donor/donations/get-test-info', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ testId: this.props.testId }),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data.result)
                this.setState(data.result)
            })
    }

    handleBackClick(event) {
        this.props.onBackClick(event)
    }

    render() {
        console.log(this.state)

        return (
            <div className="table-container">
                <header className="header control-header">
                    <button
                        className="button simple round"
                        name="back"
                        onClick={(event) => this.handleBackClick(event)}
                    >
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                    </button>
                    <span className="header__text">{this.props.title}</span>
                </header>
                <section className="section">
                    <h1 className="title">Експрес-тест</h1>
                    <Table
                        header={this.state.express.header}
                        data={this.state.express.data}
                    />
                </section>
                <section className="section">
                    <h1 className="title">Лабораторний-тест</h1>
                    <Table
                        header={this.state.lab.header}
                        data={this.state.lab.data}
                    />
                </section>
            </div>
        )
    }
}

export class MyTests extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showTestInfo: false,
            testToShow: {},
            tests: [],
        }

        console.log('MyTests')
        console.log(this.props.testId)

        if (this.props.testId) {
            this.state.showTestInfo = true
            this.state.testToShow = {
                title: this.props.testId,
            }
        }

        this.loadTests()
    }

    handleTestClick(event, test, title = '') {
        event.preventDefault()

        this.setState({
            showTestInfo: true,
            testToShow: {
                title: title,
                test: test,
            },
        })

        // this.props.onTestClick(event, test)
    }

    handleBackClick(event) {
        this.setState({
            showTestInfo: false,
            testToShow: null,
        })
    }

    loadTests() {
        fetch('/api/donor/donations/get-tests', {
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
                    tests: data.result,
                })
            })
    }

    render() {
        let content = ''
        if (this.state.showTestInfo) {
            content = (
                <Test
                    test={this.state.testToShow.test}
                    title={this.state.testToShow.title}
                    testId={this.state.testToShow.title}
                    onBackClick={(event) => this.handleBackClick(event)}
                />
            )
        } else {
            content = (
                <History
                    tests={this.state.tests}
                    onTestClick={(event, test, title) =>
                        this.handleTestClick(event, test, title)
                    }
                />
            )
        }

        return <div className="container">{content}</div>
    }
}
