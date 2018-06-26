import React from 'react'
import Lottie from 'react-lottie';
import * as animationData from './animation-w1664-h1080'

export default class LottieCountry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isStopped: false, isPaused: false};
  }

  render() {
    const buttonStyle = { 
      display: 'block',
      margin: '10px auto'
    };

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        opacity:'.1'
      }
    };

    return <div>
      <Lottie options={defaultOptions}
              height={100}
              width={100}
              opacity={0.1}/>
              
    </div>
  }
}