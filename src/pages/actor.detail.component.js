import React from 'react';
import axios from 'axios';
import config from '../config/api.config'
import './detail.css'
import Cast from '../components/cast.component';
import MoviePoster from '../components/movie.component';
 

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
            console.log(response.data)
            this.setState({details:response.data})
        })
        axios.get(`https://api.themoviedb.org/3/person/${this.props.match.params.id}/movie_credits?api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({movies:response.data.cast})
        })
        axios.get(`https://api.themoviedb.org/3/person/${this.props.match.params.id}/tv_credits?api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({tvs:response.data.cast})
        })
    }
    render() {
        const detail = this.state.details
        const movies = this.state.movies;
        const tvs = this.state.tvs;
        const production_companies = detail.production_companies
        // console.log(detail.biography)
        return(
             <div className="container" style={{color:'black', maxWidth:'-webkit-fill-available', textAlign:'start'}}>
                <div class="d-flex align-items-start">
                <div style={{marginTop:"50px"}} class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Scores</button>
                    <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Biography</button>
                    <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Movies</button>
                    <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Tv-shows</button>
                </div>
                <div class="tab-content" id="v-pills-tabContent">
                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"> 
                        <div style={{margin:'30px'}} className="row">
                            <div className="col">
                                <h1  >{detail.name}</h1>
                                <Cast id={detail.id} image={detail.profile_path}/>
                            </div>
                            <div className="col">
               
                                <span>{detail.popularity}</span><br/>
                                <a href={`https://www.imdb.com/name/${detail.imdb_id}`}>imdb</a>
                            </div>
                        </div>
                        
                    </div>
                    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <div style={{margin:'30px'}} className="row">
                            <div className="col">
                            <h1  >{detail.name}</h1>
                                <Cast id={detail.id} image={detail.profile_path}/>
                            </div>
                            <div className="col">
                                <p style={{fontSize:'13px'}}>{detail.biography}</p>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                        <div style={{margin:"30px"}} className="row">
                        <h1  >{detail.name}</h1>
                        {movies.map((movie)=>{
                           return (<MoviePoster redirect="../" id={movie.id} image={movie.poster_path} date={movie.first_air_date} name={movie.title} vote_average={movie.vote_average} key={movie.id}/>)
                        })}
                        </div>
                    </div>
                    <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                        <div style={{margin:"30px"}} className="row">
                        <h1  >{detail.name}</h1>
                            {tvs.map((movie)=>{
                                return (<MoviePoster redirect="../" id={movie.id} image={movie.poster_path} date={movie.first_air_date} name={movie.title} vote_average={movie.vote_average} key={movie.id}/>)
                            })}
                        </div>
                    </div>
                </div>
                </div>
 
                    {/* <div className="row">
                        <div style={{margin:'60px'}} className="col-sm">
                            <Cast id={detail.id} image={detail.profile_path}/>
                        </div>
                        <div style={{margin:'60px'}} className="col-lg">
                        <h1 class="display-5 fw-bold lh-1 mb-3">{detail.name}</h1>
                        <span>{detail.popularity}</span>
                        <a href={`https://www.imdb.com/name/${detail.imdb_id}`}>imdb</a>
                        <br/><br/>
                        <p>{detail.biography}</p>
                        </div>
                    </div> */}
                   
                    </div>
        )
    }
}
 