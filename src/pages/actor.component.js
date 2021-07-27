import React from 'react';
import axios from 'axios';
import config from '../config/api.config'
import MoviePoster from '../components/movie.component'
import Category from './category.component';
export default class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actors: [],
            search:null,
            categories:[]
        }
    }
    componentDidMount(){
        window.scrollTo(0, 0);
        this.getPersons();
    }
    getPersons=()=> {
        //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
        axios.get(`https://api.themoviedb.org/3/person/latest?&api_key=${config.api_key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({actors:response.data})
        })
    }
    handleSearch=(event)=>{
        let keyword = event.target.value;
        this.setState({search:keyword})
    }
    render() {
        // const searchFilter = this.state.actors.filter((data)=>{
        //     if(this.state.search == null)
        //         return data
        //     else if(data.title.toLowerCase().includes(this.state.search.toLowerCase())){
        //         return data
        //     }
        // })
        return(
            <div style={{marginTop:'100px'}} className="container-fluid">
                <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    {this.state.categories.map((category,i) =>{
                        if(i===0){
                            return <a class="nav-item nav-link active" id={`nav-${category.id}-tab`} data-toggle="tab" href={`#nav-${category.id}`} role="tab" aria-controls={`nav-${category.id}`} aria-selected="true">{category.name}</a>
                        }
                        return <a class="nav-item nav-link" id={`nav-${category.id}-tab`} data-toggle="tab" href={`#nav-${category.id}`} role="tab" aria-controls={`nav-${category.id}`} aria-selected="true">{category.name}</a>
                    })}
                </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    {this.state.categories.map((category,i) =>{
                        if(i===0){
                            return <div class="tab-pane fade show active" id={`nav-${category.id}`} role="tabpanel" aria-labelledby={`nav-${category.id}-tab`}>
                            <Category type="movie" id={category.id}/>
                        </div>
                        }
                        return <div class="tab-pane fade show" id={`nav-${category.id}`} role="tabpanel" aria-labelledby={`nav-${category.id}-tab`}>
                            <Category type="movie" id={category.id}/>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}