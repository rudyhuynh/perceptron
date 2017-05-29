import React, { Component } from 'react';

export default class Circles extends Component {
  circles = [];
  state = {
    circles: []
  };
  componentDidMount(){
    setTimeout(() => {
      const start = Date.now()  
      this.drawCircles(250, 250, 200)
      this.setState({
        circles: this.circles,
        duration: (Date.now() - start)/1000
      })
    }, 100)
  }
  drawCircles(cx, cy, radius){
    this.circle(cx, cy, radius)
    if (radius > 2){
      this.drawCircles(cx + radius, cy, radius/2)
      this.drawCircles(cx - radius, cy, radius/2)
      this.drawCircles(cx, cy + radius, radius/2)
      this.drawCircles(cx, cy - radius, radius/2)
    }
  }
  circle(cx, cy, r){
    this.circles.push({cx, cy, r})
  }
  render() {
    const {duration, circles} = this.state

    return (
      <div>
        <div>Duration: {duration}s</div>
        <svg style={{border: '1px solid black'}} width="500" height="500">
          {circles.map((circle, i) => {
            const {cx, cy, r} = circle
            return <circle key={i} 
              cx={cx} cy={cy} r={r} 
              stroke="red" fill="transparent"
            />
          })}
        </svg>
      </div>
    );
  }
}