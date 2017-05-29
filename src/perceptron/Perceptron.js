import VectorOperator from './VectorOperator.js'

export default class Perceptron {
  weights = [];
  c = 500;

  constructor(n){
    this.weights = Array.from({length: n}).map(() => Math.random())
  }

  getWeights(){
    return this.weights
  }
  setWeights(weights){
    this.weights = weights
  }

  feedforward(inputs){
    const sum = VectorOperator.dotProduct(this.weights, inputs)
    return this.activate(sum)
  }

  activate(sum){
    if (sum >= 0) return true
    return false
  }
}

