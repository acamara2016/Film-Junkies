import React from 'react';
import axios from 'axios';
import config from '../config/api.config'
import TvPoster from '../components/tv.component'

export default class TvShow extends React.Component {
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
        //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
        axios.get(`https://api.themoviedb.org/3/tv/popular?&api_key=${config.api_key}&language=en-US&page=1`)
        .then((response) => {
            console.log(response.data.results)
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
            else if(data.title.toLowerCase().includes(this.state.search.toLowerCase())){
                return data
            }
        })
        return(
            <div style={{marginTop:'100px'}} className="container-fluid">
                    <div class="row form-inline">
                        {/* <Form.Input style={{background: "transparent", borderColor:"#007BFF",}} value={this.state.search} placeholder="Search post" onChange={(e)=>this.handleSearch(e)} type="text" /> */}
                        <input style={{width:'100%', marginBottom:'20px'}} class="form-control" value={this.state.search} type="search" placeholder="Search" onChange={(e)=>this.handleSearch(e)} aria-label="Search"/>
                    </div>
                    <div className="row">
                        {searchFilter.map((movie)=>{
                            return <TvPoster id={movie.id} image={movie.poster_path} date={movie.first_air_date} name={movie.name} vote_average={movie.vote_average} key={movie.id}/>
                        })}
                    </div>
            </div>
        )
    }
}