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
            //console.log(response.data)
            this.setState({details:response.data})
        })
        axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/images?&api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            //console.log(response.data)
            this.setState({images:response.data})
        })
        axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/credits?&api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            //console.log(response.data)
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
        return(
             <div>
                 <section style={{color: 'black'}} class="py-5 text-center container">
                    <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        {detail.name && <h1 class="fw-light">{detail.name}</h1>}
                        {detail.original_title && <h1 class="fw-light">{detail.original_title}</h1>}
                        <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                        <p>
                        {youtube.map((youtube, i)=>{
                            if(youtube.type=="Trailer")
                                return <Example index={i} videoId={youtube.key} key={youtube.key} id={youtube.id}/>
                            })}
                        <a href="#" class="btn btn-secondary my-2">Showtimes</a>
                        </p>
                    </div>
                    </div>
                </section>
 
                <div class="album py-5 bg-light">
                    <div class="container">
                        <p style={{color:'black', textAlign:'center'}}>Casts</p>
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {this.state.casts && this.state.casts.map((cast)=>{
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
            <YouTube videoId={props.videoId} id={props.id}/>
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
  
 