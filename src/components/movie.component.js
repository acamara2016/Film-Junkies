import React from 'react';
import axios from 'axios';
import config from '../config/api.config'
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './styles.css';

export default class MoviePoster extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div id="elem" style={{marginBottom: '20px', height:'100%'}} className="col">
                <div class="card" style={{width: "18rem"}}>
                    {this.props.redirect && 
                    <Link to={"../../movie/"+this.props.id}>
                        <img class="card-img-top" alt="..."  src={"https://image.tmdb.org/t/p/w500"+this.props.image}/>
                    </Link>} 
                    {!this.props.redirect && 
                    <Link to={"movie/"+this.props.id}>
                        <img class="card-img-top" alt="..."  src={"https://image.tmdb.org/t/p/w500"+this.props.image}/>
                    </Link>} 
                    <div style={{display:'flex', flexDirection:'row', justifyContent: 'center'}} class="card-body">
                        <p id="average" class="card-text" style={{width:'fit-content',height:'fit-content', marginRight:'20px', padding:'10px',textAlign: "center", color: "black", border:'1px solid', boxShadow:'5px 10px'}}>{this.props.vote_average}</p>
                        {this.props.redirect && <Link class="card-text" to={"../../movie/"+this.props.id} style={{width:'fit-content', height:'fit-content', padding:'10px',textAlign: "center", border:'1px solid', boxShadow:'5px 10px'}}>{this.props.name}</Link>}
                        {!this.props.redirect && <Link id="more" class="card-text" to={"movie/"+this.props.id} style={{width:'fit-content', height:'fit-content', padding:'10px',textAlign: "center", border:'1px solid', boxShadow:'5px 10px'}}>{this.props.name}</Link>}
                    </div>
                </div>
            </div>
            
        );
    }
}