import React from 'react'
import Perceptron from './Perceptron.js'
import Trainer from './Trainer.js'

const maxWidth = 20
const maxHeight = maxWidth

export default class PerceptronPage extends React.Component{

  state = {
    trainingItemInputs: [],
    weights: [0, 0, 0]
  };

  inputsQueue = [];

  startAt = null;

  constructor(props){
    super(props)
    this.perceptron = new Perceptron(3)

    this.onEndEachTrain = this.onEndEachTrain.bind(this)
    this.onFinish = this.onFinish.bind(this)
  }
  componentDidMount(){
    this.trainPerceptron()
  }

  trainPerceptron(){
    this.startAt = Date.now()
    this.trainer = new Trainer(maxWidth, maxHeight)
    this.trainer.train(this.perceptron, this.onEndEachTrain, this.onFinish)
  }

  onEndEachTrain({
    trainingTime, 
    trainingItem, 
    prevWeights,
    output,
    perceptron}){
    this.setState({
      weights: perceptron.getWeights(),
      trainingItemInputs: trainingItem.inputs,
      trainingItemDesiredNegative: trainingItem.desiredNegative,
      output,
      trainingTime
    })
  }

  onFinish(totalTime, perceptron){
    const trainDuration = Date.now() - this.startAt
    this.setState({
      trainDuration
    })
  }

  stop(){
    this.trainer.stop()
  }

  renderLine(a, b, c){
    // ax+by+c = 0 => x = (-c-by) / a
    // 0<x<500
    // 0<y<500

    if (a === 0){
      if (b === 0){
        return
      }else{
        // y = -c/b
        if (-c/b < 0 || -c/b > maxHeight) return
        return <line x1={0} y1={-c/b} x2={maxWidth} y2={-c/b} stroke="black" stroke-width="0.5"/>
      }
    }
    if (a < 0){
      a = -a 
      b = -b
      c = -c
    }

    // a > 0
    // 0 < (-c-by) / a < 500 => 0 < -c-by < 500a => c > by > -500a
    // 0 < y < 500

    if (b === 0){
      // x = -c/a
      if (-c/a < 0 || -c/a > maxWidth) return
      return <line x1={-c/a} y1={0} x2={-c/a} y2={maxHeight} stroke="black" stroke-width="0.5"/>
    }else{
      //x = 0 => y = -c/b
      //if (-c/b < 0 || -c/b > 500) return
      return <line x1={0} y1={-c/b} x2={maxWidth} y2={(-c-a*maxWidth)/b} stroke="black" stroke-width="0.5"/>
    }
  }
  render(){
    const {
      trainingData, 
      weights,
      trainingTime,
      trainDuration,
      trainingItemInputs,
      trainingItemDesiredNegative,
      output
    } = this.state

    return <div>
      <div>
        <button onClick={() => this.stop()}>Stop</button>
      </div>
      <div>
        Training Time: {trainingTime}<br/>
        Train duration: {trainDuration}
      </div>
      <svg 
        width={500} 
        height={500}
        viewBox={`0 0 ${maxWidth} ${maxHeight}`} 
        style={styles.svg}>
        {this.renderLine(1, 1, -maxWidth)}
        {this.renderLine(weights[0], weights[1], weights[2])}

        <circle cx={trainingItemInputs[0]} cy={trainingItemInputs[1]} r={1} fill={output ? 'green': 'red'} />
        <circle cx={trainingItemInputs[0]} cy={trainingItemInputs[1]} r={0.5} fill={trainingItemDesiredNegative ? 'red' : 'green'} />
      </svg>
    </div>
  }
}
const styles = {
  svg: {
    border: '1px solid green',
    transform: 'rotateX(180deg)'
  }
}