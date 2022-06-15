function HistoryItem(props) {
    return (
        <li key={props.name} className="list__item history__item">
            <div className="name">{props.name}</div>
            <div className="remaining-time">
                <span className="material-symbols-outlined">timer</span>
                <span className="value">{props.remainingTime}</span>
            </div>
            <div className="start-time">
                <span className="material-symbols-outlined">
                    event_upcoming
                </span>
                <span className="value">{props.startTime}</span>
            </div>
            <div className="end-time">
                <span className="material-symbols-outlined">
                    event_available
                </span>
                <span className="value">{props.endTime}</span>
            </div>
        </li>
    )
}

function ControlPanel(props) {
    return (
        <div className="control-buttons">
            <button
                className="button flat"
                name="add"
                onClick={(event) => props.onAddClick(event)}
            >
                <span className="material-symbols-outlined">add</span>
                <span className="button-text">Додати обмеження</span>
            </button>
        </div>
    )
}

class History extends React.Component {
    renderHistoryItems(restriction) {
        return (
            <HistoryItem
                name={restriction.name}
                remainingTime={restriction.remainingTime}
                startTime={restriction.startTime}
                endTime={restriction.endTime}
            />
        )
    }

    render() {
        const historyItems = this.props.restrictions.map((restriction) => {
            return this.renderHistoryItems(restriction)
        })

        return (
            <ul className="list history">
                <header className="history__header history__item">
                    <div className="header__item">
                        <div className="value">Назва обмеження</div>
                    </div>
                    <div className="header__item">
                        <div className="value">Час, що залишився</div>
                    </div>
                    <div className="header__item">
                        <div className="value">Початкова дата</div>
                    </div>
                    <div className="header__item">
                        <div className="value">Кінцева дата</div>
                    </div>
                </header>

                {historyItems}
            </ul>
        )
    }
}

function SectionItem(props) {
    return (
        <li className="list__item" onClick={(event) => props.onClick(event)}>
            <div className="name">{props.name}</div>
            <span className="material-symbols-outlined">chevron_right</span>
        </li>
    )
}
function ListItem(props) {
    return (
        <li className="list__item" onClick={(event) => props.onClick(event)}>
            <div className="name">{props.name}</div>
        </li>
    )
}

