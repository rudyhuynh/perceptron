import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Circles from './Circles.js'
import PerceptronPage from './perceptron/PerceptronPage'

class App extends Component {
  state = {
    page: 'PerceptronPage'
  }
  renderPage(page){
    switch(page){
      case 'Circles': return <Circles/>
      case 'PerceptronPage': return <PerceptronPage/>
      default: return <div>Unknown route</div>
    }
  }
  render() {
    const {page} = this.state
    return <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div>
        <a onClick={() => this.setState({page: 'Circles'})}>Circles</a>{' | '}
        <a onClick={() => this.setState({page: 'PerceptronPage'})}>Perceptron</a>
      </div>
      {this.renderPage(page)}
    </div>
  }
}

export default App;
