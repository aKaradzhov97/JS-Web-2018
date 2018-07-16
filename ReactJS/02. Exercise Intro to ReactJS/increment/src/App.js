import React from 'react';
import logo from './logo.svg';
import './App.css';
import rerender from './index';

let counter = 0;
const IncrementCounter = () => {
    counter++;

    if (counter > 0) {
        document.getElementById('counter').style.color = 'red';
    } else if (counter === 0){
        document.getElementById('counter').style.color = 'black';
    }

    rerender(Counter(), document.getElementById('root'));
};

const DecrementCounter = () => {
    counter--;

    if (counter < 0) {
        document.getElementById('counter').style.color = 'blue';
    } else if (counter === 0) {
        document.getElementById('counter').style.color = 'black';
    }

    rerender(Counter(), document.getElementById('root'));

};

const Counter = () => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React increment counter project.</h1>
        </header>
        <p className="App-intro" id="counter">
            {counter}<br/>
        </p>
        <button onClick={IncrementCounter}>Increment!</button>
        <button onClick={DecrementCounter}>Decrement!</button>
    </div>
);

export default Counter;