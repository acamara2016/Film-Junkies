import React from 'react';
import axios from 'axios';
import config from '../config/api.config'
import TvPoster from '../components/tv.component'
import Category from './category.component'

export default class TvShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            search:null,
            categories:[]
        }
    }
    componentDidMount(){
        window.scrollTo(0, 0);
        this.getMovies();
    }
    getMovies=()=> {
        //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
        axios.get(`https://api.themoviedb.org/3/tv/popular?&api_key=${config.api_key}&language=en-US&page=1`)
        .then((response) => {
            console.log(response.data.results)
            this.setState({movies:response.data.results})
        })
        axios.get(`https://api.themoviedb.org/3/genre/tv/list?&api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            console.log(response.data.genres)
            this.setState({categories:response.data.genres})
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
                {this.state.movies.map((playing, index) => {
                    const short = fn(playing.overview, 142);
                    if(index === 0)
                        return (<div style={{textAlign:'start',backgroundImage:'url(https://image.tmdb.org/t/p/original/'+playing.backdrop_path+')', maxHeight:'500px',minHeight:'400px', backgroundSize:'cover'}} class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                        <div class="col-md-6 px-0">
                        <h1 class="display-4 fst-italic">{playing.name}</h1>
                        <p class="lead my-3">{short}</p>
                        <p class="lead mb-0"><a href={"/movie/"+playing.id} class="btn btn-primary text-white fw-bold">Details</a></p>
                        </div></div>)
                })}
                {this.state.categories.map((category)=>{
                    return (<Category type="tv" id={category.id} name={category.name}/>)
                })}
            </div>
        )
    }
}
function fn(text, count){
    return text.slice(0, count) + (text.length > count ? "..." : "");
}
