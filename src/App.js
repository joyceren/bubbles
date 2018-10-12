import React, { Component } from 'react';
import './Bubbles.css';
import Pop1 from './Pop1.m4a'
import Pop2 from './Pop2.m4a'

class Bubbles extends Component {
  state = {
    counter: 0,
    score: 0,
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.trackMouse)
    window.addEventListener('keydown', this.blowing)
  }

  trackMouse = e => {
    this.mouseX = e.clientX
    this.mouseY = e.clientY
  }

  makeBubble = () => {
    const x = this.mouseX,
      y = this.mouseY,
      bubbleKey = this.state.counter;
    const bubble = {
      x, y, size: Math.random()*200+5
    }
    this.setState({
      [bubbleKey]: bubble,
      counter: bubbleKey+1
    })
    setTimeout(() => this.popBubble(bubbleKey), Math.floor(Math.random()*15000)+250)

  }

  popBubble = bubbleKey => {
    if(!!this.state[bubbleKey]) {
      new Audio(Math.random() > 0.4 ? Pop1 : Pop2).play()
      this.setState({[bubbleKey]:{...this.state[bubbleKey], popped: 'popped'}})
      setTimeout(() => {
        delete this.state[bubbleKey]
        this.setState(this.state)
      }, 500)
    }
  }

  blowing = event => {
    if(event.key===' ') {
      this.makeBubble()
    }
  }


  render() {
    return (
      <div className="App">
        <div className='backdrop'>
          Press [ Space ] to blow bubbles! Click bubbles to pop.
          <div>
            Bubbles Popped: {this.state.score}
          </div>
        </div>
          {
            Object.keys(this.state).map(bubbleKey => {
              if(bubbleKey === "counter" || bubbleKey === 'score') return null
              else {
                const bubble = this.state[bubbleKey]
                return (
                  <div className={'bubble ' + bubble.popped} key={bubbleKey}
                    style={{
                      top: bubble.y,
                      left: bubble.x,
                      height: bubble.size,
                      width: bubble.size
                    }}
                    onClick={
                      () => {
                        this.setState({score: this.state.score+1})
                        this.popBubble(bubbleKey)
                      }
                    }
                  >
                    <div className='shine'></div>
                  </div>
                )
              }
            })
          }
      </div>
    );
  }
}

export default Bubbles;