class SelectionMenu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentSection: null,
            selected: [],
        }

        this.restrictions = {
            'Лікування зубів': [
                {
                    name: 'Лікування зубів',
                    duration: 'h24',
                },
                {
                    name: 'Видалення зуба',
                    duration: 'w1',
                },
                {
                    name: 'Запалення прикореневих тканин зуба, запалення ясен',
                    duration: 'w2',
                },
                {
                    name: 'Стоматит (запалення ротової порожнини)',
                    duration: 'w2',
                },
                {
                    name: 'Амбулаторні стоматологічні операції',
                    duration: 'm1',
                },
            ],
            'Захворювання органів дихання': [
                {
                    name: 'Бронхіт',
                    duration: 'm1',
                },
                {
                    name: 'Бронхіальна астма',
                    duration: 'm1',
                },
                {
                    name: 'Застуда (нежить, кашель, біль у горлі)',
                    duration: 'w2',
                },
                {
                    name: 'Грип',
                    duration: 'w2',
                },
                {
                    name: 'Запалення легенів',
                    duration: 'm6',
                },
                {
                    name: '(Тільки) нежить',
                    duration: 'w1',
                },
                {
                    name: 'Гайморіт',
                    duration: 'm1',
                },
                {
                    name: 'Запалення мигдаликів, ангіна',
                    duration: 'm1',
                },
                {
                    name: 'Туберкульоз',
                    duration: 'y2',
                },
            ],
            Пухлини: [
                {
                    name: 'Доброякісна пухлина',
                    duration: '~',
                },
                {
                    name: 'Злоякісна пухлина',
                    duration: '-',
                },
            ],
            'Захворювання сечостатевих органів': [
                {
                    name: 'Простатит',
                    duration: 'm1',
                },
                {
                    name: 'Цистит без лихоманки',
                    duration: 'w2',
                },
                {
                    name: 'Цистит з лихоманкою (лікарняне лікування)',
                    duration: 'm3',
                },
                {
                    name: 'Запалення яєчників та придатків',
                    duration: 'm1',
                },
                {
                    name: 'Запалення ниркової балії',
                    duration: 'm12',
                },
            ],
            'Захворювання вуха': [
                {
                    name: 'Негнійний отит',
                    duration: 'w2',
                },
                {
                    name: 'Гнійний отит',
                    duration: 'm1',
                },
            ],
            'Шкірні захворювання': [
                {
                    name: 'Гострий алергічний висип',
                    duration: '~',
                },
                {
                    name: 'Прищі',
                    duration: '~',
                },
                {
                    name: 'Атопічний дерматит',
                    duration: '~',
                },
                {
                    name: 'Екзема',
                    duration: '~',
                },
                {
                    name: 'Псоріаз',
                    duration: '~',
                },
                {
                    name: 'Видалення рідної плями, папілом',
                    duration: 'w2',
                },
            ],
            'Інфекційні захворювання': [
                {
                    name: 'Бореліоз',
                    duration: 'm1',
                },
                {
                    name: 'Кліщовий енцефаліт',
                    duration: 'y1',
                },
                {
                    name: 'Захворювання на гепатит А',
                    duration: 'y1',
                },
                {
                    name: 'Захворювання на гепатит B',
                    duration: '-',
                },
                {
                    name: 'Захворювання на гепатит C',
                    duration: '-',
                },
                {
                    name: 'Сексуальний контакт з особою, яка перенесла гепатит В або С або носієм маркерів вірусу',
                    duration: 'm4',
                },
                {
                    name: 'Побутовий домашній контакт із хворим на гепатит',
                    duration: 'm4',
                },
                {
                    name: 'Герпес Зостер (перепоясуючий лишай)',
                    duration: 'w2',
                },
                {
                    name: 'Простий герпес',
                    duration: '1w',
                },
                {
                    name: 'ВІЛ (СНІД)',
                    duration: '-',
                },
                {
                    name: 'Сексуальний контакт із ВІЛ-позитивною особою',
                    duration: 'm4',
                },
                {
                    name: 'Носіння вірусу папіломи',
                    duration: '~',
                },
                {
                    name: 'Мікоплазмова інфекція',
                    duration: 'm4',
                },
                {
                    name: 'Токсоплазмоз',
                    duration: 'm6',
                },
                {
                    name: 'Туберкульоз',
                    duration: 'y2',
                },
            ],
            'Операції та травми': [
                {
                    name: 'Видалення апендикса',
                    duration: 'm4',
                },
                {
                    name: 'Видалення жовчного міхура ',
                    duration: 'm4',
                },
                {
                    name: 'Операції на хребті',
                    duration: 'm4',
                },
                {
                    name: 'Операції на суглобах',
                    duration: 'm4',
                },
                {
                    name: 'Ендоскопічні операції',
                    duration: 'm4',
                },
                {
                    name: 'Видалення мигдаликів',
                    duration: 'm2',
                },
                {
                    name: 'Операції на носі та придаткових пазухах носа',
                    duration: 'm2',
                },
                {
                    name: 'Операції на очах (за виключенням лазера)',
                    duration: 'm2',
                },
                {
                    name: 'Часткове видалення шлунка чи товстого кишечника',
                    duration: '-',
                },
                {
                    name: 'Гінекологічні операції',
                    duration: 'm6',
                },
                {
                    name: 'Відкриті операції у черевній порожнині',
                    duration: 'm6',
                },
                {
                    name: 'Лазерна операція на очах',
                    duration: 'm1',
                },
                {
                    name: 'Численні травми',
                    duration: 'y1',
                },
                {
                    name: 'Видалення рідної плями, папілом',
                    duration: 'm2',
                },
                {
                    name: 'Переломи кісток',
                    duration: 'm4',
                },
            ],
            'Вагітність і післяродовий період': [
                {
                    name: 'Аборт',
                    duration: 'm6',
                },
                {
                    name: 'Вагітність',
                    duration: '/',
                },
                {
                    name: 'Годування груддю',
                    duration: '/',
                },
                {
                    name: 'Пологи',
                    duration: 'm6',
                },
            ],
        }
    }

    handleSectionClick(event, name) {
        this.setState({
            currentSection: name,
        })
    }

    handleRestrictionClick(event, name) {
        const newSelected = this.state.selected.slice()

        if (newSelected.includes(name)) {
            newSelected.splice(newSelected.indexOf(name), 1)
        } else {
            newSelected.push(name)
        }

        this.setState({
            selected: newSelected,
        })
    }

    renderSectionItem(name) {
        return (
            <SectionItem
                name={name}
                onClick={(event) => this.handleSectionClick(event, name)}
            />
        )
    }

    renderListItem(name) {
        return (
            <ListItem
                name={name}
                onClick={(event) => this.handleRestrictionClick(event, name)}
            />
        )
    }

    render() {
        let list = null
        let title = null

        const curSection = this.state.currentSection

        if (curSection) {
            list = this.restrictions[curSection].map((restriction) => {
                return this.renderListItem(restriction.name)
            })
            title = curSection
        } else {
            list = Object.keys(this.restrictions).map((section) => {
                return this.renderSectionItem(section)
            })
            title = 'Оберіть секцію'
        }

        return (
            <ul className="list restrictions">
                <header className="restrictions__header">{title}</header>

                {list}
            </ul>
        )
    }
}

export class MyRestrictions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            addMode: false,
            restrictions: [
                {
                    name: 'Гепатит А',
                    remainingTime: '7 місяців',
                    startTime: '15.01.2022',
                    endTime: '15.01.2023',
                },
                {
                    name: 'Лазерна операція на очах',
                    remainingTime: '3 дні',
                    startTime: '17.05.2022',
                    endTime: '18.06.2022',
                },
            ],
        }
    }

    handleAddClick(event) {
        this.setState({
            addMode: true,
        })
    }

    handleRemoveClick(event, name) {}

    render() {
        if (this.state.addMode) {
            return (
                <div className="container">
                    <SelectionMenu />
                </div>
            )
        }

        return (
            <div className="container">
                <History
                    restrictions={this.state.restrictions}
                    onAddClick={(event) => this.handleAddClick(event)}
                    onRemoveClick={(event, name) =>
                        this.handleRemoveClick(event, name)
                    }
                />
                <ControlPanel
                    onAddClick={(event) => this.handleAddClick(event)}
                />
            </div>
        )
    }
}
