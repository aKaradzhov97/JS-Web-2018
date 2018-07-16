import React, { Component } from 'react';
import Header from './components/common/Header';
import AppRouter from './components/AppRouter';
import Footer from './components/common/Footer';

import './styles/about.css';
import './styles/cart.css';
import './styles/catalog.css';
import './styles/details.css';
import './styles/footer.css';
import './styles/notifications.css';
import './styles/site.css';
import './styles/slideshow.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <AppRouter />
          <Footer />
      </div>
    );
  }
}

export default App;
