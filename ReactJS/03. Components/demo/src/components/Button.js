import React, { Component } from 'react';

class Button extends Component {
    constructor (props) {
        super(props);

        this.buttonClick = this.buttonClick.bind(this);

        this.state = {
            count: 0
        }
    }

    buttonClick () {
        this.setState(prevState => ({
            count: prevState.count + 1
            //DO NOT USE ++ HERE!! It will update previous state!
        }))
    }

    render () {
        return (
            <button onClick={this.buttonClick}>
                {this.props.text} - Clicked {this.state.count} times!
            </button>
        )
    }
}

export default Button;
