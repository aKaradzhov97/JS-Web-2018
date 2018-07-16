import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import requester from "../../utils/requester";
import notificator from "../../utils/notificator";
import AdminPanel from '../../images/AdminPanel.svg';
import AdminPanelText from '../../images/AdminPanelText.svg';

export default class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: '',
            phone: '',
            city: '',
            quarter: '',
            street: '',
            postCode: '',
            email: ''
        }
    }

    isAdmin = () => {
        if (sessionStorage.getItem('roleId') && sessionStorage.getItem('username') && sessionStorage.getItem('authtoken')) {
            return true;
        }
        return false;
    };

    handleChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;

        this.setState({
            [fieldName]: fieldValue
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        requester.update('user', sessionStorage.getItem('userId'), 'kinvey', this.state)
            .then((res) => {
                this.props.history.push('/loading');
                localStorage.setItem('endpoint', '/catalog');
                localStorage.setItem('message', 'Обработваме Вашата информация!');
                notificator.showInfo('Успешно запазихте промените!')
            }).catch((res) => {
                notificator.showError('Възникна грешка при запазването на Вашата информация!');
            });
    };

    componentDidMount = () => {
        //Do when component is rendered...
        requester.get('user', sessionStorage.getItem('userId'), 'kinvey')
            .then((res) => {
                this.setState({
                    name: res.name,
                    surname: res.surname,
                    phone: res.phone,
                    city: res.city,
                    quarter: res.quarter,
                    street: res.street,
                    postCode: res.postCode,
                    email: res.email
                });
            }).catch(() => {
                notificator.showError('Възникна грешка при вземането на информация от базата данни!');
            });
    };

    render = () => {
        const userView = (
            <section className="viewCreateAd">
                <h1 className="titleForm">Моят акаунт:</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div>Моля попълнете всички полета с валидна информация!</div>
                    <div>Всички полета са задължителни!</div>
                    <hr/>
                    <div>Име</div>
                    <div><input type="text" onChange={this.handleChange} defaultValue={this.state.name} className="inputModel" name="name" minLength="1" /></div>
                    <div>Фамилия</div>
                    <div><input type="text" onChange={this.handleChange} defaultValue={this.state.surname} className="inputModel" name="surname" minLength="1" /></div>
                    <div>Мобилен телефон</div>
                    <div><input type="text" onChange={this.handleChange} defaultValue={this.state.phone} className="inputModel" name="phone" minLength='10' maxLength="10" /></div>
                    <div>Град</div>
                    <div><input type="text" onChange={this.handleChange} defaultValue={this.state.city} className="inputModel" name="city" minLength="1" /></div>
                    <div>Квартал</div>
                    <div><input type="text" onChange={this.handleChange} defaultValue={this.state.quarter} className="inputModel" name="quarter" /></div>
                    <div>Улица</div>
                    <div><input type="text" onChange={this.handleChange} defaultValue={this.state.street} className="inputModel" name="street" /></div>
                    <div>Пощенски код</div>
                    <div><input type="text" onChange={this.handleChange} defaultValue={this.state.postCode} className="inputModel" name="postCode" /></div>
                    <div>Email</div>
                    <div><input type="text" onChange={this.handleChange} defaultValue={this.state.email} className="inputModel" name="email" disabled /></div>
                    <div>*Ако желаете да промените Email-a си, свържете се с нас на телефон: 0893123456.</div>
                    <div><input type="submit" value="Обнови!" /></div>
                </form>
            </section>
        );

        const adminView = (
            <section id="viewAds" className="viewAds">
                <h1 className="titleForm">Администрация:</h1>
                <div id="adminView" className="ads">
                    <Link to="/createAd" id="linkCreateAd" className="adminLink">Създай обява</Link>
                    <Link to="/orders" id="linkCreateAd" className="adminLink">Поръчки</Link>
                    <div>
                        <img src={AdminPanel} alt="Admin panel." />
                    </div>
                    <div>
                        <img src={AdminPanelText} alt="Admin panel text." />
                    </div>
                </div>
            </section>
        );

        return (
            <main>
                {this.isAdmin() ? adminView : userView}
            </main>
        )
    }
}