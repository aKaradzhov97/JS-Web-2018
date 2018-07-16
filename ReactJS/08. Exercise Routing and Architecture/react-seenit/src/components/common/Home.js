import React, { Component } from 'react'
import RegisterForm from '../user/RegisterForm'
import LoginForm from '../user/LoginForm'
import About from './About'
import Notification from './Notification'
import '../../styles/site.css'

export default class Home extends Component {

    render() {
        return (
            <div className="content">
                <Notification />
                <div className="welcome">
                    <div className="signup">
                        <LoginForm {...this.props} />
                        <RegisterForm />
                    </div>
                    <div className="about">
                        <About />
                    </div>
                </div>
            </div>
        )
    }
}