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
                    <div style={{height:'100vh' ,backgroundSize:'cover', backgroundPosition:'center',backgroundImage:`url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`}}>
                        <div style={{textAlign:'start'}}>
                            <div>
                                <div style={{background:'rgb(197 191 191 / 14%)', height:'100%', paddingTop:'80px'}}>

                                <div style={{height:'100vh', display:'flex'}}>
        
                               
                                    <div style={{height:'max-content', alignSelf:'center'}}>
                                        <img width='350px' src={"https://image.tmdb.org/t/p/original"+detail.poster_path} />
                                    </div>
                                    <div style={{ float:'right', marginLeft:'20px', alignSelf:'center'}}>
                                        {detail.name && <p id="left" style={{color:'white', border: '1px solid', boxShadow:'5px 10px', width:'300px', padding:'10px', backgroundColor:'#00000087'}}>{detail.name}</p>}
                                        {detail.original_title && <p id="left" style={{textAlign:'start', color:'white', border: '1px solid', boxShadow:'5px 10px', width:'300px', padding:'10px', backgroundColor:'#00000087'}}>{detail.original_title}</p>}
                                        {detail.release_date && <p id="right" style={{textAlign:'start', color:'white', border: '1px solid', boxShadow:'5px 10px', width:'300px', padding:'10px', backgroundColor:'#00000087'}}>{detail.release_date} {detail.runtime}m</p>}
                                        {detail.vote_average && <p id="left" style={{textAlign:'start', color:'white', border: '1px solid', boxShadow:'5px 10px', width:'300px', padding:'10px', backgroundColor:'#00000087'}}>{detail.vote_average}</p>}
                                        <p>Overview</p>
                                        {detail.overview && <p>{detail.overview}</p>}
                                        <a class="btn btn-primary" href={detail.homepage}>WATCH</a>
                                        
                                    </div>
            
                                </div>
                                {youtube.map((youtube)=>{
                                    return <YouTube videoId={youtube.key} id={youtube.id}/>
                                })}
                                <p style={{color:'black', textAlign:'center'}}>Casts</p>

                                <div class="row">
                                    {
                                        this.state.casts && this.state.casts.map((cast)=>{
                                            return (
                                                <Cast image={cast.profile_path} name={cast.name}/>
                                            );
                                        })
                                    }
                                </div>
                                {/* <p style={{color:'black', textAlign:'center'}}>Crews</p>
                                <div class="row">
                                    {
                                        this.state.crews.map((cast)=>{
                                            {cast.profile_path && 
                                                <Cast image={cast.profile_path} name={cast.name}/>
                                            }
                                        })
                                    }
                                </div> */}
                        </div>
                        
                            </div>
                            
                        </div>
                        
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