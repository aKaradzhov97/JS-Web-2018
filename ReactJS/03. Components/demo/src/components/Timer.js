import React, { Component } from 'react';

class Timer extends Component {
    constructor (props) {
        super (props)

        this.state = {
            date: new Date()
        }
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.tick()
            }, 1000
        )
    }

    //Good practice is to clear running timers...
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render () {
        return (<span>Current time is: {this.state.date.toLocaleTimeString()}</span>)
    }
}

export default Timer;