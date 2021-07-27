import React from 'react';
import err from '../images/404.svg';

export default class Error extends React.Component {
    render(){
        return(
            <div style={{height:'100vh'}}>
                <img style={{marginTop:'100px', width:'70%'}} src={err}/>
            </div>
        )
    }
}