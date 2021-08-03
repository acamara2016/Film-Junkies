import React from 'react';
import axios from 'axios';
import config from '../config/api.config'
import './detail.css'
import Cast from '../components/cast.component';
import MoviePoster from '../components/movie.component';
import TvPoster from '../components/tv.component';

export default class ActorDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            movies: [],
            tvs:[],
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
        axios.get(`https://api.themoviedb.org/3/person/${this.props.match.params.id}?&api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            this.setState({details:response.data})
        })
        axios.get(`https://api.themoviedb.org/3/person/${this.props.match.params.id}/movie_credits?api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            this.setState({movies:response.data.cast})
        })
        axios.get(`https://api.themoviedb.org/3/person/${this.props.match.params.id}/tv_credits?api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            this.setState({tvs:response.data.cast})
        })
    }
    render() {
        const detail = this.state.details
        const movies = this.state.movies;
        const tvs = this.state.tvs;
        let bio_short = detail.biography

        return(
             <div className="container" style={{color:'black', maxWidth:'-webkit-fill-available', textAlign:'start'}}>
                <div class="d-flex align-items-start">
                <div style={{marginTop:"50px"}} class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Bio</button>
                    <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Movies</button>
                    <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Shows</button>
                </div>
                <div class="tab-content" id="v-pills-tabContent">
                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"> 
                        <div style={{margin:'30px'}} className="row">
                            <div className="col-sm-4">
                                <h1 >{detail.name}</h1>
                                <Cast id={detail.id} image={detail.profile_path}/>
                            </div>
                            <div style={{margin: '20px',alignSelf: 'center', border:'1px solid', boxShadow:'-10px 10px 1px'}} className="col">
                                <span>Birthdate {detail.birthday}</span><br/>
                                <span>From: {detail.place_of_birth}</span><br/>
                                <span>{detail.known_for_department}</span><br/>
                                {detail.deathday===null && <span style={{color:'green'}}>Alive</span>}<br/>
                                {detail.deathday!==null && <span style={{color:'red'}}>{detail.deathday}</span>}<br/>
                                <span>{detail.popularity}</span><br/>
                                <a href={`https://www.imdb.com/name/${detail.imdb_id}`}>imdb</a>
                            </div>
                            <div style={{alignSelf: 'center', border: '1px solid', boxShadow: '-10px 10px 1px', padding: '30px'}} className="col-lg-6">
                                <span>{bio_short}</span><br/>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                        <div style={{margin:"30px"}} className="row">
                        <h1>{detail.name}</h1>
                        {movies.map((movie)=>{
                            if(movie.poster_path!=null)
                                return (<MoviePoster redirect="../" id={movie.id} image={movie.poster_path} date={movie.first_air_date} name={movie.title} vote_average={movie.vote_average} key={movie.id}/>)
                        })}
                        </div>
                    </div>
                    <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                        <div style={{margin:"30px"}} className="row">
                        <h1  >{detail.name}</h1>
                            {tvs.map((movie)=>{
                                if(movie.poster_path!=null)
                                    return (<TvPoster redirect="../" id={movie.id} image={movie.poster_path} date={movie.first_air_date} name={movie.name} vote_average={movie.vote_average} key={movie.id}/>)
                            })}
                        </div>
                    </div>
                </div>
                </div>
                    </div>
        )
    }
}
