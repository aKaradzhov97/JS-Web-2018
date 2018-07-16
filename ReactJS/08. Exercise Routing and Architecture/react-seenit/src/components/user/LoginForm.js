import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'

export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

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

        requester.post('user', 'login', 'basic', { username: this.state.username, password: this.state.password })
            .then(res => {
                observer.trigger(observer.events.loginUser, this.state.username)
                observer.trigger(observer.events.notification, { type: 'success', message: 'Logged in successful' })
                sessionStorage.setItem('authtoken', res._kmd.authtoken)
                sessionStorage.setItem('userId', res._id)
                sessionStorage.setItem('username', res.username)
                this.props.history.push('/catalog')
            }).catch(res => {
                observer.trigger(observer.events.notification, {
                    type: 'error', message: res.responseJSON.description
                })
            })
    }

    render() {
        return (
            <form id="loginForm">
                <h2>Sign In</h2>
                <label>Username:</label>
                <input name="username" type="text" onChange={this.handleChange} />
                <label>Password:</label>
                <input name="password" type="password" onChange={this.handleChange} />
                <input id="btnLogin" type="submit" onClick={this.handleSumbit} value="Sign In" />
            </form>
        )
    }
}