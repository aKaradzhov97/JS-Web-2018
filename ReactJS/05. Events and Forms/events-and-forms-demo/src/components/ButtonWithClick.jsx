import React, { Component } from 'react';

export default class ButtonWithClick extends Component {
    onButtonClicked = () => {
        console.log(this.props.name);
    }

    render() {
        return (
            <button onClick={this.onButtonClicked}>Click me!</button>
        )
    }
}