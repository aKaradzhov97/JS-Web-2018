import React, { Component } from 'react'
import observer from '../../infrastructure/observer';
import '../../styles/notifications.css'

const DEFAULT_STATE = {
    message: '',
    success: '',
    error: '',
    loading: ''
}

export default class Notification extends Component {
    constructor(props) {
        super(props)

        this.state = DEFAULT_STATE

        observer.subscribe(observer.events.notification, this.showNotification)
    }

    showNotification = data => {
        let message = data.message
        let type = data.type
        this.setState({ [type]: message })
    }

    hideNotification = e => this.setState(DEFAULT_STATE)

    render() {
        if (this.state.success !== '') {
            return <div id="infoBox"  className="notification">{this.state.success}</div>
        }
        if (this.state.error !== '') {
            return <div id="errorBox"  className="notification">{this.state.error}</div>
        }
        if (this.state.loading !== '') {
            return <div id="loadingBox"  className="notification">{this.state.loading}</div>
        }
        
        return null
    }
}