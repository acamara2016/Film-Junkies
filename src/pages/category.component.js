import React from 'react';
import axios from 'axios';
import config from '../config/api.config'
import MoviePoster from '../components/movie.component'
import TvShow from '../components/tv.component'

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            search:null
        }
    }
    componentDidMount(){
        this.getMovies();
    }
    getMovies=()=> {
        //https://api.themoviedb.org/3/discover/movie?api_key=4caf30ffa3252eef2b9fa4dbc2f5554a&with_genres=28
        axios.get(`https://api.themoviedb.org/3/discover/${this.props.type}?&api_key=${config.api_key}&language=en-US&with_genres=${this.props.id}`)
        .then((response) => {
            this.setState({movies:response.data.results})
        })
    }
    handleSearch=(event)=>{
        let keyword = event.target.value;
        this.setState({search:keyword})
    }
    render() {
        const searchFilter = this.state.movies.filter((data)=>{
            if(this.state.search == null)
                return data
            else if(this.props.type === 'movie'){
                if(data.title.toLowerCase().includes(this.state.search.toLowerCase())){
                    return data
                }
            }else if(this.props.type === 'tv'){
                if(data.name.toLowerCase().includes(this.state.search.toLowerCase())){
                    return data
                }
            }
        })
        return(
            <div style={{marginTop:'20px',  marginBottom:'20px', color:'black'}} className="container-fluid">
                    {/* <div class="row form-inline">
                        <input style={{width:'100%', marginBottom:'20px', marginLeft:'40px', marginRight:'40px'}} class="form-control" value={this.state.search} type="search" placeholder="Search" onChange={(e)=>this.handleSearch(e)} aria-label="Search"/>
                    </div> */}
                    <h3 style={{textAlign: 'start', color:'white'}}>{this.props.name}</h3>
                    <div style={{height: 'min-content', scrollBehavior: 'smooth', overflowY:'auto', paddingRight:'30px'}} className="row flex-row flex-nowrap">
                        {this.props.type === 'movie' && searchFilter.map((movie)=>{
                            if(movie.poster_path!=null)
                                return <MoviePoster id={movie.id} image={movie.poster_path} date={movie.first_air_date} name={movie.title} vote_average={movie.vote_average} key={movie.id}/>
                        })}
                        {this.props.type === 'tv' && searchFilter.map((movie)=>{
                            if(movie.poster_path!=null)
                                return <TvShow id={movie.id} image={movie.poster_path} date={movie.first_air_date} name={movie.name} vote_average={movie.vote_average} key={movie.id}/>
                        })}
                        
                    </div>
            </div>
        )
    }
}