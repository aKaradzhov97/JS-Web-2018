import React, { Component } from 'react';
import requester from '../../utils/requester';
import observer from '../../utils/observer';
import notificator from '../../utils/notificator';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
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

        //Validate here.

        if (this.state.username.length < 4) {
            notificator.showError('Потребителското име трябва да е най-малко 4 знака!');
            return;
        } else if (this.state.password.length < 5) {
            notificator.showError('Паролата трябва да е най-малко 5 знака!');
            return;
        }

        requester.post('user', 'login', 'basic', this.state)
            .then(res => {
                observer.trigger(observer.events.loginUser, res.username);

                sessionStorage.setItem('username', res.username);
                sessionStorage.setItem('authtoken', res._kmd.authtoken);
                sessionStorage.setItem('userId', res._id);
                if (res._kmd.roles !== undefined) {
                    sessionStorage.setItem('roleId', res._kmd.roles[0].roleId);
                }
                notificator.showInfo('Влязохте успешно в акаунта си!');

                this.props.history.push('/catalog');

            }).catch((res) => {
                if (res.responseJSON.description === 'Invalid credentials. Please retry your request with correct credentials.') {
                    notificator.showError('Грешно потребителско име и/или парола! Опитайте отново!');
                }

                this.setState({ username: '', password: '' });
            });
        //Notifications & validation remaining
        //Clear input fields.
        this.setState({
            username: '',
            password: ''
        })
    };

    render = () => {
        return (
            <main>
                <section id="viewLogin" className="viewLogin">
                    <h1 className="titleForm">Моля влезте:</h1>
                    <form onSubmit={this.handleSubmit} id="formLogin" className="form">
                        <div>Потребителско име:</div>
                        <div><input type="text" onChange={this.handleChange} value={this.state.username} name="username" required /></div>
                        <div>Парола:</div>
                        <div><input type="password" onChange={this.handleChange} value={this.state.password} name="password" required /></div>
                        <div><input type="submit" id="buttonLoginUser" value="Вход!" /></div>
                    </form>
                </section>
            </main>
        )
    }
}