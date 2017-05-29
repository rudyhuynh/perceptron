import VectorOperator from './VectorOperator.js'

export default class Trainer{

  f = (x, y) => x + y - this.maxWidth;

  trainingTime = 0;

  delay = 50;

  constructor(maxWidth, maxHeight){
    this.startTraining = true
    this.maxWidth = maxWidth
    this.maxHeight = maxHeight
  }

  train(
    perceptron, 
    onEndEachTrain = function(
                      trainingTime, 
                      trainingItem, 
                      prevWeights, 
                      perceptron){}, 
    onFinish = function(totalTime, perceptron){}
  ){
    setTimeout(() => {
        const trainingItem = this.generateTrainingItem(this.maxWidth, this.maxHeight)
        const {inputs, desiredNegative} = trainingItem

        const weights = perceptron.getWeights()
        const output = perceptron.feedforward(inputs)
        if (desiredNegative){
          if (output){
            const learnedWeights = VectorOperator.subtract(weights, inputs)
            perceptron.setWeights(learnedWeights)
          }
        }else{
          if (!output){
            const learnedWeights = VectorOperator.add(weights, inputs)
            perceptron.setWeights(learnedWeights)
          }
        }

        onEndEachTrain({
          trainingTime: this.trainingTime, 
          trainingItem,
          output,
          weights,
          perceptron})
        this.trainingTime++

        if (this.startTraining) this.train(perceptron, onEndEachTrain, onFinish)
    }, this.delay)
  }

  generateTrainingItem(maxWidth, maxHeight){
    const x = Math.random() * maxWidth,
      y = Math.random() * maxHeight
    return {
      inputs: [x, y, 1],
      desiredNegative: this.f(x, y) < 0
    }
  }

  stop(){
    this.startTraining = false
  }
}
