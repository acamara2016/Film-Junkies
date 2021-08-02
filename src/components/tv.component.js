import React from 'react';
import axios from 'axios';
import config from '../config/api.config'
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './styles.css';

export default class TvPoster extends React.Component {
    render() {
        return(
            <div style={{padding:'20px', width:'165px'}} className="col">
                    {this.props.redirect && 
                    <Link to={"../../tv/"+this.props.id}>
                        <img loading="lazy" width="150" height="225" style={{borderRadius:'15px'}}   alt="..."  src={"https://image.tmdb.org/t/p/w220_and_h330_face/"+this.props.image}/>
                    </Link>} 
                    {!this.props.redirect && 
                    <Link to={"tv/"+this.props.id}>
                        <img width="150" height="225" style={{borderRadius:'15px'}}  alt="..."  src={"https://image.tmdb.org/t/p/w220_and_h330_face/"+this.props.image}/>
                    </Link>} 
                    <div style={{position:'absolute', top:'10px', left:'10px', padding:'10px', border:'1px solid', background:'white', borderRadius:'20px'}}> 
                        <p id="average" class="card-text">{this.props.vote_average}</p>
                    </div>
                    {/* <div style={{justifyContent: 'center', textAlign: 'start'}}>
                        {this.props.redirect && <Link class="card-text" to={"../../tv/"+this.props.id} >{this.props.name}</Link>}
                        {!this.props.redirect && <Link id="more" class="card-text" to={"tv/"+this.props.id} >{this.props.name}</Link>}
                    </div> */}
                </div>
        );
    }
}