import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './components/Welcome';
import Timer from "./components/Timer";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Welcome title='Hello!'/>
                <Timer/>
            </div>
        );
    }
}

export default App;
