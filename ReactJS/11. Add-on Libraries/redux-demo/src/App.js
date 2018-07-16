import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const initialStore = ['React '];

const reducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        return state.concat(['Item ' + state.length + ", "])
    } else if (action.type === 'REMOVE_ITEM') {
        return state.slice(0, -1);
    }
    return state;
}

const store = createStore(reducer, initialStore);

const addItemAction = () => {
    store.dispatch({
        type: ADD_ITEM
    });
};

const removeItemAction = () => {
    store.dispatch({
        type: REMOVE_ITEM
    });
}

store.subscribe(() => {
    console.log("Subscribed to state: ==> " + store.getState());
    ReactDOM.render(<App />, document.getElementById('root'));
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">{store.getState().map(item => item)}</h1>
                </header>
                <button onClick={addItemAction}>Add Item</button>
                <button onClick={removeItemAction}>Remove Item</button>
            </div>
        );
    }
}

export default App;
