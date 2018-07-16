import React, {Component} from 'react';

export default class BoundForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }

    }

    onChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    };

    onSubmit = (ev) => {
        ev.preventDefault();
    };

    render() {
        return (
            <div>
                {React.Children.map(this.props.children, child => {
                    if (child.type === 'input') {
                        return (
                            <input onChange={this.onChange} value={this.state[child.props.name]} {...child.props}/>
                        )
                    }
                })}
                {this.props.children.map(child => child.value)}
            </div>
        )
    }
}