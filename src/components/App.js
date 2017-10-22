import React, { Component } from 'react';
import '../stylesheets/_app.css';
import Display from './display';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Display />
      </div>
    );
  }
}

export default App;
