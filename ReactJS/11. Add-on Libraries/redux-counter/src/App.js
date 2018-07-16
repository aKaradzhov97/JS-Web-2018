import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import logo from './logo.svg';
import './App.css';

const separateStore = () => {
    console.log(store.getState());
    console.log('-------------Updated!-------------');
};

const reducer = (store, action) => {
    switch (action.type) {
        case 'INCREMENT':
            console.log('Increment!');
            return ++store;
        case 'DECREMENT':
            console.log('Decrement!');
            return --store;
        case 'CLEAR':
            console.log('Clear!');
            return 0;
        default:
            return store;
    }
};

let store = createStore(reducer, 0);

const incrementCounter = () => {
    store.dispatch({
        type: 'INCREMENT'
    });
    separateStore();
};

const decrementCounter = () => {
    store.dispatch({
        type: 'DECREMENT'
    });
    separateStore();
};

const clearCounter = () => {
    store.dispatch({
        type: 'CLEAR'
    });
    separateStore();
};

store.subscribe(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Counter: {store.getState()}</h1>
                </header>
                <p className="App-title">Actions:</p>
                <button onClick={incrementCounter}>+</button>
                <button onClick={decrementCounter}>-</button>
                <button onClick={clearCounter}>Clear!</button>
            </div>
        );
    }
}

export default App;
