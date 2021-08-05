import React from 'react';
import {Link} from 'react-router-dom';

export default class Cast extends React.Component {
    constructor(props){
        super();
    }

    render(){
        return(
            <div style={{marginBottom: '20px', height:'100%'}} className="col-sm-4 cont">
                    {this.props.image!=null && 
                    <Link to={"../v1/actor/"+this.props.id}>
                        <img width="150" className="image" height="225" style={{borderRadius:'15px',boxShadow:"0px 0px 9px 5px"}}   alt="..."  src={"https://image.tmdb.org/t/p/original/"+this.props.image}/>
                    </Link>} 
                    <p>{this.props.name}</p>
    
            </div>
        );
    }
}