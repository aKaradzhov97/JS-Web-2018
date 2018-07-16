import React, { Component } from 'react';

class RegisterForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            error: ''
        }
    };

    onInputChanged = (event) => {
        //Get the old user values - the empty user object.
        let user = this.state.user;

        //Get the input field name.
        let inputFieldName = event.target.name;
        //Get the input field value.
        let inputFieldValue = event.target.value;

        //Set new values to the temporary created user object.
        user[inputFieldName] = inputFieldValue;

        //Set the new user object in the state.
        this.setState({
            user
        });
    };

    onFormSubmit = (event) => {
        //Getting form data + validation & error handling.
        event.preventDefault();

        if (this.state.user.password.length < 6) {
            this.setState({
                error: 'Password must be more than 6 symbols!'
            });
            return;
        } else if (this.state.user.password.length > 20) {
            this.setState({
                error: 'Password must be less than 20 symbols!'
            });
            return;
        } else {
            //Clear error message.
            this.setState({
                error: ''
            });
        }
    };

    render () {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div>{this.state.error}</div>
                Username:
                <input
                    type="text"
                    name="username"
                    value={this.state.user.username}
                    onChange={this.onInputChanged}/>
                <br />
                Password:
                <input
                    type="password"
                    name="password"
                    value={this.state.user.password}
                    onChange={this.onInputChanged}/>
                <br />
                <input
                    type="submit"
                    value="Register!"/>
            </form>
        )
    };
};

export default RegisterForm;