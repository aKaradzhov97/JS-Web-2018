import React, { Component } from 'react';
import requester from "../../utils/requester";
import observer from '../../utils/observer';
import notificator from "../../utils/notificator";

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            email: ''
        }
    }

    handleChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;

        this.setState({
            [fieldName]: fieldValue
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        //Validation:
        if (!(/^[A-Za-z0-9]{4,}$/.test(this.state.username))) {
            notificator.showError('Потребителското име трябва да е от поне 4 знака и да съдържа само английски букви или цифри!');
            return;
        } else if (!(/^[A-Za-z\d]{5,}$/.test(this.state.password))) {
            notificator.showError('Паролата трябва да е от поне 5 знака и да съдържа символи [a-z][A-Z] и цифри [0-9]!');
            return
        } else if (this.state.repeatPassword !== this.state.password) {
            notificator.showError('Паролите не съвпадат!');
            return;
        } else if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.email)) {
            notificator.showError('Моля въведете валиден email адрес!');
            return;
        }
        //End of validation!
        
        let data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        };

        requester.post('user', '', 'basic', data)
            .then((res) => {
                observer.trigger(observer.events.loginUser, res.username);
                notificator.showInfo('Регистрирахте се успешно! Добре дошли в Tire Mania!');

                sessionStorage.setItem('username', res.username);
                sessionStorage.setItem('authtoken', res._kmd.authtoken);
                sessionStorage.setItem('userId', res._id);
                this.props.history.push('/account');

            }).catch((res) => {
                notificator.handleError(res);

                this.setState({ username: '', password: '', repeatPassword: '', email: '' });
            });
    };

    render = () => {
        return (
            <main>
                <section id="viewRegister" className="viewRegister">
                    <h1 className="titleForm">Регистрирай се</h1>
                    <form onSubmit={this.handleSubmit} id="formRegister" className="form">
                        <div>Потребителско име:</div>
                        <div><input type="text" onChange={this.handleChange} value={this.state.username} name="username" required /></div>
                        <div>Парола:</div>
                        <div><input type="password" onChange={this.handleChange} value={this.state.password} name="password" required /></div>
                        <div>Потвърди паролата:</div>
                        <div><input type="password" onChange={this.handleChange} value={this.state.repeatPassword} name="repeatPassword" required /></div>
                        <div>Email:</div>
                        <div><input type="email" onChange={this.handleChange} value={this.state.email} name="email" required /></div>
                        <div><input type="submit" id="buttonRegisterUser" value="Регистрирай ме!" /></div>
                    </form>
                </section>
            </main>
        )
    }
}