import React, { Component } from 'react';
import '../stylesheets/_display.css';
import Grid from './grid';
import { Panel, Table, Button, ButtonGroup, Row, Col } from 'react-bootstrap';

class display extends Component {
  constructor(props) {
    super(props);
    var matrix = [];
    for(var i = 0; i < 62; i++) {
      matrix[i] = [];
      for(var j = 0; j < 100; j++) {
          matrix[i][j] = Math.floor(Math.random() * 2);
      }
    }
    this.state = {
      cellMatrix: matrix,
      run: true,
      intervalId: setInterval(this.timer, 100),
      generation: 0
    }
  }

  componentDidMount() {
    this.setState({
      intervalId: this.state.intervalId,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer = () => {
    if (this.state.run) {
      var board = [];
      for (var k = 0; k < this.state.cellMatrix.length; k++) {
        board[k] = this.state.cellMatrix[k].slice();
      }
      var  m = 62, n = 100;
      for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
          if (board[i][j] === 4) board[i][j] = 1;
        }
      }
      for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
          var num = 0;
          if (i > 0 && j > 0 && (board[i - 1][j - 1] === 1 || board[i - 1][j - 1] === 2)) num++;
          if (i > 0 && j < n - 1 && (board[i - 1][j + 1] === 1 || board[i - 1][j + 1] === 2)) num++;
          if (i < m - 1 && j > 0 && (board[i + 1][j - 1] === 1 || board[i + 1][j - 1] === 2)) num++;
          if (i < m - 1 && j < n - 1 && (board[i + 1][j + 1] === 1 || board[i + 1][j + 1] === 2)) num++;
          if (i > 0 && (board[i - 1][j] === 1 || board[i - 1][j] === 2)) num++;
          if (i < m - 1 && (board[i + 1][j] === 1 || board[i + 1][j] === 2)) num++;
          if (j > 0 && (board[i][j - 1] === 1 || board[i][j - 1] === 2)) num++;
          if (j < n - 1 && (board[i][j + 1] === 1 || board[i][j + 1] === 2)) num++;
          if (board[i][j] === 0) {
            if (num === 3) board[i][j] = 3;
          } else {
            if (num < 2 || num > 3) board[i][j] = 2;
          }
        }
      }
      for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
          if (board[i][j] === 2) {
            board[i][j] = 0;
          } else if (board[i][j] === 3) {
            board[i][j] = 4;
          } 
        }
      }
      this.setState({
        cellMatrix: board,
        generation: this.state.generation + 1
      });
    }
  }

  handleRun = () => {
    this.setState({
      run: true
    });
  }

  handlePause = () => {
    this.setState({
      run: false
    });
  }

  handleClear = () => {
    var matrix = [];
    for(var i = 0; i < 62; i++) {
      matrix[i] = [];
      for(var j = 0; j < 100; j++) {
          matrix[i][j] = 0;
      }
    }
    this.setState({
      cellMatrix: matrix
    });
  }

  handleSlow = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: setInterval(this.timer, 500)
    });
  }

  handleMedium = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: setInterval(this.timer, 300)
    });
  }

  handleFast = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: setInterval(this.timer, 100)
    });
  }

  render() {
    return (
      <div>
        <Panel header={"Generation: " + this.state.generation} bsStyle="info">
          <div className="tmp">
          {
            this.state.cellMatrix.map((cellRow, i) => {
              return (
                <div className="row" key={-i}>
                  {
                    cellRow.map((cell, j) => {
                      return (
                        <Grid
                        key={i * cellRow.length + j} 
                        number={cell} 
                        lastCell={j === this.state.cellMatrix.length - 1 ? true : false}
                        handleClick = {() => {
                          var newMatrix = [];
                          for (var k = 0; k < this.state.cellMatrix.length; k++) {
                            newMatrix[k] = this.state.cellMatrix[k].slice();
                          }
                          newMatrix[i][j] = newMatrix[i][j] == 0 ? 4 : 0;
                          this.setState({
                            cellMatrix: newMatrix
                          });
                        }}
                        />    
                      )
                    })
                  }
                </div>
              );
            })
          }
          </div>
        </Panel>
        <Row className="show-grid">
          <Col xs={6}>
            <ButtonGroup>
              <Button onClick={this.handleSlow}>Slow</Button>
              <Button onClick={this.handleMedium}>Medium</Button>
              <Button onClick={this.handleFast}>Fast</Button>
            </ButtonGroup>
          </Col>
          <Col className="text-right" xs={6}>
            <ButtonGroup>
              <Button onClick={this.handleRun}>Run</Button>
              <Button onClick={this.handlePause}>Pause</Button>
              <Button onClick={this.handleClear}>Clear</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    ); 
  }
}

export default display;
