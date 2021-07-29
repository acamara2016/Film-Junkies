import React from 'react';
import axios from 'axios';
import config from '../config/api.config'
import './detail.css'
import Cast from '../components/cast.component'
import { Parallax, Background } from 'react-parallax';
import YouTube from 'react-youtube';

const Container = () => (
    <Parallax strength={300}>
        <Background className="custom-bg">
            <img src="http://www.fillmurray.com/500/320" alt="fill murray" />
        </Background>
    </Parallax>
);

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
                 <div style={{height:'100vh' ,backgroundSize:'cover', backgroundPosition:'center',backgroundImage:`url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`}} class="px-4 py-5 my-5 text-center">
                    {/* <img class="d-block mx-auto mb-4" src={"https://image.tmdb.org/t/p/original"+detail.poster_path} alt="" width="72" height="57"/> */}
                    <br/><br/>
                    {detail.name && <h1 class="display-5 fw-bold lh-1 mb-3">{detail.name}</h1>}
                    {detail.original_title && <h1 class="display-5 fw-bold lh-1 mb-3">{detail.original_title}</h1>}
                    <div class="col-lg-6 mx-auto">
                    {detail.overview && <p class="lead">{detail.overview}</p>}
                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Find tickets</button>
                        <button style={{marginLeft:'10px'}} type="button" class="btn btn-outline-secondary btn-lg px-4">Trailer</button>
                    </div>
                    </div>
                </div>
                {youtube.map((youtube, i)=>{
                    return <YouTube videoId={youtube.key} id={youtube.id}/>
                })}
                <p style={{color:'black', textAlign:'center'}}>Casts</p>
                <div class="row">
                    {
                        this.state.casts && this.state.casts.map((cast)=>{
                            return (
                                <Cast id={cast.id} image={cast.profile_path} name={cast.name}/>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

const View = (props) => {
    return(
        <div>
            <p>{props.data.length}</p>
        </div>
    )
}