import React, { Component } from 'react';
import './App.css';
import ButtonWithClick from "./components/ButtonWithClick";
import RegisterForm from "./components/RegisterForm";
import Container from "./components/Container";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Container/>
                <hr/>
                <ButtonWithClick name="Open Console to see this!"/>
                <hr/>
                <RegisterForm/>
            </div>
        );
    }
}

export default App;
