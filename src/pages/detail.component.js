import React, {useState} from 'react';
import axios from 'axios';
import config from '../config/api.config'
import './detail.css'
import Cast from '../components/cast.component'
import { Parallax, Background } from 'react-parallax';
import YouTube from 'react-youtube';
import {Modal, Button} from 'react-bootstrap/';
import GeoLocation from '../utils/Geolocation';

 

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            images: [],
            casts:[],
            crews:[],
            youtube:[],
            search:null
        }
    }
    componentDidMount(){
        window.scrollTo(0, 0);
        this.getDetails();
    }
    getDetails=()=> {
        axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}?&api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({details:response.data})
        })
        axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/images?&api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            //console.log(response.data)
            this.setState({images:response.data})
        })
        axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/credits?&api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({casts:response.data.cast})
            this.setState({crews:response.data.crew})
        })
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/videos?api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            console.log(response.data.results)
            this.setState({youtube:response.data.results})
        })
    }
    render() {
        const detail = this.state.details
        const production_companies = detail.production_companies
        const youtube = this.state.youtube
        // console.log(detail.over)
        //const short = fn(detail.overview, 142);
        const opts = {
            height: '390',
            width: '350',
        };
        return(
             <div>
                 <section style={{color: 'black'}} class="py-5 text-center container">
                    <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        {detail.name && <h1 class="fw-light">{detail.name}</h1>}
                        {detail.original_title && <h1 class="fw-light">{detail.original_title}</h1>}
                        {/* <p class="lead text-muted">{short}</p> */}
                        <p>
 
                        <a href="#" class="btn btn-secondary my-2">Showtimes</a>
                        </p>
                    </div>
                    </div>

                </section>
    
 
                <div class="album py-5 bg-light">
                    <div class="container">
                    <h3 style={{color:'black', textAlign:'center'}}>Trailers</h3>
                    {youtube.map((youtube, i)=>{
                            if(youtube.type=="Trailer")
                                return <YouTube opts={opts} videoId={youtube.key} id={youtube.id}/>
                            })}
                        <h3 style={{color:'black', textAlign:'center'}}>Casts</h3>
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {this.state.casts && this.state.casts.map((cast)=>{
                                if(cast.profile_path!=null)
                                    return (
                                        <Cast id={cast.id} image={cast.profile_path} name={cast.name}/>
                                    );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function fn(text, count){
    return text.slice(0, count) + (text.length > count ? "..." : "");
}

function Example(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button style={{margin:'20px'}} variant="primary" onClick={handleShow}>
          Trailer {props.index}
        </Button>
  
        <Modal size="lg" centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Youtube</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <YouTube  videoId={props.videoId} id={props.id}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
 