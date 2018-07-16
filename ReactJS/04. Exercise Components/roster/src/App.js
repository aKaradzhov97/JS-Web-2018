import React, { Component } from 'react';
import './App.css';
import Slider from './components/Slider/Slider';
import Characters from './components/Characters/Characters';

class App extends Component {
  render() {
    return (
      <div className="container">
          <h2>React Components Exercise</h2>
          <Slider/>
          <Characters/>
      </div>
    );
  }
}

export default App;
