import React from 'react';
import {Link} from 'react-router-dom';

export default class Cast extends React.Component {
    constructor(props){
        super();
    }

    render(){
        return(
            <div id="elem" style={{marginBottom: '20px', height:'100%'}} className="col-sm">
                <div class="card" style={{width: "18rem"}}>
                  
                    <Link to={"actor/"+this.props.id}>
                        <img src={"https://image.tmdb.org/t/p/original/"+this.props.image} class="card-img-top" alt={this.props.image} />
                    </Link>
                
                    <div style={{display:'flex', flexDirection:'row', justifyContent: 'center'}} class="card-body">
                        {/* <p id="average" class="card-text" style={{width:'fit-content',height:'fit-content', marginRight:'20px', padding:'10px',textAlign: "center", color: "black", border:'1px solid', boxShadow:'5px 10px'}}>{this.props.name}</p> */}
                        <Link id="more" class="card-text" to={"movie/"+this.props.id} style={{width:'fit-content', height:'fit-content', padding:'10px',textAlign: "center", border:'1px solid', boxShadow:'5px 10px'}}>{this.props.name}</Link>
                    </div>
                </div>
            </div>
        );
    }
}