import React from 'react'
import Lottie from 'react-lottie';
import * as animationData from '../assets/animation/loader.json'

export default class Loader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return <div>
      <Lottie options={defaultOptions}
              height={200}
              width={200}
             />
    </div>
  }
}