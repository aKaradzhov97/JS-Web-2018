import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    handleChange(e) {
        let fieldName = e.target.name
        let fieldValue = e.target.value

        this.setState({ [fieldName]: fieldValue })
    }

    handleSumbit(e) {
        e.preventDefault()

        observer.trigger(observer.events.notification, { type: 'loading', message: 'Loading' })

        requester.post('user', '', 'basic', { username: this.state.username, password: this.state.password })
            .then(res => {
                observer.trigger(observer.events.loginUser, this.state.username)
                observer.trigger(observer.events.notification, { type: 'success', message: 'Signed up successful' })
                sessionStorage.setItem('authtoken', res._kmd.authtoken)
            }).catch(res => {
                observer.trigger(observer.events.notification, {
                    type: 'error', message: res.responseJSON.description
                })
            })
    }

    render() {
        return (
            <form id="registerForm">
                <h2>Register</h2>
                <label>Username:</label>
                <input name="username" type="text" onChange={this.handleChange} />
                <label>Password:</label>
                <input name="password" type="password" onChange={this.handleChange} />
                <label>Repeat Password:</label>
                <input name="repeatPass" type="password" onChange={this.handleChange} />
                <input id="btnRegister" type="submit" onClick={this.handleSumbit} value="Sign Up" />
            </form>
        )
    }
}