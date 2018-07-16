import React, { Component } from 'react'
import '../../styles/header.css'
import observer from '../../infrastructure/observer'

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = { username: '' }

        observer.subscribe(observer.events.loginUser, this.userLoggedIn.bind(this))
    }

    userLoggedIn = username => {
        this.setState({ username })
    }

    render() {
        const loggedInSection =
            <div id="profile">
                <span id="username">Hello, {this.state.username}!
                </span>|<a href="/logout" id="linkMenuLogout">logout</a>
            </div>

        return (
            <header>
                <span className="logo">&#9731;</span><span className="header">SeenIt</span>
                {this.state.username !== '' ? loggedInSection : null}
            </header>
        )
    }
}