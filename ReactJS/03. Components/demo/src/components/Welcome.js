import React, { Component } from 'react';
import './Welcome.css';
import Logo from './Logo';
import Button from "./Button";

class Welcome extends Component {
    render () {
        let title = this.props.title || 'Title';
        let subtitle = this.props.subtitle || 'Subtitle';

        return (
            <div className="Welcome">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <Logo />
                <br />
                <Button text="Test" />
            </div>
        )
    }
}

export default Welcome
