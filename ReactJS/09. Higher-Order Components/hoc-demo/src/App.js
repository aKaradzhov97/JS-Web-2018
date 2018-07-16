import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Second from "./components/Second";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Home/>
                <Second/>
            </div>
        );
    }
}

export default App;
