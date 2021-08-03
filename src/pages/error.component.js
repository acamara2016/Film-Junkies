import React from 'react';
import err from '../images/404.svg';
import Animate from '../animation/index'
import Lottie from 'react-lottie';
import animation from '../animation/404.json'

export default class Error extends React.Component {
    render(){
        return(
            <div style={{height:'100vh'}}>
                <br/><br/><br/>
                <Animate lottie={animation}  lottie={animation} width={400} height={500}/>
            </div>
        )
    }
}