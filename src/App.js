import logo from './logo.svg';
import React from 'react';
import Movie from './pages/movie.component';
import TvSHow from './pages/tvshow.component';
import Coming from './pages/coming.component';
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import Details from './pages/detail.component';
import axios from 'axios';
import icon from './logo192.png'
import config from './config/api.config'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        movies: [],
        categories:[],
        search:null
    }
}

  render(){
    return (
      <div className="App">
          <div>   
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                  <Link to="/" class="navbar-brand" href="#">
                    <img src={icon} width="30" height="30" class="d-inline-block align-top" alt=""/>
                    Film-Junkies
                  </Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                          <Link className="nav-link" to="/movies">Movies</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="/tv-show">TV</Link>
                      </li>

                      <li className="nav-item">
                          <Link className="nav-link" to="/coming-soon">Coming Soon</Link>
                      </li>
                      </ul>
                  </div>
              </nav>
              
                <div>
                    <Switch>
                        {/* <Route exact path={["/"]} component={Home} /> */}
                        <Route exact path={["/","/movies"]} component={Movie} />
                        <Route exact path={["/tv", "/tv-show"]} component={TvSHow} />
                        <Route exact path={["/:type/:id"]} component={Details} />
                        <Route exact path={["/coming-soon"]} component={Coming} />
                    </Switch>
                </div>
            </div>
      </div>
    );
  }
}

export default App;
