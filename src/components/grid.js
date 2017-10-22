import React, { Component } from 'react';
import '../stylesheets/_grid.css';

class grid extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className={"cell " + (this.props.number === 4 ? "newlive" : (this.props.number === 1 ? "live" : "dead"))}
      onClick={this.props.handleClick}>
      </div>
    );
  }
}

export default grid;
