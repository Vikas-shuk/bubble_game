import React from 'react';
import lottie from "lottie-web";
import "./bubbleGame.css"
export default class BubbleGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBubbles: [],
      score: 0
    }
    this.width = window.innerWidth;
    this.bubbleEdge = this.width / 10;
    this.allBubbleRefs = [];
    this.allBubbleLotties = [];
  }
  componentDidMount() {
    // setInterval(() => {
    const bubble = this.createBubble();
    this.state.allBubbles.push(bubble);
    this.setState({
      allBubbles: this.state.allBubbles
    }, () => this.initBubbleLottie(this.state.allBubbles.length - 1, bubble.key));
    // }, 3000);
  }
  initBubbleLottie(index, key) {
    this.allBubbleLotties[key] = lottie.loadAnimation({
      container: this.allBubbleRefs[index], // the dom element
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: require('../assets/bubble.json')
    });
    this.allBubbleLotties[key].playSegments([0, 50], true);
  }
  createBubble() {
    return {
      style: {
        top: 0,
        left: Math.random() * (this.width - this.bubbleEdge),
        height: this.bubbleEdge,
        width: this.bubbleEdge
      },
      key: Math.random()
    }
  }
  destroyLottie(index, key) {
    this.allBubbleLotties[key].loop = false;
    this.allBubbleLotties[key].playSegments([50, 101], true);
    this.allBubbleLotties[key].addEventListener('complete', () => {
      this.allBubbleLotties[key].destroy();
      delete this.allBubbleLotties[key];
      this.state.allBubbles.splice(index, 1);
      this.setState({ allBubbles: this.state.allBubbles })
    })
  }
  render() {
    return (<div className="container">
      {this.state.allBubbles.map((bubble, index) => {
        return (
          <div onClick={() => this.destroyLottie(index, bubble.key)} key={bubble.key} ref={ref => this.allBubbleRefs[index] = ref} className="bubble" style={bubble.style}></div>
        )
      })}
    </div>)
  }
}