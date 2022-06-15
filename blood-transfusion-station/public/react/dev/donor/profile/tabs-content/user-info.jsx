<div className="temp-container">
    <header className="profile__header" id="profile-header-root">
        <div className="avatar"></div>
            <!-- <input type="text" name="name" id="input-name" className="input secondary" value="Бабенко Олексій" placeholder="Ваше ім'я"> -->
        <div className="username">Бабенко Олексій</div>
        <div className="blood-group-container">
            <div className="label">Група крові</div>
            <ul id="blood-group" className="list">
                <li className="list__item">
                    <span className="value">A (II)</span>
                </li>
                <li className="list__item">
                    <span className="value">Rh+</span>
                </li>
                <li className="list__item">
                    <span className="value">Kell+</span>
                </li>
            </ul>
        </div>
    </header>
    
    <section className="section">
    <h1 className="title">Контактна інформація</h1>
    
    <ul className="list">
        <li className="list__item">
            <div className="input-container">
                <span className="material-symbols-outlined">
                    mail
                </span>
                <input type="email" name="email" className="input" value="alexey22042001@gmail.com" placeholder="Пошта">
            </div>
        </li>
        <li className="list__item">
            <div className="input-container">
                <span className="material-symbols-outlined">
                    phone
                </span>
                <input type="phone" name="phone" className="input" value="+380685494521" placeholder="Телефон">
            </div>
        </li>
    </ul>
    </section>
    
    <section className="section">
    <h1 className="title">Зміна паролю</h1>
    
    <ul className="list">
        <li className="list__item">
            <div className="input-container">
                <span className="material-symbols-outlined">
                    lock_open
                </span>
                <input type="password" name="old-password" className="input" placeholder="Старий пароль">
            </div>
        </li>
        <li className="list__item">
            <div className="input-container">
                <span className="material-symbols-outlined">
                    lock
                </span>
                <input type="password" name="password" className="input" placeholder="Новий пароль">
            </div>
        </li>
        <li className="list__item">
            <div className="input-container">
                <span className="material-symbols-outlined">
                    lock
                </span>
                <input type="password" name="repeat-password" className="input" placeholder="Повтор паролю">
            </div>
        </li>
    </ul>
    </section>
    
    <div className="control-buttons">
    <button className="button flat" name="reset">
        <span className="material-symbols-outlined">
            restart_alt
        </span>
        <span className="button-text">
            Скинути
        </span>
    </button>
    <button className="button flat" name="save">
        <span className="material-symbols-outlined">
            upgrade
        </span>
        <span className="button-text">
            Зберегти
        </span>
    </button>
    </div>
</div>