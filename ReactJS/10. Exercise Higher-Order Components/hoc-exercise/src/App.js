import React, { Component } from 'react';
import './App.css';
import BoundForm from "./components/BoundForm";

class App extends Component {
    render() {
        return (
            <div className="App">
                <BoundForm>
                    <label for="username">Username</label>
                    <input name="username"/>
                    Password:
                    <input type="password" name="password"/>
                </BoundForm>
            </div>
        );
    }
}

export default App;
